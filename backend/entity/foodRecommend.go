package entity

import (
	"gorm.io/gorm"
)

type FoodRecommend struct {
	gorm.Model
	Name        string 
	DesCription string 
	LikeCount   int    

	UserID uint   
	User   *Users `gorm:"foreignKey:UserID"`

	RankingID uint     
	Ranking   *Ranking `gorm:"foreignKey:RankingID"`

	FoodID uint   
	Food   *Foods `gorm:"foreignKey:FoodID"`

	Like []Like `gorm:"foreignKey:FoodRecommendID"`
}
