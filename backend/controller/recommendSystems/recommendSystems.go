package recommendsystems

import (
	"fmt"
	"time"

	"github.com/Khaichiaro/Capstone-Project/backend/config"
	"github.com/Khaichiaro/Capstone-Project/backend/entity"
	"gorm.io/gorm"
)

// ฟังก์ชันจัดอันดับตาม LikeCount ทุกสัปดาห์
func AssignFoodRanking() error {
	db := config.DB()

	// 1. ล้าง Ranking เดิม (อนุญาต update ทั้งตาราง)
	if err := db.Session(&gorm.Session{AllowGlobalUpdate: true}).
		Model(&entity.FoodRecommend{}).
		Update("ranking_id", nil).Error; err != nil {
		return fmt.Errorf("failed to reset ranking_id: %w", err)
	}

	// 2. ดึงข้อมูลเรียงตาม LikeCount มาก → น้อย และ CreatedAt ใหม่กว่า → ก่อน
	var foodRecs []entity.FoodRecommend
	if err := db.
		Preload("Ranking").
		Order("like_count DESC").
		Order("created_at ASC").
		Limit(5).
		Find(&foodRecs).Error; err != nil {
		return fmt.Errorf("failed to fetch food recommendations: %w", err)
	}

	// 3. กำหนด Ranking ID ให้เรียงจาก 1 ไปเรื่อย ๆ
	for i, rec := range foodRecs {
		rankingID := uint(i + 1) // อันดับเริ่มที่ 1
		if err := db.Model(&entity.FoodRecommend{}).
			Where("id = ?", rec.ID).
			Update("ranking_id", rankingID).Error; err != nil {
			fmt.Printf("⚠️ Failed to update ranking for ID %d: %v\n", rec.ID, err)
		}
	}

	fmt.Println("✅ Weekly FoodRecommend ranking assigned successfully at", time.Now().Format(time.RFC1123))
	return nil
}