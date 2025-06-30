package exercises

import (
	"net/http"

	"github.com/Khaichiaro/Capstone-Project/backend/config"
	"github.com/Khaichiaro/Capstone-Project/backend/entity"

	"github.com/gin-gonic/gin"
)

// GET: แสดงรายการ Exercise ทั้งหมด พร้อมประเภท
func ListExercises(c *gin.Context) {
	db := config.DB()

	var exercises []entity.Exercise

	// โหลด Exercise พร้อม ExerciseType
	if err := db.Preload("ExerciseType").Find(&exercises).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve exercises", "details": err.Error()})
		return
	}

	c.JSON(http.StatusOK, exercises)
}
