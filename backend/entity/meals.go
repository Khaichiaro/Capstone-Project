package entity

import (
	"time"

	"gorm.io/gorm"
)

type Meals struct {
	gorm.Model

	FoodPicture string `json:"food_picture"`
	MealsDate time.Time `json:"meals_date"`
	MealsTime string `json:"meals_time"`
	FoodName string `json:"food_name"`
	Quantity float64 `json:"quantity"`
	Calories float64 `json:"calories"`
	Protein float64 `json:"protein"`
	Carbs float64 `json:"carbs"`
	Sodium float64 `json:"sodium"`
	Fat float64 `json:"fat"`
	Notes string `json:"notes"`

	
	UserID uint
	Users Users `gorm:"foreignKey:UserID"`
	
	MealsTypeID uint
	MealsType  MealsType `gorm:"foreignKey:MealsTypeID"`

	Foods []Foods `gorm:"many2many:meals_food;" json:"foods"`

} 