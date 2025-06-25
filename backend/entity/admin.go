package entity

import (
	"gorm.io/gorm"
)

type Admin struct {
	gorm.Model
	FirstName string 
	LastName  string 
	Email     string 
	Password  string 

	GenderID uint     
	Gender   *Genders `gorm:"foreignKey:GenderID"`
}
