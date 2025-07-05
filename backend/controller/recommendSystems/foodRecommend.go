package recommendsystems

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/Khaichiaro/Capstone-Project/backend/entity"
	"github.com/Khaichiaro/Capstone-Project/backend/config"
)

func GetAllFoodRecommend(c *gin.Context){
	var fooRecommend []entity.FoodRecommend

	db := config.DB()
	result := db.Preload("User").Preload("Food").Preload("Ranking").Find(&fooRecommend)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": result.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, fooRecommend)
}