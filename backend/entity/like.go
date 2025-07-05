package entity

import (
	"gorm.io/gorm"
)

type Like struct {
	gorm.Model

	UserID uint   
	User   *Users `gorm:"foreignKey:UserID"`

	FoodRecommendID uint
	FoodRecommend   *FoodRecommend `gorm:"foreignKey:FoodRecommendID"`
}
