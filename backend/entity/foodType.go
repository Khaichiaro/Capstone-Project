package entity

import (
	"gorm.io/gorm"
)

type FoodType struct {
	gorm.Model
	FoodType string 

	Foods []Foods `gorm:"foreignKey:FoodTypeID"`
}
