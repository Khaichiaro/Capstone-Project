package entity

import "gorm.io/gorm"

type Level struct {
	gorm.Model
	Name    string
	MinPoint int
	MaxPoint int
	// Description string
}