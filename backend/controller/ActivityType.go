package controller

import (
	"backend/config"
	"backend/entity"
	"net/http"

	"github.com/gin-gonic/gin"
)

//GET /activity-type
func ListActivityTyeps(c *gin.Context){
	var activityTypes []entity.ActivityType

	db := config.DB()
	results := db.Find(&activityTypes)
	if results.Error != nil{
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, activityTypes)
}

//GET /activity-type/:id
func GetActivityTypeByID(c *gin.Context){
	activityTypeID := c.Param("id")
	var activityType entity.ActivityType

	db := config.DB()
	results := db.First(&activityType, activityTypeID)
	if results.Error != nil{
		c.JSON(http.StatusNotFound, gin.H{"error":results.Error.Error()})
		return
	}
	if activityType.ID == 0 {
		c.JSON(http.StatusNoContent, gin.H{})
		return
	}
	c.JSON(http.StatusOK, activityType)
}

// GET /user-profile/:id/activity-type
// func GetActivityTypeByUserProfileID(c *gin.Context){
// 	profileID := c.Param("id")
// 	var profile entity.UserProfile

// 	db := config.DB()
// 	results := db.Preload("Gender").Preload("ActivityLevel").Preload("Level").Preload("FoodAllergies").Preload("MedicalConditions").Preload("NutritionGoals").Preload("Activities").First(&profile, profileID)
// 	if results.Error != nil{
// 		c.JSON(http.StatusNotFound, gin.H{"error":results.Error.Error()})
// 		return
// 	}
// 	if profile.ID == 0 {
// 		c.JSON(http.StatusNoContent, gin.H{})
// 		return
// 	}
// 	c.JSON(http.StatusOK, profile)
// }