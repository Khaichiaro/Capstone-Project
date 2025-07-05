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
  
	/*FoodPicture string 
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
*/

	
	UserID uint 
	User *Users `gorm:"foreignKey:UserID"`
	
	MealTypeID uint 
	MealType  *MealType `gorm:"foreignKey:MealTypeID"`

	MealFoods []MealFoods `gorm:"foreignKey:MealID"`

} 