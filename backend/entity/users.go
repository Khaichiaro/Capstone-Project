package entity

import (
	"time"
	"gorm.io/gorm"
)

type Users struct {
	gorm.Model
	Username string `gorm:"unique" json:"username"`
	Email string `gorm:"unique" json:"email"`
	Password string `json:"password"`
	GenderID uint `json:"gender_id"`
	Gender *Genders `gorm:"foriegnkey:gender_id" json:"gender"`
	LastLogin time.Time
}