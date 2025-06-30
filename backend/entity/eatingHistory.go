package entity

import (
	"time"

	"gorm.io/gorm"
)

type EatingHistory struct {
	gorm.Model
	Name              string
	EatingHistoryDate time.Time 
	TotalMeals        int       
	TotalCalories     float64   
	TotalProtein      float64   
	TotalCarbs        float64   
	TotalSodium       float64   
	TotalFat          float64   

	UserID uint   
	User   *Users `gorm:"foreignKey:UserID"`

	// Users []Users `gorm:"foreignKey:SummaryID"`

}
