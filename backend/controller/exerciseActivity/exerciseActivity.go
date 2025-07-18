package exercise_activities

import (
	"fmt"
	"net/http"
	"time"

	"github.com/Khaichiaro/Capstone-Project/backend/config"
	"github.com/Khaichiaro/Capstone-Project/backend/entity"

	"github.com/gin-gonic/gin"
)


// GET: แสดงรายการ Exercise Activity ทั้งหมด พร้อมประเภท
func ListExerciseactivities(c *gin.Context) {
	db := config.DB()

	var activity []entity.ExerciseActivity

	// โหลด Exercise พร้อม ExerciseType
	if err := db.Preload("User").Preload("Exercise").Preload("Exercise.ExerciseType").Find(&activity).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve exercises", "details": err.Error()})
		return
	}

	c.JSON(http.StatusOK, activity)
}

// GET: รายการกิจกรรมตาม ID
func GetExerciseActivitiesbyID(c *gin.Context) {
	ID := c.Param("id")
	var activity entity.ExerciseActivity

	db := config.DB()
	result := db.
		Preload("Exercise").
		Preload("Exercise.ExerciseType"). // preload ExerciseType ด้วย
		Preload("User").
		First(&activity, ID)

	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": result.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, activity)
}

// GET: รายการกิจกรรมทั้งหมดของ User ตาม UserID
func GetExerciseActivitiesbyUserID(c *gin.Context) {
	userID := c.Param("user_id")
	var activities []entity.ExerciseActivity

	db := config.DB()
	result := db.
		Preload("Exercise").
		Preload("Exercise.ExerciseType"). // preload ExerciseType ด้วย
		Preload("User").
		Where("user_id = ?", userID).
		Order("date DESC").           // เรียงลำดับวันที่ล่าสุดก่อน
		Find(&activities)

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	if len(activities) == 0 {
		c.JSON(http.StatusNoContent, gin.H{"message": "No exercise activities found for this user"})
		return
	}

	c.JSON(http.StatusOK, activities)
}

// POST: เพิ่มข้อมูลกิจกรรมใหม่
func CreateExerciseActivity(c *gin.Context) {
	fmt.Println("Creating Exercise Activity")
	db := config.DB()

	var input struct {
		UserID         uint      
		ExerciseID     uint      
		Date           time.Time 
		Duration       int       
		CaloriesBurned float32   
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input", "details": err.Error()})
		return
	}

	activity := entity.ExerciseActivity{
		UserID:         input.UserID,
		ExerciseID:     input.ExerciseID,
		Date:           input.Date,
		Duration:       input.Duration,
		CaloriesBurned: input.CaloriesBurned,
	}

	if err := db.Create(&activity).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not save activity", "details": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "Exercise activity created successfully",
		"data":    activity,
	})
}

// PUT: อัปเดตข้อมูลกิจกรรมตาม ID
func UpdateExerciseActivitybyID(c *gin.Context) {
	id := c.Param("id")
	db := config.DB()

	var input entity.ExerciseActivity
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var existing entity.ExerciseActivity
	if err := db.First(&existing, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Exercise activity not found"})
		return
	}

	existing.UserID = input.UserID
	existing.ExerciseID = input.ExerciseID
	existing.Date = input.Date
	existing.Duration = input.Duration
	existing.CaloriesBurned = input.CaloriesBurned

	if err := db.Save(&existing).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update activity", "details": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Exercise activity updated successfully",
		"data":    existing,
	})
}

func PatchExerciseActivitybyID(c *gin.Context) {
	id := c.Param("id")
	db := config.DB()

	// ใช้ map เพื่ออ่านเฉพาะ fields ที่ต้องการอัปเดต
	var input map[string]interface{}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input", "details": err.Error()})
		return
	}

	var existing entity.ExerciseActivity
	if err := db.First(&existing, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Exercise activity not found"})
		return
	}

	// อัปเดตเฉพาะ fields ที่ส่งมา
	if userID, ok := input["user_id"].(float64); ok {
		existing.UserID = uint(userID)
	}
	if exerciseID, ok := input["exercise_id"].(float64); ok {
		existing.ExerciseID = uint(exerciseID)
	}
	if dateStr, ok := input["date"].(string); ok {
		parsedDate, err := time.Parse(time.RFC3339, dateStr)
		if err == nil {
			existing.Date = parsedDate
		}
	}
	if duration, ok := input["duration"].(float64); ok {
		existing.Duration = int(duration)
	}
	if calories, ok := input["calories_burned"].(float64); ok {
		existing.CaloriesBurned = float32(calories)
	}

	// บันทึก
	if err := db.Save(&existing).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update activity", "details": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Exercise activity patched successfully",
		"data":    existing,
	})
}


// DELETE: ลบกิจกรรมตาม ID
func DeleteExerciseActivitybyID(c *gin.Context) {
	id := c.Param("id")
	db := config.DB()

	if tx := db.Delete(&entity.ExerciseActivity{}, id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Deleted successfully"})
}
