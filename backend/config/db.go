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
	)

	GenderMale := entity.Genders{Gender: "Male"}
	GenderFemale := entity.Genders{Gender: "Female"}
	db.FirstOrCreate(&GenderMale, &entity.Genders{Gender: "Female"})
	db.FirstOrCreate(&GenderFemale, &entity.Genders{Gender: "Male"})

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