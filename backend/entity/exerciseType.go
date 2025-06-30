package entity

import (
	"gorm.io/gorm"
)

type ExerciseType struct {
	gorm.Model
	Name string 

	Exercises []Exercises `gorm:"foreignKey:ExerciseTypeID"`
}
