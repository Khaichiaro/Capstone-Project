package entity

import (
	"gorm.io/gorm"
)

type FoodRecommend struct {
	gorm.Model
	Name        string 
	DesCription string 
	Instruction string
	Benefits    string
	Disadvantages string
	LikeCount   uint    

	UserID uint   
	User   *Users `gorm:"foreignKey:UserID"`

	RankingID uint     
	Ranking   *Ranking `gorm:"foreignKey:RankingID"`

	FoodID uint   
	Food   *Foods `gorm:"foreignKey:FoodID"`

	Like []Like `gorm:"foreignKey:FoodRecommendID"`
}
