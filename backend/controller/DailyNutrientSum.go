package controller

import (
	"backend/config"
	"backend/entity"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

//GET /daily-nutrients
func ListDailyNutrientSums(c *gin.Context){
	var dailySums []entity.DailyNutrientSum
	db := config.DB()

	if err := db.Find(&dailySums).Error; err != nil{
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, dailySums)
}

//GET /daily-nutrients/:id
func GetDailyNutrientSumByID(c *gin.Context){
	dailySumID := c.Param("id")
	var dailySum entity.DailyNutrientSum

	db := config.DB()
	if err := db.First(&dailySum, dailySumID).Error; err != nil{
		c.JSON(http.StatusNotFound, gin.H{"error": "DailyNutrientSum not found"})
		return
	}
	c.JSON(http.StatusOK, dailySum)
}

//GET /user/:id/daily-nutrient
func GetDailyNutrientSumByUserID(c *gin.Context){
	dailySumID := c.Param("id")
	var dailySum []entity.DailyNutrientSum

	db := config.DB()
	results := db.Preload("User").Find(&dailySum, "user_id=?", dailySumID)
	if results.Error != nil{
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, dailySum)
}

//POST /daily-nutrient
func CreateDailyNutrientSum(c *gin.Context){
	var dailySum entity.DailyNutrientSum

	if err := c.ShouldBindJSON(&dailySum); err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	if dailySum.RecordDate.IsZero(){
		dailySum.RecordDate = time.Now()
	}

	if err := db.Create(&dailySum).Error; err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"message": "Created successfully", "data": dailySum})
}