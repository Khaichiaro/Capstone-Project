package entity

import (
	"gorm.io/gorm"
	"time"
)

type NutritionGoals struct {
	gorm.Model
	Name     string
	StartDate time.Time
	EndDate   time.Time
	
	CalculatedTDEE float32 
	ProteinPercentage  float32 
	CarbsPercentage    float32 
	FatPercentage      float32 
	TargetCalories     float32
	TargetProtein      float32
	TargetCarbs        float32
	TargetFat          float32
	TargetWeights      float32

	Users []Users `gorm:"foreignKey:NutritionGoalsID"`
}
