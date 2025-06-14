package eatingHistory

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"

	"github.com/Khaichiaro/Capstone-Project/backend/config"
	"github.com/Khaichiaro/Capstone-Project/backend/entity"
)

// GET /eatingHistory
func GetEatingHistory(c *gin.Context) { // เข้าถึงข้อมูลสรุปการกินอาหารทั้งหมด
	var eatingHistory []entity.EatingHistory

	db := config.DB()
	result := db.Find(&eatingHistory)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": result.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, eatingHistory)
}


// GET /eatingHistory/:id
func GetEatingHistoryById(c *gin.Context) {

    id := c.Param("id")

    var eatingHistory entity.EatingHistory

    db := config.DB()
    result := db.First(&eatingHistory, id) // This will find the first matching record by ID

    if result.Error != nil {
        if result.Error == gorm.ErrRecordNotFound {
            c.JSON(http.StatusNotFound, gin.H{"error": "Eating history not found"})
        } else {
            c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
        }
        return
    }

    c.JSON(http.StatusOK, eatingHistory)
}



// POST /eatingHistory
func CreateEatingHistory(c *gin.Context) {
	var history entity.EatingHistory

	// Bind the request data to the EatingHistory struct
	if err := c.ShouldBindJSON(&history); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	history.EatingHistoryDate = time.Now()
	// Create the new EatingHistory
	newEatingHistory := entity.EatingHistory{
		EatingHistoryDate: time.Now(),
		TotalMeals:        history.TotalMeals,
		Calories:         history.Calories,
		Protein:         history.Protein,
		Carbs:           history.Carbs,
		Sodium:         history.Sodium,
		Fat:            history.Fat,
		UserID:        history.UserID,
	}

	// Save the new EatingHistory to the database
	if err := db.Create(&newEatingHistory).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Created successfully", "data": newEatingHistory})
}


// PATCH /eatingHistory/:id
func UpdateEatingHistory(c *gin.Context) {
	id := c.Param("id")
	var eatingHistory entity.EatingHistory

	// Bind the request data to the EatingHistory struct
	if err := c.ShouldBindJSON(&eatingHistory); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	var existingEatingHistory entity.EatingHistory
	if err := db.First(&existingEatingHistory, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Eating history not found"})
		return
	}

	existingEatingHistory.TotalMeals = eatingHistory.TotalMeals
	existingEatingHistory.Calories = eatingHistory.Calories
	existingEatingHistory.Protein = eatingHistory.Protein
	existingEatingHistory.Carbs = eatingHistory.Carbs
	existingEatingHistory.Sodium = eatingHistory.Sodium
	existingEatingHistory.Fat = eatingHistory.Fat

	if err := db.Save(&existingEatingHistory).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Updated successfully", "data": existingEatingHistory})
}


// DELETE /eatingHistory/:id
//ลบแบบหายไปจากตาราง
func DeleteEatingHistory(c *gin.Context) { //ลบข้อมูลตาม id
	id := c.Param("id")
	db := config.DB()
	if tx := db.Exec("DELETE FROM eating_histories WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})
}




