package eatingHistory

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/Khaichiaro/Capstone-Project/backend/config"
	"github.com/Khaichiaro/Capstone-Project/backend/entity"
)

// GET /eatingHistory/meals
func GetMeals(c *gin.Context) {
	var meals []entity.Meals

	db := config.DB()
	result := db.Find(&meals)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": result.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, meals)
}
