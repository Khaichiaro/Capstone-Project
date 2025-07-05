package entity

import "gorm.io/gorm"

type MedicalCondition struct {
	gorm.Model
	Name string
	UserProfiles []UserProfile `gorm:"many2many:user_medical_conditions"`
}