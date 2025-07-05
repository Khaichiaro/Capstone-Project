package entity

import (
	"time"

	"gorm.io/gorm"
)

type Users struct {
	gorm.Model
	Username  string    `gorm:"unique"`
	Email     string    `gorm:"unique"`
	Password  string    
	LastLogin time.Time 

	UserGroupID uint       
	UserGroup   *UserGroup `gorm:"foreignKey:UserGroupID"`

	UserProfileID uint          
	UserProfile   *UserProfiles `gorm:"foreignKey:UserProfileID"`

	ExerciseID uint      
	Exercise   *Exercise `gorm:"foreignKey:ExerciseID"`

	LevelID uint    
	Level   *Levels `gorm:"foreignKey:LevelID"`

	NutritionGoalsID uint            
	NutritionGoals   *NutritionGoals `gorm:"foreignKey:NutritionGoalsID"`

	GenderID uint    
	Gender   *Genders `gorm:"foreignKey:GenderID"`

	ActivityFactorsID uint            
	ActivityFactors   *ActivityFactors `gorm:"foreignKey:ActivityFactorsID"`

	Like             []Like             `gorm:"foreignKey:UserID"`
	FoodRecommend    []FoodRecommend    `gorm:"foreignKey:UserID"`
	EatingHistory    []EatingHistory    `gorm:"foreignKey:UserID" `
	Meals            []Meals            `gorm:"foreignKey:UserID"`
	ExerciseActivity []ExerciseActivity `gorm:"foreignKey:UserID"`
}
