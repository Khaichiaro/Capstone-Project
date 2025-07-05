package controller

import (
	"backend/config"
	"backend/entity"
	"net/http"

	"github.com/gin-gonic/gin"
)

//GET /users
func ListUsers(c *gin.Context){
	var users []entity.User

	db := config.DB()
	results := db.Preload("Gender").Preload("ActivityLevel").Preload("Level").Preload("NutritionGoals").Preload("Activities").Find(&users)
	if results.Error != nil{
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, users)
}

//GET /user/:id
func GetUserByID(c *gin.Context){
	userID := c.Param("id")
	var user entity.User

	db := config.DB()
	result := db.Preload("Gender").Preload("ActivityLevel").Preload("Level").Preload("NutritionGoals").Preload("Activities").First(&user, userID)
	if result.Error != nil{
		c.JSON(http.StatusNotFound, gin.H{"error": result.Error.Error()})
		return
	}
	if user.ID == 0 {
		c.JSON(http.StatusNoContent, gin.H{})
		return
	}
	c.JSON(http.StatusOK, user)
}

//POST /user
func CreateUser(c *gin.Context){
	var user entity.User

	//Bind ข้อมูลจาก JSON
	if err := c.ShouldBindJSON(&user); err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	if err := db.Create(&user).Error; err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Create success", "data": user})
}

//PATCH /user/:id
func UpdateUser(c *gin.Context){
	userID := c.Param("id")
	var user entity.User

	db := config.DB()
	result := db.First(&user, userID)
	if result.Error != nil{
		c.JSON(http.StatusNotFound, gin.H{"error": "userID not found"})
		return
	}

	//รับค่าจาก JSON ที่ส่งมา
	type UpdateUserInput struct{
		GenderID        uint   `json:"GenderID"`
		ActivityLevelID uint   `json:"ActivityLevelID"`
		LevelID         uint   `json:"LevelID"`
	}

	var input UpdateUserInput
	if err := c.ShouldBindJSON(&input); err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON: " + err.Error()})
		return
	}

	//อัปเดตเฉพาะฟิลด์ที่รับอนุญาต
	if err := db.Model(&user).Updates(input).Error; err != nil{
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update user"})
		return
	}

	var updateUser entity.User
		if err := db.Preload("Gender").Preload("ActivityLevel").Preload("Level").First(&user, user.ID).Error; err != nil{
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to reload user"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Updated successfully", "data": updateUser})

	//บันทึกข้อมูลการอัปเดต
	result = db.Save(&user)
	if result.Error != nil{
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}