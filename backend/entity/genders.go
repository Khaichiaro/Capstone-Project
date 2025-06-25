package entity

import (
	"gorm.io/gorm"
)

type Genders struct {
	gorm.Model
	Gender string 

	Users []Users `gorm:"foreignKey:GenderID"`
	Admin []Admin `gorm:"foreignKey:GenderID"`
	// 1 gender เป็นเจ้าของได้หลาย Playlist
}
