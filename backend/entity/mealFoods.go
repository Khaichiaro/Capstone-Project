package entity

import (
	"gorm.io/gorm"
)

type MealFoods struct {
	gorm.Model
	Quantity float64

	MealID uint   
	Meal   *Meals `gorm:"foreignKey:MealID"`

	FoodID uint   
	Food   *Foods `gorm:"foreignKey:FoodID"`
}
