package entity

import (
	"gorm.io/gorm"
)

type Foods struct {
	gorm.Model

	FoodName     string  
	Calories float64 
	Protein  float64 
	Carbs    float64 
	Sodium   float64 
	Fat      float64 
	Sugar    float64 

	FoodTypeID uint     
	FoodType   FoodType `gorm:"foreignKey:FoodTypeID"`

	FoodRecommend []FoodRecommend `gorm:"foreignKey:FoodID"`
	MealFoods     []MealFoods     `gorm:"foreignKey:FoodID"`
	FoodPlanFood  []FoodPlanFood  `gorm:"foreignKey:FoodID"`
}
