package entity

import (
	"time"

	"gorm.io/gorm"
)

type UserActivity struct {
	gorm.Model
	Point int
	Timestamp time.Time
	UserID uint
	ActivityTypeID uint
	ActivityType ActivityType
}