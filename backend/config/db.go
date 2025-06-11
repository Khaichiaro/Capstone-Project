package config

import (
	"fmt"
	"time"

	"github.com/Khaichiaro/Capstone-Project/backend/entity"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func ConnectionDB() {
	database, err := gorm.Open(sqlite.Open("thryve.db?cache=shared"), &gorm.Config{})
	if err != nil {
		panic("Failed to connect database")
	}
	fmt.Println("Connected to database")
	db = database
}

func SetupDatabase() {
	db.AutoMigrate(
		&entity.Users{},
		&entity.Genders{},
		&entity.Meals{},
		&entity.MealsType{},
		&entity.Foods{},
		&entity.FoodType{},
		&entity.EatingHistory{},

	)

	GenderMale := entity.Genders{Gender: "Male"}
	GenderFemale := entity.Genders{Gender: "Female"}
	db.FirstOrCreate(&GenderMale, &entity.Genders{Gender: "Female"})
	db.FirstOrCreate(&GenderFemale, &entity.Genders{Gender: "Male"})

	MealsType1 := entity.MealsType{MealType: "มือเช้า"}
	MealsType2 := entity.MealsType{MealType: ",มือกลางวัน"}
	MealsType3 := entity.MealsType{MealType: "มือเย็น"}
	db.FirstOrCreate(&MealsType1, &entity.MealsType{MealType: "มือเช้า"})
	db.FirstOrCreate(&MealsType2, &entity.MealsType{MealType: "มือกลางวัน"})	
	db.FirstOrCreate(&MealsType3, &entity.MealsType{MealType: "มือเย็น"})

	FoodType1 := entity.FoodType{FoodType: "ข้าว"}
	FoodType2 := entity.FoodType{FoodType: "เนื้อสัตว์"}
	FoodType3 := entity.FoodType{FoodType: "ผัก"}
	db.FirstOrCreate(&FoodType1, &entity.FoodType{FoodType: "ข้าว"})
	db.FirstOrCreate(&FoodType2, &entity.FoodType{FoodType: "เนื้อสัตว์"})
	db.FirstOrCreate(&FoodType3, &entity.FoodType{FoodType: "ผัก"})

	hashedPassword, _ := HashPassword("admin")
	
	User := &entity.Users{
		Username: "admin",
		Email: "admin",
		Password: hashedPassword,
		GenderID: GenderMale.ID,
		LastLogin: time.Now(),
	}
	db.FirstOrCreate(&User, &entity.Users{Email: "admin"})
}