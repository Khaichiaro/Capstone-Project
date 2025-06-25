package entity

import (
	"time"

	"gorm.io/gorm"
)

type UserProfiles struct {
	gorm.Model
	FirstName string 
	LastName string 
	DateOfBirth time.Time 
	PhoneNumber string
	Height float32 
	Weight float32
	CurrentPoint int 
	Bmr float32 
	FoodAllergy string 
	MedicalCondition string 
	
	Users []Users `gorm:"foreignKey:UserProfileID"`
}