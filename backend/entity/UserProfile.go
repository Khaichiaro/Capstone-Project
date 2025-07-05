package entity

import (
	"time"

	"gorm.io/gorm"
)

type UserProfile struct {
	gorm.Model
	FirstName string
	LastName  string
	DateOfBirth  time.Time
	Phone     string
	WeightKg    float32
	HeightCm    float32
	CurrentPoint int
	BMR float32
	FoodAllergies string
	MedicalConditions string

	UserID uint
	User *User  `gorm:"foreignKey:UserID"`

	// //One-to-One Relations
	// GenderID uint
	// Gender Gender `gorm:"foreignKey:GenderID"`
	// ActivityLevelID uint
	// ActivityLevel ActivityLevel `gorm:"foreignKey:ActivityLevelID"`

	// LevelID uint
	// Level Level `gorm:"foreignKey:LevelID"`

	// //One-to-Many Relations
	// NutritionGoals []NutritionGoal  `gorm:"foreignKey:UserProfileID"`
	// Activities []UserActivity `gorm:"foreignKey:UserProfileID"`
}