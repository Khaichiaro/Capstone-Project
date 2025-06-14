package eatingHistory

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/Khaichiaro/Capstone-Project/backend/config"
	"github.com/Khaichiaro/Capstone-Project/backend/entity"
)

// GET /eatingHistory/mealTypes
func GetMealTypes(c *gin.Context) {
	var mealTypes []entity.MealsType

	db := config.DB()
	db.Find(&mealTypes)
	c.JSON(http.StatusOK, &mealTypes)
}