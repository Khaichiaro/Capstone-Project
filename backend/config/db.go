package config

import (
	"backend/entity"
	"fmt"
	"strconv"
	"time"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func ConnectionDB(){
	database, err := gorm.Open(sqlite.Open("user.db?cache=shared"), &gorm.Config{})
	if err != nil{
		panic("failed to connect database")
	}
	fmt.Println("Connected database")
	db = database
}

func SetupDatabase(){

	db.AutoMigrate(
		&entity.ActivityLevel{},
		&entity.ActivityType{},
		&entity.DailyNutrientSum{},
		&entity.Gender{},
		&entity.Level{},
		&entity.NutritionGoal{},
		&entity.User{},
		&entity.UserActivity{},
		&entity.User{},
		&entity.UserProfile{},
	)

	GenderMale := entity.Gender{GenderName: "ชาย"}
	GenderFemale := entity.Gender{GenderName: "หญิง"}

	db.FirstOrCreate(&GenderMale, &entity.Gender{GenderName: "ชาย"})
	db.FirstOrCreate(&GenderFemale, &entity.Gender{GenderName: "หญิง"})

	hashedPassword, _ := HashPassword("123456")
	User := &entity.User{
		Email: "test1@gmail.com",
		Password: hashedPassword,
		GenderID: 2,
		ActivityLevelID: 2,
		LevelID: 1,
	}
	db.FirstOrCreate(User, &entity.User{
		Email: "test1@gmail.com",
	})

	//Create UserProfile
	DateOfBirth, _ := time.Parse("2006-01-02","1990-05-15")
	UserProfile := []entity.UserProfile{
		{
			FirstName: "Alice",
			LastName: "Smith",
			DateOfBirth: DateOfBirth,
			Phone: "0812345678",
			WeightKg: 70.0,
			HeightCm: 165.0,
			FoodAllergies: "ถั่วลิสง",
			MedicalConditions: "เบาหวาน",
			CurrentPoint: 0,
			BMR: 1395.25,
			UserID: 1,
			// GenderID: 2,
			// ActivityLevelID: 2,
			// LevelID: 1,
		},
	}

	for _, profile := range UserProfile{
		db.FirstOrCreate(&profile, &entity.UserProfile{FirstName: profile.FirstName, LastName: profile.LastName})
	}

	fmt.Println("UserProfile saved:", UserProfile)

	//Create ActivityLevel
	ActivityLevel := []*entity.ActivityLevel{
		{
			Name: "Sedentary",
			Multiplier: 1.2,
			Description: "ออกกำลังกายน้อยมาก หรือไม่ออกเลย",
		},
		{
			Name: "Lightly Active",
			Multiplier: 1.375,
			Description: "ออกกำลังกาย 1-3 ครั้งต่อสัปดาห์",
		},
		{
			Name: "Moderately Active",
			Multiplier: 1.55,
			Description: "ออกกำลังกาย 4-5 ครั้งต่อสัปดาห์",
		},
		{
			Name: "Very Active",
			Multiplier: 1.725,
			Description: "ออกกำลังกาย 6-7 ครั้งต่อสัปดาห์",
		},
		{
			Name: "Extremely Active",
			Multiplier: 1.9,
			Description: "ออกกำลังกายวันละ 2 ครั้งขึ้นไป",
		},
	}
	
	for _, activityLevel := range ActivityLevel{
			db.FirstOrCreate(&activityLevel, &entity.ActivityLevel{Name: activityLevel.Name})
	}

	//Create ActivityType
	ActivityType := []entity.ActivityType{
		{
			Name: "บันทึกมื้ออาหาร",
			DefaultPoint: 10,
		},
	}
	for _, activityType := range ActivityType{
		db.FirstOrCreate(&activityType, &entity.ActivityType{Name: activityType.Name})
	}

	fmt.Println("ActivityType saved:", ActivityType)

	//Create DailyNutrientSum
	RecordDate, _ := time.Parse("2006-01-02","2025-06-09")
	DailyNutrientSum := []entity.DailyNutrientSum{
		{
			RecordDate: RecordDate,
			Calories: 1400.0,
			Protein: 105.0,
			Carbs: 155.0,
			Fat: 40.0,
			UserID: 1,
		},
	}
	for _, daily := range DailyNutrientSum{
		db.FirstOrCreate(&daily, &entity.DailyNutrientSum{UserID: daily.UserID})
	}

	fmt.Println("DailyNutrientSum saved:", DailyNutrientSum)

	// //Create Level
	var levels []entity.Level
	base := 100
	levelCount := 100

	min := 0
	for i := 1; i <= levelCount; i++{
		required := base * i
		level := entity.Level{
			Name: "Level " + strconv.Itoa(i),
			MinPoint: min,
			MaxPoint: min + required - 1,
		}
		min = level.MaxPoint + 1
		levels = append(levels, level)
	}

	for _, level := range levels{
		db.FirstOrCreate(&level, entity.Level{Name: level.Name})
	}

	fmt.Println("Level saved:", levels)

	//Create NutritionGoal
	StartDate, _ := time.Parse("2006-01-02","2025-06-09")
	EndDate, _ := time.Parse("2006-01-02","2025-09-09")
	NutritionGoal := []entity.NutritionGoal{
		{
			UserID: 1,
			GoalType: "ลดน้ำหนัก",
			TargetWeight: 65.0,
			StartDate: StartDate,
			EndDate: EndDate,
			ProteinPercentage: 30.0,
			FatPercentage: 25.0,
			CarbPercentage: 45.0,
			CalculatedTDEE: 1800.0,
			TargetCalories: 1500.0,
			TargetProtein: 112.5,
			TargetCarbs: 168.75,
			TargetFat: 41.67,
		},
	}
	for _, nutritionGoal := range NutritionGoal{
		db.FirstOrCreate(&nutritionGoal, &entity.NutritionGoal{UserID: nutritionGoal.UserID})
	}

	fmt.Println("NutritionGoal saved:", &NutritionGoal)

	//Create UserActivity
	UserActivity := []entity.UserActivity{
		{
			Point: 100,
			Timestamp: time.Date(2025, 6, 9, 8, 30,0 ,0, time.UTC),
			UserID: 1,
			ActivityTypeID: 1,
		},
	}
	for _, userActivity := range UserActivity{
		db.FirstOrCreate(&userActivity, &entity.UserActivity{UserID: userActivity.UserID})
	}
}