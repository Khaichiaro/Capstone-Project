package entity

import (
	"gorm.io/gorm"
)

type MealType struct {
	gorm.Model
	MealType string 

	Meals []Meals `gorm:"foreignKey:MealTypeID"`
}
