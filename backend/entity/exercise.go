package entity

import (
	"gorm.io/gorm"
)

type Exercise struct {
	gorm.Model
	Name                  string  
	CaloriesBurnPerMinute float32 

	ExerciseTypeID uint          
	ExerciseType   *ExerciseType `gorm:"foreignKey:ExerciseTypeID"`

	ExerciseActivity []ExerciseActivity `gorm:"foreignKey:ExerciseID"`
	ExercisePlan     []ExercisePlan     `gorm:"foreignKey:ExerciseID"`
	Users            []Users            `gorm:"foreignKey:ExerciseID"`
}
