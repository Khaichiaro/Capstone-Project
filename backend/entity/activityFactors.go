package entity

import(
	"gorm.io/gorm"
)

type ActivityFactors struct {
	gorm.Model
	Name string
	Multiplier string 
	DesCription string

	Users []Users `gorm:"foreignKey:ActivityFactorsID"`
}