package entity

import (
	"time"

	"gorm.io/gorm"
)

type NutritionGoal struct {
	gorm.Model

	GoalType string
	TargetWeight float32

	StartDate time.Time
	EndDate time.Time

	ProteinPercentage float32
	FatPercentage float32
	CarbPercentage float32
	
	CalculatedTDEE float32
	TargetCalories float32
	TargetProtein float32
	TargetCarbs float32
	TargetFat float32
	
	UserID uint
	User   User `gorm:"foreignKey:UserID"`
}