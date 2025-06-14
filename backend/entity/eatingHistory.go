package entity

import (
	"time"

	"gorm.io/gorm"
)

type EatingHistory struct {
	gorm.Model

	EatingHistoryDate time.Time `json:"eatingHistory_date"`
	TotalMeals int `json:"total_meals"`
	Calories float64 `json:"calories"`
	Protein float64 `json:"protein"`
	Carbs float64 `json:"carbs"`
	Sodium float64 `json:"sodium"` 
	Fat float64 `json:"fat"`

	UserID uint
	Users  Users `gorm:"foreignKey:UserID"`

	// Users []Users `gorm:"foreignKey:SummaryID"`

}
