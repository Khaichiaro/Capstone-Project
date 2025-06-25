package entity

import (
	"time"

	"gorm.io/gorm"
)

type Meals struct {
	gorm.Model

	FoodPicture string 
	MealsDate time.Time 
	MealsTime string 
	FoodName string 
	Quantity float64 
	Calories float64 
	Protein float64 
	Carbs float64 
	Sodium float64 
	Fat float64 
	Notes string 

	
	UserID uint 
	User *Users `gorm:"foreignKey:UserID"`
	
	MealTypeID uint 
	MealType  *MealType `gorm:"foreignKey:MealTypeID"`

	MealFoods []MealFoods `gorm:"foreignKey:MealID"`

} 