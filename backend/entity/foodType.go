package entity

import (
	"gorm.io/gorm"

)

type FoodType struct {
	gorm.Model
	FoodType string `json:"food_type"`


	Foods []Foods `gorm:"foreignKey:FoodTypeID "`

}