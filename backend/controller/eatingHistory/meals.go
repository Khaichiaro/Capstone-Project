package eatingHistory

import (
	"fmt"
	"net/http"
	"path/filepath"
	"strconv"
	"strings"
	"time"
	"github.com/Khaichiaro/Capstone-Project/backend/config"
	"github.com/Khaichiaro/Capstone-Project/backend/entity"
	"github.com/gin-gonic/gin"
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

// GET /meals/:id
func GetMealsByDate(c *gin.Context) {
	date := c.Param("date")

	var meals []entity.Meals

	db := config.DB()
	result := db.Where("meals_date = ?", date).Find(&meals)

	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Meals not found"})
		return
	}

	c.JSON(http.StatusOK, meals)
}

//

// POST /meals
func CreateMeals(c *gin.Context) {
	var meals entity.Meals

	// Handle file upload
	file, err := c.FormFile("food_picture")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Food picture is required"})
		return
	}

	fmt.Println("Name file:", c.PostForm("food_name"))
	meals.FoodName = c.PostForm("food_name")

	// ตั้งชื่อไฟล์
	filename := fmt.Sprintf("%s%s", meals.FoodName, filepath.Ext(file.Filename))
	savePath := filepath.Join("uploads_pic_food", filename)
	path := filepath.Join("uploads_pic_food", filename)
	webPath := strings.ReplaceAll(path, "\\", "/") // แปลง \ เป็น / สำหรับใช้งานบนเว็บ

	// บันทึกไฟล์
	if err := c.SaveUploadedFile(file, savePath); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	meals.FoodPicture = webPath

	// mealsDateStr := c.PostForm("meals_date")
	// MealsDate, err := time.
	// if err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Meals Date"})
	// 	return
	// }
	meals.MealsDate = time.Now()

	meals.MealsTime, _ = time.Parse("15:04:05", c.PostForm("meals_time"))

	meals.Quantity = c.PostForm("quantity")

	if val := c.PostForm("calories"); val != "" {
		meals.Calories, _ = strconv.ParseFloat(val, 64)
	}
	if val := c.PostForm("protein"); val != "" {
		meals.Protein, _ = strconv.ParseFloat(val, 64)
	}
	if val := c.PostForm("carbs"); val != "" {
		meals.Carbs, _ = strconv.ParseFloat(val, 64)
	}
	if val := c.PostForm("fat"); val != "" {
		meals.Fat, _ = strconv.ParseFloat(val, 64)
	}
	if val := c.PostForm("sodium"); val != "" {
		meals.Sodium, _ = strconv.ParseFloat(val, 64)
	}

	meals.Notes = c.PostForm("notes")
	userIDStr := c.PostForm("UserID")
	userID, err := strconv.Atoi(userIDStr)
	// if err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid UserID"})
	// 	return
	// }
	meals.UserID = uint(userID)
	mealTypeIDStr := c.PostForm("MealTypeID")
	mealTypeID, err := strconv.Atoi(mealTypeIDStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid MealTypeID"})
		return
	}
	meals.MealTypeID = uint(mealTypeID)

	db := config.DB()
	if result := db.Create(&meals); result.Error != nil {
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
