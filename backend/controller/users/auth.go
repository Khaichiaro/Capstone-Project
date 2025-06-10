package users

import (
	"errors"
	"net/http"
	"time"

	"github.com/Khaichiaro/Capstone-Project/backend/entity"
	"github.com/Khaichiaro/Capstone-Project/backend/config"
	"github.com/Khaichiaro/Capstone-Project/backend/services"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"

)

type(
	Authen struct {
		Email string `json:"email" form:"email" binding:"required"`
		Password string `json:"password" form:"password" binding:"required"`
	}

	signUp struct {
		Username string `json:"username"`
		Email string `json:"email" form:"email" binding:"required"`
		Password string `json:"password" form:"password" binding:"required"`
		GenderID uint `json:"gender_id"`
		LastLogin time.Time
	}
)

func SignUp(c *gin.Context){
	var payload signUp

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()
	var userCheck entity.Users

	result := db.Where("email = ?", payload.Email).First(&userCheck)
	if result.Error != nil && !errors.Is(result.Error, gorm.ErrRecordNotFound) {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error})
		return
	}

	if userCheck.ID != 0 {
		c.JSON(http.StatusConflict, gin.H{"error": "Email already exists"})
		return
	}

	hashedPassword, _ := config.HashPassword(payload.Password)

	user := entity.Users{
		Username: payload.Username,
		Email: payload.Email,
		Password: hashedPassword,
		GenderID: payload.GenderID,
		LastLogin: time.Now(),
	}

	if err := db.Create(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Sign-up successfully"})
}

func SignIn(c *gin.Context){
	var payload Authen
	var user entity.Users

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	
	if err := config.DB().Raw("SELECT * FROM users WHERE email = ?", payload.Email).Scan(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(payload.Password))
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "password is incorrect"})
		return
	}

	jwtWrapper := services.JwtWrapper{
       SecretKey:       "SvNQpBN8y3qlVrsGAYYWoJJk56LtzFHx",
       Issuer:          "AuthService",
       ExpirationHours: 24,
   }

   signedToken, err := jwtWrapper.GenerateToken(user.Email)
   if err != nil {
	   c.JSON(http.StatusInternalServerError, gin.H{"error": "error signing token"})
	   return
   }

   c.JSON(http.StatusOK, gin.H{"token_type": "Bearer", "access_token": signedToken, "id": user.ID})
}