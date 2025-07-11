package recommendsystems

import (
	// "encoding/json"
	"net/http"

	"github.com/Khaichiaro/Capstone-Project/backend/config"
	"github.com/Khaichiaro/Capstone-Project/backend/entity"
	"github.com/gin-gonic/gin"

	"errors"

	"gorm.io/gorm"
)

func GetAllFoodRecommend(c *gin.Context){
	var foodRecommend []entity.FoodRecommend

	db := config.DB()
	result := db.
		Preload("User").
		Preload("User.UserProfile").
		Preload("User.UserGroup").
		Preload("User.Gender").
		Preload("User.NutritionGoals").
		Preload("User.Exercise").
		Preload("User.Level").
		Preload("User.ActivityFactors").
		Preload("User.EatingHistory").
		Preload("User.Meals").
		Preload("User.Like").
		Preload("User.FoodRecommend").
		Preload("User.ExerciseActivity").
		Preload("Food").
		Preload("Food.FoodType").
		Preload("Ranking").
		Find(&foodRecommend)
	
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": result.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, foodRecommend)
}

func GetAllFoodRecommendWithRanking(c *gin.Context){
	var foodRecommend []entity.FoodRecommend

	db := config.DB().Debug()
	result := db.
		Preload("User").
		Preload("User.UserProfile").
		Preload("Food").
		Preload("Ranking").
		Where("ranking_id IS NOT NULL AND ranking_id != 0").
		Find(&foodRecommend)
	
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": result.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, foodRecommend)
}

func ToggleLike(c *gin.Context) {
	var input struct {
		UserID          uint `json:"user_id" binding:"required"`
		FoodRecommendID uint `json:"food_recommend_id" binding:"required"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	db := config.DB()

	var like []entity.Like
	err := db.Where("user_id = ? AND food_recommend_id = ?", input.UserID, input.FoodRecommendID).First(&like).Error

	if err == nil {
		// 👍 Already liked → UNLIKE
		if err := db.Delete(&like).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to unlike"})
			return
		}

		// -1 LikeCount
		db.Model(&entity.FoodRecommend{}).Where("id = ?", input.FoodRecommendID).
			Update("like_count", gorm.Expr("like_count - 1"))

		c.JSON(http.StatusOK, gin.H{"message": "Unliked successfully", "liked": false})
		return
	}

	if errors.Is(err, gorm.ErrRecordNotFound) {
		// 👎 Not yet liked → LIKE
		newLike := entity.Like{
			UserID:          input.UserID,
			FoodRecommendID: input.FoodRecommendID,
		}

		if err := db.Create(&newLike).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to like"})
			return
		}

		// +1 LikeCount
		db.Model(&entity.FoodRecommend{}).Where("id = ?", input.FoodRecommendID).
			Update("like_count", gorm.Expr("like_count + 1"))

		c.JSON(http.StatusOK, gin.H{"message": "Liked successfully", "liked": true})
		return
	}

	// Other DB error
	c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
}

func CheckLikeStatus(c *gin.Context) {
	userId := c.Param("user_id")
	foodRecId := c.Param("food_recommend_id")


	var like entity.Like
	db := config.DB()
	err := db.Where("user_id = ? AND food_recommend_id = ?", userId, foodRecId).First(&like).Error

	if err == nil {
		c.JSON(http.StatusOK, gin.H{"liked": true})
		return
	}

	if errors.Is(err, gorm.ErrRecordNotFound) {
		c.JSON(http.StatusOK, gin.H{"liked": false})
		return
	}

	c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
}

func CreateRecommend(c *gin.Context) {
	var input entity.FoodRecommend

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON input"})
		return
	}

	db := config.DB()

	if err := db.Create(&input).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create recommendation"})
		return
	}

	c.JSON(http.StatusCreated, input)
}

func GetAllFood(c *gin.Context) {
	var foods []entity.Foods

	db := config.DB()
	result := db.Preload("FoodType").
		Where("id NOT IN (?)", db.Model(&entity.FoodRecommend{}).Select("food_id").Where("deleted_at IS NULL")).
		Find(&foods)

	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": result.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, foods)
}

func GetAllFoodType(c *gin.Context) {
	var foodType []entity.FoodType

	db := config.DB()
	result := db.Find(&foodType)

	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": result.Error.Error()})
	}

	c.JSON(http.StatusOK, foodType)
}

func GetFoodRecommendByUserID(c *gin.Context) {
	userId := c.Param("user_id")

	var foodRec []entity.FoodRecommend
	db := config.DB()
	result := db.
	Preload("User").
	Preload("User.Like").
	Preload("User.FoodRecommend").
	Preload("Food").
	Preload("Food.FoodType").
	Preload("Ranking").
	Where("user_id == ?", userId).Find(&foodRec)

	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": result.Error.Error()})
	}
	if result == nil {
		c.JSON(http.StatusOK, gin.H{"meassage": "Not Have Record"})
	}

	c.JSON(http.StatusOK, foodRec)
}