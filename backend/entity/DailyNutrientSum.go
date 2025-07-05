package entity

import (
	"time"

	"gorm.io/gorm"
)

type DailyNutrientSum struct {
	gorm.Model
	RecordDate    time.Time
	Calories float32
	Protein float32
	Carbs float32
	Fat float32

	UserID uint
	User User `gorm:"foreignKey:UserID"`
}