package entity

import (
	"gorm.io/gorm"
)

type Ranking struct {
	gorm.Model
	Rank string
	Detail string

	FoodRecommend []FoodRecommend `gorm:"foreignKey:RankingID"`
}
