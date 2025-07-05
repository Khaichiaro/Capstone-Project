package entity

import (
	"gorm.io/gorm"
)

type ExerciseType struct {
	gorm.Model
	Name string 

	Exercises []Exercise `gorm:"foreignKey:ExerciseTypeID"`
}
