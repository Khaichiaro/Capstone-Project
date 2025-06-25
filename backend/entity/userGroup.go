package entity

import (
	"gorm.io/gorm"
)

type UserGroup struct {
	gorm.Model
	Name                string  
	TargetCaloriesRange float32 

	Users        []Users        `gorm:"foreignKey:UserGroupID"`
	ExercisePlan []ExercisePlan `gorm:"foreignKey:UserGroupID"`
	FoodPlan     []FoodPlan     `gorm:"foreignKey:UserGroupID"`
}
