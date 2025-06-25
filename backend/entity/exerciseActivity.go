package entity

import (
	"gorm.io/gorm"
)

type ExerciseActivity struct {
	gorm.Model
	Duration int 

	ExerciseID uint       
	Exercise   *Exercises `gorm:"foreignKey:ExerciseID"`

	UserID uint   
	User   *Users `gorm:"foreignKey:UserID"`
}
