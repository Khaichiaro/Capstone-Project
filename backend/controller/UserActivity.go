package controller

import (
	"backend/config"
	"backend/entity"
	"net/http"

	"github.com/gin-gonic/gin"
)

//GET /user-activity
func ListUserActivities(c *gin.Context){
	var userActivities []entity.UserActivity

	db := config.DB()
	results := db.Preload("ActivityType").Find(&userActivities)
	if results.Error != nil{
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, userActivities)
}

//GET /user-activity/:id
func GetUserActivityByID(c *gin.Context){
	userActivityID := c.Param("id")
	var userActivity entity.UserActivity

	db := config.DB()
	results := db.Preload("ActivityType").First(&userActivity, userActivityID)
	if results.Error != nil{
		c.JSON(http.StatusNotFound, gin.H{"error":results.Error.Error()})
		return
	}
	if userActivity.ID == 0 {
		c.JSON(http.StatusNoContent, gin.H{})
		return
	}
	c.JSON(http.StatusOK, userActivity)
}

//POST /user-activity
func CreateUserActivity(c *gin.Context){
	var userActivity entity.UserActivity

	// Bind ข้อมูลจาก JSON
	if err := c.ShouldBindJSON(&userActivity); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	var userProfile entity.UserProfile
	if userActivity.UserID == 0{
		c.JSON(http.StatusBadRequest, gin.H{"error": "UserID is required"})
		return
	}

	results := db.First(&userProfile, userActivity.UserID)
	if results.Error != nil{
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	//บันทึกข้อมูล  UserProfile
	if err := db.Create(&userActivity).Error; err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"message": "Create success", "data": userProfile})
}