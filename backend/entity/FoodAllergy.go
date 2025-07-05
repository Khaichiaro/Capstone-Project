package entity

import "gorm.io/gorm"

type FoodAllergy struct {
	gorm.Model
	Name string
	UserProfiles []UserProfile `gorm:"many2many:user_food_allergies"`
}