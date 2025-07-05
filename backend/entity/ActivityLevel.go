package entity

import "gorm.io/gorm"

type ActivityLevel struct {
	gorm.Model
	Name       string
	Multiplier float32
	Description string
}

//ระดับกิจกรรมและตัวคูณ TDEE