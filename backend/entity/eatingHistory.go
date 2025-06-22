package entity

import (
	"time"

	"gorm.io/gorm"
)

type EatingHistory struct {
	gorm.Model

	EatingHistoryDate time.Time `json:"eatingHistory_date"`
	TotalMeals int `json:"total_meals"`
	TotalCalories float64 `json:"total_calories"`
	TotalProtein float64 `json:"total_protein"`
	TotalCarbs float64 `json:"total_carbs"`
	TotalSodium float64 `json:"total_sodium"`
	TotalFat float64 `json:"total_fat"`

	UserID uint
	Users  Users `gorm:"foreignKey:UserID"`

	// Users []Users `gorm:"foreignKey:SummaryID"`

}
