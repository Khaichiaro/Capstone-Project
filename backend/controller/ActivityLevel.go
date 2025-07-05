package controller

import (
	"backend/config"
	"backend/entity"
	"net/http"

	"github.com/gin-gonic/gin"
)

//GET /activity-levels
func ListActivityLevels(c *gin.Context){
	var activityLevels []entity.ActivityLevel

	db := config.DB()
	results := db.Find(&activityLevels)
	if results.Error != nil{
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, activityLevels)
}