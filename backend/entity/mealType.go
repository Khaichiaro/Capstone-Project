package entity

import (
	"gorm.io/gorm"

)

type MealsType struct {
	gorm.Model
	MealType string `json:"mealType"`

	Meals []Meals `gorm:"foreignKey:MealsTypeID "`

}