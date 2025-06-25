package entity

import (
	"gorm.io/gorm"
)

type FoodPlanFood struct {
	gorm.Model

	FoodPlanID uint      
	FoodPlan   *FoodPlan `gorm:"foreignKey:FoodPlanID"`

	FoodID uint   
	Food   *Foods `gorm:"foreignKey:FoodID"`
}
