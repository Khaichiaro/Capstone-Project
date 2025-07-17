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

func GetAllFoodRecommendWithRanking(c *gin.Context) {
	var foodRecommend []entity.FoodRecommend

	db := config.DB().Debug()

	// ดึงรายการที่มี Ranking เท่านั้น และเรียงจากอันดับ 1 ไปมากขึ้น
	result := db.
		Preload("User").
		Preload("User.UserProfile").
		Preload("User.UserGroup").
		Preload("User.Gender").
		Preload("Food").
		Preload("Food.FoodType").
		Preload("Ranking").
		Where("ranking_id IS NOT NULL AND ranking_id != 0").
		Order("ranking_id ASC"). // เรียงลำดับอันดับ
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

	var like entity.Like
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

	// ค้นหา record ล่าสุดของ user กับ food นั้น ๆ (รวมที่ลบไปแล้วด้วย)
	err := db.Unscoped().
		Where("user_id = ? AND food_recommend_id = ?", userId, foodRecId).
		Order("id DESC").
		First(&like).Error

	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusOK, gin.H{"liked": false})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
		}
		return
	}

	// ถ้า record ล่าสุดยังไม่ถูกลบ
	if like.DeletedAt.Valid == false {
		c.JSON(http.StatusOK, gin.H{"liked": true})
	} else {
		c.JSON(http.StatusOK, gin.H{"liked": false})
	}
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

func DeleteFoodRecommend(c *gin.Context) {
	id := c.Param("id")
	db := config.DB()

	// 1. ลบ likes ที่อ้างถึง
	if err := db.Where("food_recommend_id = ?", id).Delete(&entity.Like{}).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete likes"})
		return
	}

	// 2. ลบ foodranking ที่อ้างถึง (ถ้ามี)
	// if err := db.Where("food_recommend_id = ?", id).Delete(&entity.Ranking{}).Error; err != nil {
	// 	c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete ranking"})
	// 	return
	// }

	// 3. ลบ food_recommend เอง
	if err := db.Delete(&entity.FoodRecommend{}, id).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete recommendation"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Deleted food recommendation and related data"})
}

func GetFoodRecommendByID(c *gin.Context) {
	id := c.Param("id")
	db := config.DB()

	var foodRec entity.FoodRecommend
	result := db.Preload("User").
		Preload("User.Like").
		Preload("User.FoodRecommend").
		Preload("Food").
		Preload("Food.FoodType").
		Preload("Ranking").
		Where("id = ?", id).First(&foodRec)

	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": result.Error.Error()})
	}

	c.JSON(http.StatusOK, foodRec)
}

func UpdateFoodRecommend(c *gin.Context) {
	id := c.Param("id")
	db := config.DB()

	// ตรวจสอบว่า ID นั้นมีอยู่จริงก่อน
	var existing entity.FoodRecommend
	if err := db.First(&existing, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "FoodRecommend not found"})
		return
	}

	// รับข้อมูล JSON ที่จะอัปเดต
	var input entity.FoodRecommend
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON input"})
		return
	}

	// เฉพาะ field ที่ต้องการให้แก้ไขเท่านั้น
	updateData := map[string]interface{}{
		"Name":          input.Name,
		"DesCription":   input.DesCription,
		"Instruction":   input.Instruction,
		"Benefits":      input.Benefits,
		"Disadvantages": input.Disadvantages,
		"FoodID":        input.FoodID,
	}

	if err := db.Model(&existing).Updates(updateData).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update recommendation"})
		return
	}

	// โหลดข้อมูลใหม่พร้อม Preload ความสัมพันธ์
	var updated entity.FoodRecommend
	if err := db.Preload("User").
		Preload("Ranking").
		Preload("Food").
		First(&updated, id).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Updated but failed to fetch data"})
		return
	}

	c.JSON(http.StatusOK, updated)
}