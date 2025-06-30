package entity

import (

	"time"

	"gorm.io/gorm"
)

type ExerciseActivity struct {
	gorm.Model
	Duration    	int 
	Date        	time.Time
	CaloriesBurned 	float32
	ExerciseID  	uint       
	Exercise    	*Exercise `gorm:"foreignKey:ExerciseID"`
	UserID      	uint   
	User        	*Users `gorm:"foreignKey:UserID"`
}	
