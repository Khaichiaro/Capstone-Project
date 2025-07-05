package controller

import (
	"backend/config"
	"backend/entity"
	"net/http"

	"github.com/gin-gonic/gin"
)

//GET /levels
func ListLevels(c *gin.Context){
	var levels []entity.Level

	db := config.DB()
	results := db.Find(&levels)
	if results.Error != nil{
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, levels)
}

//GET /level/:id
func GetLevelByUserProfileID(c *gin.Context){
	userProfileID := c.Param("id")
	db := config.DB()

	//ดึง UserProfile
	var userProfile entity.UserProfile
	if err := db.First(&userProfile, userProfileID).Error; err != nil{
		c.JSON(http.StatusNotFound, gin.H{"error": "UserProfile not found"})
		return
	}

	//ดึง Level ทั้งหมด
	var levels []entity.Level
	if err := db.Order("min_point ASC").Find(&levels).Error; err != nil{
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to fetch levels"})
		return
	}

	//คำนวณ level และ progress
	levelName := "ไม่พบระดับ"
	progress := 0

	for _, level := range levels{
		if userProfile.CurrentPoint >= level.MinPoint && userProfile.CurrentPoint <= level.MaxPoint{
			levelName = level.Name
			progress = (userProfile.CurrentPoint - level.MinPoint) * 100 / (level.MaxPoint - level.MinPoint)
			break
		}
	}

	c.JSON(http.StatusOK, gin.H{
		"level": levelName,
		"progress": progress,
	})
}