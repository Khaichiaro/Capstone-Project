package entity

import (
	"gorm.io/gorm"
)

type FoodPlan struct {
	gorm.Model
	UserGroupID uint       
	UserGroup   *UserGroup `gorm:"foreignKey:UserGroupID"`

	FoodPlanFoods []FoodPlanFood `gorm:"foreignKey:FoodPlanID"`
}
