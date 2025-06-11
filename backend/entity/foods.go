package entity

import (

	"gorm.io/gorm"
)

type Foods struct {
	gorm.Model

	FoodName string `json:"food_name"`
	FoodCalories float64 `json:"food_calories"`
	FoodProtein float64 `json:"food_protein"`
	FoodCarbs float64 `json:"food_carbs"`
	FoodSodium float64 `json:"food_sodium"`
	FoodFat float64 `json:"food_fat"`
	
	FoodTypeID uint 
	FoodType FoodType `gorm:"foreignKey:FoodTypeID"`

	Meals []Meals `gorm:"many2many:meals_food;" json:"meals"`
} 