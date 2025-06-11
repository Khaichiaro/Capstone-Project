package entity

import (
	"time"

	"gorm.io/gorm"
)

type Meals struct {
	gorm.Model

	MealsDate time.Time `json:"meals_date"`

	
	UserID uint
	Users Users `gorm:"foreignKey:UserID"`
	
	MealsTypeID uint
	MealsType  MealsType `gorm:"foreignKey:MealsTypeID"`

	Foods []Foods `gorm:"many2many:meals_food;" json:"foods"`

} 