package entity

import (
	"gorm.io/gorm"
)

type Levels struct {
	gorm.Model
	Level    string
	MinPoint int 
	MaxPoint int 

	Users []Users `gorm:"foreignKey:LevelID"`
}
