package entity

import (
	"gorm.io/gorm"
)

type Integrant struct {
	gorm.Model
	Name string 
	Quantity int 
}