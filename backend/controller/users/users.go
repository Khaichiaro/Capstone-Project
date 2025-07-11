package users

import (
	"net/http"

	"github.com/Khaichiaro/Capstone-Project/backend/config"
	"github.com/Khaichiaro/Capstone-Project/backend/entity"
	"github.com/gin-gonic/gin"
)

// GetUsers
func GetAll(c *gin.Context) {
	var users []entity.Users

	db := config.DB()
	results := db.Preload("Gender").Find(&users)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, users)
}

// GetUserById
func GetUserById(c *gin.Context) {
 id := c.Param("id")

 var user entity.Users

 db := config.DB()
 result := db.Preload("Gender").First(&user, id)
 if result.Error != nil {
	 c.JSON(http.StatusNotFound, gin.H{"error": result.Error.Error()})
	 return
 }
 c.JSON(http.StatusOK, user)	
 }