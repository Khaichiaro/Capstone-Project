package exerciseType

import (
	"net/http"
	"github.com/Khaichiaro/Capstone-Project/backend/config"
	"github.com/Khaichiaro/Capstone-Project/backend/entity"

	"github.com/gin-gonic/gin"
)

func ListExerciseTypes(c *gin.Context) {
	db := config.DB()

	var exercisetype []entity.ExerciseType

	if err := db.Find(&exercisetype).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve exercise types", "details": err.Error()})
		return
	}

	c.JSON(http.StatusOK, exercisetype)
}



