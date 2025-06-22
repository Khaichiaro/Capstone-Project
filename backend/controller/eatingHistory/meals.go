package eatingHistory

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/Khaichiaro/Capstone-Project/backend/config"
	"github.com/Khaichiaro/Capstone-Project/backend/entity"
)

// GET /meals
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

// GET /meals/:id
func GetMealsById(c *gin.Context) {
	id := c.Param("id")

	var meals entity.Meals

	db := config.DB()
	result := db.First(&meals, id) // This will find the first matching record by ID

	if result.Error != nil {
	c.JSON(http.StatusNotFound, gin.H{"error": "Meals not found"})
	return
	}

	c.JSON(http.StatusOK, meals)
}

// POST /meals
func CreateMeals(c *gin.Context) {
	var meals entity.Meals

	// Bind the request data to the Meals struct
	if err := c.ShouldBindJSON(&meals); err != nil {
	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	return
	}

	db := config.DB()
	result := db.Create(&meals)
	if result.Error != nil {
	c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
	return
	}

	c.JSON(http.StatusCreated, meals)
}

// PATCH /meals/:id
func UpdateMeals(c *gin.Context) {
	id := c.Param("id")

	var meals entity.Meals

	db := config.DB()
	result := db.First(&meals, id) // This will find the first matching record by ID

	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Meals not found"})
		return
	}

	// Bind the request data to the Meals struct
	if err := c.ShouldBindJSON(&meals); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db.Save(&meals)
	c.JSON(http.StatusOK, meals)
}

// DELETE /meals/:id
func DeleteMeals(c *gin.Context) {
	id := c.Param("id")

	var meals entity.Meals

	db := config.DB()
	result := db.First(&meals, id) // This will find the first matching record by ID

	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Meals not found"})
		return
	}

	db.Delete(&meals)
	c.JSON(http.StatusOK, gin.H{"message": "Meals deleted successfully"})
 }