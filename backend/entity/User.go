package entity

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Email    string
	Password string
	
	//One-to-One Relations
	GenderID uint
	Gender Gender `gorm:"foreignKey:GenderID"`
	ActivityLevelID uint
	ActivityLevel ActivityLevel `gorm:"foreignKey:ActivityLevelID"`

	LevelID uint
	Level Level `gorm:"foreignKey:LevelID"`

	//One-to-Many Relations
	NutritionGoals []NutritionGoal  `gorm:"foreignKey:UserID"`
	Activities []UserActivity `gorm:"foreignKey:UserID"`
	DailyNutrientSums []DailyNutrientSum `gorm:"foreignKey:UserID"`

	UserProfile UserProfile `gorm:"foreignKey:UserID"`
}