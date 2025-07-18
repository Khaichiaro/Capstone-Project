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

// GET: แสดง Exercise ทั้งหมดตาม ExerciseTypeID
func GetExercisesByExerciseTypeID(c *gin.Context) {
	db := config.DB()

	exerciseTypeID := c.Param("id") // รับค่า ExerciseTypeID จาก URL

	var exercises []entity.Exercise

	// ค้นหาข้อมูล Exercise ที่มี ExerciseTypeID ตามที่ระบุ พร้อมโหลด ExerciseType
	if err := db.Where("exercise_type_id = ?", exerciseTypeID).
		Preload("ExerciseType").
		Find(&exercises).Error; err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Failed to retrieve exercises",
			"details": err.Error(),
		})
		return
	}

	// ถ้าไม่พบข้อมูล
	if len(exercises) == 0 {
		c.JSON(http.StatusNoContent, gin.H{"message": "No exercises found for this type"})
		return
	}

	// ส่งข้อมูลกลับ
	c.JSON(http.StatusOK, exercises)
}
