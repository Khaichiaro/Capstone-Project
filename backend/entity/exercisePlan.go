package entity

import (
	"gorm.io/gorm"
)

type ExercisePlan struct {
	gorm.Model

	ExerciseID uint       
	Exercise   *Exercises `gorm:"foreignKey:ExerciseID"`

	UserGroupID uint       
	UserGroup   *UserGroup `gorm:"foreignKey:UserGroupID"`
}
