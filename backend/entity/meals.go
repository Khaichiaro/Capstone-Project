package entity

import (
	"time"

	"gorm.io/gorm"
)

type Meals struct {
	gorm.Model

	FoodPicture string `gorm:"type:varchar(255)" valid:"required~food_picture is required"`
	MealsDate time.Time `json:"meals_date"`
	MealsTime time.Time `json:"meals_time"`
	FoodName string `json:"food_name"`
	Quantity string `json:"quantity"`
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