package eatingHistory

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/Khaichiaro/Capstone-Project/backend/config"
	"github.com/Khaichiaro/Capstone-Project/backend/entity"
)

// GET /eatingHistory/mealTypes
func GetMealTypes(c *gin.Context){
	db := config.DB()
	var mealTypes []entity.MealsType
	db.Find(&mealTypes)
	c.JSON(http.StatusOK, mealTypes)
}