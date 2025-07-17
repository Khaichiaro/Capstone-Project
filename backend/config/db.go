package config

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/Khaichiaro/Capstone-Project/backend/entity"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"

	"encoding/csv"
	"os"
	"strconv"
	"strings"
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
		&entity.Genders{},         // No FK
		&entity.UserGroup{},       // No FK
		&entity.UserProfiles{},    // No FK
		&entity.Levels{},          // No FK
		&entity.NutritionGoals{},  // No FK
		&entity.ExerciseType{},    // No FK
		&entity.Exercise{},        // FK to ExerciseType
		&entity.ActivityFactors{}, // No FK

		&entity.Users{}, // FK to Gender, UserGroup, UserProfile, Level, NutritionGoals, Exercise
		&entity.Admin{}, // FK to Gender

		&entity.Ranking{},       // No FK
		&entity.FoodType{},      // No FK
		&entity.Foods{},         // FK to FoodType
		&entity.FoodRecommend{}, // FK to Users, Ranking, Foods
		&entity.Like{},          // FK to Users, FoodRecommend

		&entity.MealType{},  // No FK
		&entity.Meals{},     // FK to Users, MealType
		&entity.MealFoods{}, // FK to Meals, Foods

		&entity.EatingHistory{}, // FK to Users

		&entity.ExerciseActivity{}, // FK to Users, Exercises
		&entity.ExercisePlan{},     // FK to Exercises, UserGroup

		&entity.FoodPlan{},     // FK to UserGroup
		&entity.FoodPlanFood{}, // FK to FoodPlan, Foods
	)

	// Ranking
	ranking := []entity.Ranking{
		{
			Rank:   "1",
			Detail: "ได้รับความนิยมสูงสุด!!!",
		},
		{
			Rank:   "2",
			Detail: "ได้รับความนิยมเป็นอันดับสอง!!",
		},
		{
			Rank:   "3",
			Detail: "ได้รับความนิยมเป็นอันดับสาม!",
		},
		{
			Rank:   "4",
			Detail: "ได้รับความนิยมเป็นอันดับสี่",
		},
		{
			Rank:   "5",
			Detail: "ได้รับความนิยมเป็นอันดับห้า",
		},
	}
	for _, ranking := range ranking {
		db.FirstOrCreate(
			&ranking,
			&entity.Ranking{
				Rank: ranking.Rank,
			})
	}

	importFoodData()

	GenderMale := entity.Genders{Gender: "ชาย"}
	GenderFemale := entity.Genders{Gender: "หญิง"}
	db.FirstOrCreate(&GenderMale, &entity.Genders{Gender: "หญิง"})
	db.FirstOrCreate(&GenderFemale, &entity.Genders{Gender: "ชาย"})

	hashedPassword, _ := HashPassword("admin")

	// User
	User := []entity.Users{
		{
			Username:          "test1",
			Email:             "test1@gmail.com",
			Password:          hashedPassword,
			UserGroupID:       1,
			UserProfileID:     1,
			ExerciseID:        1,
			LevelID:           1,
			ActivityFactorsID: 1,
			NutritionGoalsID:  1,
			GenderID:          GenderMale.ID,
			LastLogin:         time.Now(),
		},
		{
			Username:          "test2",
			Email:             "test2@gmail.com",
			Password:          hashedPassword,
			UserGroupID:       2,
			UserProfileID:     2,
			ExerciseID:        2,
			LevelID:           2,
			ActivityFactorsID: 2,
			NutritionGoalsID:  2,
			GenderID:          GenderMale.ID,
			LastLogin:         time.Now(),
		},
		{
			Username:          "test3",
			Email:             "test3@gmail.com",
			Password:          hashedPassword,
			UserGroupID:       3,
			UserProfileID:     3,
			ExerciseID:        3,
			LevelID:           3,
			ActivityFactorsID: 3,
			NutritionGoalsID:  3,
			GenderID:          GenderFemale.ID,
			LastLogin:         time.Now(),
		},
	}
	for _, user := range User {
		db.FirstOrCreate(
			&user,
			&entity.Users{
				Email: user.Email,
			})
	}

	// ActivityFactors
	activityLevel := []entity.ActivityFactors{
		{
			Name:        "Sedentary",
			Multiplier:  "1.2",
			DesCription: "ออกกำลังกายน้อยมากหรือไม่ออกเลย",
		},
		{
			Name:        "Lightly Active",
			Multiplier:  "1.375",
			DesCription: "ออกกำลังกาย 1-3 ครั้งต่อสัปดาห์",
		},
		{
			Name:        "Moderately Active",
			Multiplier:  "1.55",
			DesCription: "ออกกำลังกาย 4-5 ครั้งต่อสัปดาห์",
		},
		{
			Name:        "Very Active",
			Multiplier:  "1.725",
			DesCription: "ออกกำลังกาย 6-7 ครั้งต่อสัปดาห์",
		},
		{
			Name:        "Extremely Active",
			Multiplier:  "1.9",
			DesCription: "ออกกำลังกายวันละ 2 ครั้งขึ้นไป",
		},
	}
	for _, activity := range activityLevel {
		db.FirstOrCreate(
			&activity,
			&entity.ActivityFactors{
				Name: activity.Name,
			})
	}

	// UserGroup
	UserGroup1 := entity.UserGroup{Name: "n/a", TargetCaloriesRange: 1000}
	UserGroup2 := entity.UserGroup{Name: "n/a", TargetCaloriesRange: 2000}
	UserGroup3 := entity.UserGroup{Name: "n/a", TargetCaloriesRange: 0}
	db.FirstOrCreate(&UserGroup1, &entity.UserGroup{Name: "n/a"})
	db.FirstOrCreate(&UserGroup2, &entity.UserGroup{Name: "n/a"})
	db.FirstOrCreate(&UserGroup3, &entity.UserGroup{Name: "n/a"})

	// UserProfile
	userProfile := []entity.UserProfiles{
		{
			FirstName:        "Alice",
			LastName:         "Smith",
			DateOfBirth:      time.Date(1999, time.May, 15, 0, 0, 0, 0, time.UTC),
			PhoneNumber:      "0812345678",
			Height:           165,
			Weight:           70,
			CurrentPoint:     0,
			Bmr:              1395.25,
			FoodAllergy:      "ถั่วลิสง",
			MedicalCondition: "เบาหวาน",
		},
		{
			FirstName:        "Bob",
			LastName:         "Johnson",
			DateOfBirth:      time.Date(1985, time.January, 20, 0, 0, 0, 0, time.UTC),
			PhoneNumber:      "0987654321",
			Height:           180,
			Weight:           80,
			CurrentPoint:     350,
			Bmr:              1730,
			FoodAllergy:      "นมวัว",
			MedicalCondition: "ความดันโลหิตสูง",
		},
		{
			FirstName:        "Charlie",
			LastName:         "Brown",
			DateOfBirth:      time.Date(1995, time.November, 25, 0, 0, 0, 0, time.UTC),
			PhoneNumber:      "0611223344",
			Height:           0,
			Weight:           0,
			CurrentPoint:     0,
			Bmr:              0,
			FoodAllergy:      "",
			MedicalCondition: "",
		},
	}
	for _, userProfile := range userProfile {
		db.FirstOrCreate(
			&userProfile,
			&entity.UserProfiles{
				FirstName: userProfile.FirstName,
			})
	}

	// Level
	level := []entity.Levels{
		{
			Level:    "1",
			MinPoint: 0,
			MaxPoint: 99,
		},
		{
			Level:    "2",
			MinPoint: 100,
			MaxPoint: 499,
		},
		{
			Level:    "3",
			MinPoint: 500,
			MaxPoint: 999,
		},
	}
	for _, level := range level {
		db.FirstOrCreate(
			&level,
			&entity.Levels{
				Level: level.Level,
			})
	}

	// NutritionGoals
	nutritionGoals := []entity.NutritionGoals{
		{
			Name:              "ลดน้ําหนัก",
			StartDate:         time.Date(2025, 6, 9, 0, 0, 0, 0, time.UTC),
			EndDate:           time.Date(2025, 9, 9, 0, 0, 0, 0, time.UTC),
			TargetWeights:     65,
			ProteinPercentage: 30,
			CarbsPercentage:   45,
			FatPercentage:     25,
			CalculatedTDEE:    1800,
			TargetCalories:    1500,
			TargetProtein:     112.5,
			TargetCarbs:       168.75,
			TargetFat:         41.67,
		},
		{
			Name:              "รักษาน้ําหนัก",
			StartDate:         time.Date(2025, 6, 10, 0, 0, 0, 0, time.UTC),
			EndDate:           time.Date(0, 0, 0, 0, 0, 0, 0, time.UTC),
			TargetWeights:     80,
			ProteinPercentage: 25,
			CarbsPercentage:   45,
			FatPercentage:     30,
			CalculatedTDEE:    2500,
			TargetCalories:    2500,
			TargetProtein:     112.5,
			TargetCarbs:       281.25,
			TargetFat:         83.33,
		},
		{
			Name:              "เพิ่มน้ําหนัก",
			StartDate:         time.Date(2025, 6, 11, 0, 0, 0, 0, time.UTC),
			EndDate:           time.Date(2025, 10, 11, 0, 0, 0, 0, time.UTC),
			TargetWeights:     65,
			ProteinPercentage: 35,
			CarbsPercentage:   40,
			FatPercentage:     25,
			CalculatedTDEE:    2800,
			TargetCalories:    3100,
			TargetProtein:     271.88,
			TargetCarbs:       310,
			TargetFat:         86.11,
		},
	}
	for _, nutritionGoals := range nutritionGoals {
		db.FirstOrCreate(
			&nutritionGoals,
			&entity.NutritionGoals{
				Name: nutritionGoals.Name,
			})
	}

	// EatingHistory
	eatingHistory := []entity.EatingHistory{
		{
			Name:              "ข้าวผัด",
			EatingHistoryDate: time.Date(2025, 1, 25, 0, 0, 0, 0, time.UTC),
			TotalCalories:     627.4,
			TotalProtein:      54.7,
			TotalCarbs:        15,
			TotalSodium:       782,
			TotalFat:          37.2,
			UserID:            1,
		},
		{
			Name:              "ต้มยำกุ้ง",
			EatingHistoryDate: time.Date(2025, 2, 26, 0, 0, 0, 0, time.UTC),
			TotalCalories:     345.2,
			TotalProtein:      22.5,
			TotalCarbs:        13,
			TotalSodium:       1200,
			TotalFat:          14.1,
			UserID:            1,
		},
		{
			Name:              "สปาเกตตี",
			EatingHistoryDate: time.Date(2025, 1, 27, 0, 0, 0, 0, time.UTC),
			TotalCalories:     702.1,
			TotalProtein:      28.3,
			TotalCarbs:        85,
			TotalSodium:       950,
			TotalFat:          22.8,
			UserID:            2,
		},
		{
			Name:              "ข้าวมันไก่",
			EatingHistoryDate: time.Date(2025, 1, 28, 0, 0, 0, 0, time.UTC),
			TotalCalories:     753.3,
			TotalProtein:      36.2,
			TotalCarbs:        78,
			TotalSodium:       1020,
			TotalFat:          29.4,
			UserID:            2,
		},
		{
			Name:              "ปีกไก่ย่าง",
			EatingHistoryDate: time.Date(2025, 1, 29, 0, 0, 0, 0, time.UTC),
			TotalCalories:     523.5,
			TotalProtein:      45.1,
			TotalCarbs:        8,
			TotalSodium:       830,
			TotalFat:          27.9,
			UserID:            1,
		},
	}
	for _, eatingHistory := range eatingHistory {
		db.FirstOrCreate(
			&eatingHistory,
			&entity.EatingHistory{
				EatingHistoryDate: eatingHistory.EatingHistoryDate,
			})
	}

	// MealType
	MealType1 := entity.MealType{MealType: "มือเช้า"}
	MealType2 := entity.MealType{MealType: "มื้อกลางวัน"}
	MealType3 := entity.MealType{MealType: "มื้อเย็น"}
	MealType4 := entity.MealType{MealType: "ของว่าง"}
	db.FirstOrCreate(&MealType1, &entity.MealType{MealType: "มือเช้า"})
	db.FirstOrCreate(&MealType2, &entity.MealType{MealType: "มือกลางวัน"})
	db.FirstOrCreate(&MealType3, &entity.MealType{MealType: "มือเย็น"})
	db.FirstOrCreate(&MealType4, &entity.MealType{MealType: "ของว่าง"})

	// MealFood
	mealFood := []entity.MealFoods{
		{
			Quantity: 1,
			FoodID:   5,
			MealID:   1,
		},
		{
			Quantity: 2,
			FoodID:   6,
			MealID:   2,
		},
		{
			Quantity: 1,
			FoodID:   11,
			MealID:   3,
		},
		{
			Quantity: 3,
			FoodID:   12,
			MealID:   4,
		},
		{
			Quantity: 1,
			FoodID:   55,
			MealID:   5,
		},
	}
	for _, mealFood := range mealFood {
		db.FirstOrCreate(
			&mealFood,
			&entity.MealFoods{
				FoodID: mealFood.FoodID,
				MealID: mealFood.MealID,
			})
	}

	// FoodType
	FoodType1 := entity.FoodType{FoodType: "ข้าวจานเดียว"}
	FoodType2 := entity.FoodType{FoodType: "ขนมหวาน"}
	FoodType3 := entity.FoodType{FoodType: "เมนูสุขภาพ"}
	FoodType4 := entity.FoodType{FoodType: "เครื่องดื่ม"}
	FoodType5 := entity.FoodType{FoodType: "อื่นๆ"}
	db.FirstOrCreate(&FoodType1, &entity.FoodType{FoodType: "ข้าวจานเดียว"})
	db.FirstOrCreate(&FoodType2, &entity.FoodType{FoodType: "ขนมหวาน"})
	db.FirstOrCreate(&FoodType3, &entity.FoodType{FoodType: "เมนูสุขภาพ"})
	db.FirstOrCreate(&FoodType4, &entity.FoodType{FoodType: "เครื่องดื่ม"})
	db.FirstOrCreate(&FoodType5, &entity.FoodType{FoodType: "อื่นๆ"})

	ExerciseType0 := entity.ExerciseType{Name: "Cardio"}
	ExerciseType1 := entity.ExerciseType{Name: "Flex"}
	ExerciseType2 := entity.ExerciseType{Name: "Strength"}

	db.FirstOrCreate(&ExerciseType0, &entity.ExerciseType{Name: "Cardio"})
	db.FirstOrCreate(&ExerciseType1, &entity.ExerciseType{Name: "Flex"})
	db.FirstOrCreate(&ExerciseType2, &entity.ExerciseType{Name: "Strength"})

	// กิจกรรมประเภท Cardio (ExerciseTypeId = 1)

	exercise1 := &entity.Exercise{
		Name:                  "Running",
		ExerciseTypeID:        1,
		CaloriesBurnPerMinute: 10,
	}
	db.FirstOrCreate(exercise1, &entity.Exercise{Name: "Running"})

	exercise2 := &entity.Exercise{
		Name:                  "Jumping rope",
		ExerciseTypeID:        1,
		CaloriesBurnPerMinute: 12,
	}
	db.FirstOrCreate(exercise2, &entity.Exercise{Name: "Jumping rope"})

	exercise3 := &entity.Exercise{
		Name:                  "Cycling (moderate speed)",
		ExerciseTypeID:        1,
		CaloriesBurnPerMinute: 8,
	}
	db.FirstOrCreate(exercise3, &entity.Exercise{Name: "Cycling (moderate speed)"})

	exercise4 := &entity.Exercise{
		Name:                  "Swimming",
		ExerciseTypeID:        1,
		CaloriesBurnPerMinute: 9,
	}
	db.FirstOrCreate(exercise4, &entity.Exercise{Name: "Swimming"})

	exercise5 := &entity.Exercise{
		Name:                  "Zumba",
		ExerciseTypeID:        1,
		CaloriesBurnPerMinute: 7,
	}
	db.FirstOrCreate(exercise5, &entity.Exercise{Name: "Zumba"})

	exercise6 := &entity.Exercise{
		Name:                  "Rowing machine",
		ExerciseTypeID:        1,
		CaloriesBurnPerMinute: 9,
	}
	db.FirstOrCreate(exercise6, &entity.Exercise{Name: "Rowing machine"})

	exercise7 := &entity.Exercise{
		Name:                  "Stair climbing",
		ExerciseTypeID:        1,
		CaloriesBurnPerMinute: 8,
	}
	db.FirstOrCreate(exercise7, &entity.Exercise{Name: "Stair climbing"})

	exercise8 := &entity.Exercise{
		Name:                  "High knees",
		ExerciseTypeID:        1,
		CaloriesBurnPerMinute: 10,
	}
	db.FirstOrCreate(exercise8, &entity.Exercise{Name: "High knees"})

	exercise9 := &entity.Exercise{
		Name:                  "Burpees",
		ExerciseTypeID:        1,
		CaloriesBurnPerMinute: 12,
	}
	db.FirstOrCreate(exercise9, &entity.Exercise{Name: "Burpees"})

	exercise10 := &entity.Exercise{
		Name:                  "Elliptical trainer",
		ExerciseTypeID:        1,
		CaloriesBurnPerMinute: 8,
	}
	db.FirstOrCreate(exercise10, &entity.Exercise{Name: "Elliptical trainer"})

	// กิจกรรมประเภท Flex (ExerciseTypeID = 2)
	exercise11 := &entity.Exercise{
		Name:                  "Yoga",
		ExerciseTypeID:        2,
		CaloriesBurnPerMinute: 3,
	}
	db.FirstOrCreate(exercise11, &entity.Exercise{Name: "Yoga"})

	exercise12 := &entity.Exercise{
		Name:                  "Stretching",
		ExerciseTypeID:        2,
		CaloriesBurnPerMinute: 2,
	}
	db.FirstOrCreate(exercise12, &entity.Exercise{Name: "Stretching"})

	exercise13 := &entity.Exercise{
		Name:                  "Tai Chi",
		ExerciseTypeID:        2,
		CaloriesBurnPerMinute: 4,
	}
	db.FirstOrCreate(exercise13, &entity.Exercise{Name: "Tai Chi"})

	exercise14 := &entity.Exercise{
		Name:                  "Dynamic stretching",
		ExerciseTypeID:        2,
		CaloriesBurnPerMinute: 3,
	}
	db.FirstOrCreate(exercise14, &entity.Exercise{Name: "Dynamic stretching"})

	exercise15 := &entity.Exercise{
		Name:                  "Foam rolling",
		ExerciseTypeID:        2,
		CaloriesBurnPerMinute: 2,
	}
	db.FirstOrCreate(exercise15, &entity.Exercise{Name: "Foam rolling"})

	exercise16 := &entity.Exercise{
		Name:                  "Pilates (light)",
		ExerciseTypeID:        2,
		CaloriesBurnPerMinute: 4,
	}
	db.FirstOrCreate(exercise16, &entity.Exercise{Name: "Pilates (light)"})

	exercise17 := &entity.Exercise{
		Name:                  "Neck rotations",
		ExerciseTypeID:        2,
		CaloriesBurnPerMinute: 1,
	}
	db.FirstOrCreate(exercise17, &entity.Exercise{Name: "Neck rotations"})

	exercise18 := &entity.Exercise{
		Name:                  "Hamstring stretch",
		ExerciseTypeID:        2,
		CaloriesBurnPerMinute: 2,
	}
	db.FirstOrCreate(exercise18, &entity.Exercise{Name: "Hamstring stretch"})

	exercise19 := &entity.Exercise{
		Name:                  "Calf stretch",
		ExerciseTypeID:        2,
		CaloriesBurnPerMinute: 2,
	}
	db.FirstOrCreate(exercise19, &entity.Exercise{Name: "Calf stretch"})

	exercise20 := &entity.Exercise{
		Name:                  "Shoulder rolls",
		ExerciseTypeID:        2,
		CaloriesBurnPerMinute: 2,
	}
	db.FirstOrCreate(exercise20, &entity.Exercise{Name: "Shoulder rolls"})

	// กิจกรรมประเภท Strength (ExerciseTypeID = 3)
	exercise21 := &entity.Exercise{
		Name:                  "Push-ups",
		ExerciseTypeID:        3,
		CaloriesBurnPerMinute: 7,
	}
	db.FirstOrCreate(exercise21, &entity.Exercise{Name: "Push-ups"})

	exercise22 := &entity.Exercise{
		Name:                  "Squats",
		ExerciseTypeID:        3,
		CaloriesBurnPerMinute: 8,
	}
	db.FirstOrCreate(exercise22, &entity.Exercise{Name: "Squats"})

	exercise23 := &entity.Exercise{
		Name:                  "Lunges",
		ExerciseTypeID:        3,
		CaloriesBurnPerMinute: 6,
	}
	db.FirstOrCreate(exercise23, &entity.Exercise{Name: "Lunges"})

	exercise24 := &entity.Exercise{
		Name:                  "Deadlifts",
		ExerciseTypeID:        3,
		CaloriesBurnPerMinute: 9,
	}
	db.FirstOrCreate(exercise24, &entity.Exercise{Name: "Deadlifts"})

	exercise25 := &entity.Exercise{
		Name:                  "Bench press",
		ExerciseTypeID:        3,
		CaloriesBurnPerMinute: 8,
	}
	db.FirstOrCreate(exercise25, &entity.Exercise{Name: "Bench press"})

	exercise26 := &entity.Exercise{
		Name:                  "Bicep curls",
		ExerciseTypeID:        3,
		CaloriesBurnPerMinute: 5,
	}
	db.FirstOrCreate(exercise26, &entity.Exercise{Name: "Bicep curls"})

	exercise27 := &entity.Exercise{
		Name:                  "Tricep dips",
		ExerciseTypeID:        3,
		CaloriesBurnPerMinute: 6,
	}
	db.FirstOrCreate(exercise27, &entity.Exercise{Name: "Tricep dips"})

	exercise28 := &entity.Exercise{
		Name:                  "Plank (isometric hold)",
		ExerciseTypeID:        3,
		CaloriesBurnPerMinute: 5,
	}
	db.FirstOrCreate(exercise28, &entity.Exercise{Name: "Plank (isometric hold)"})

	exercise29 := &entity.Exercise{
		Name:                  "Leg press",
		ExerciseTypeID:        3,
		CaloriesBurnPerMinute: 7,
	}
	db.FirstOrCreate(exercise29, &entity.Exercise{Name: "Leg press"})

	exercise30 := &entity.Exercise{
		Name:                  "Kettlebell swings",
		ExerciseTypeID:        3,
		CaloriesBurnPerMinute: 10,
	}
	db.FirstOrCreate(exercise30, &entity.Exercise{Name: "Kettlebell swings"})

	// เพิ่มกิจกรรม ExerciseActivity
	activityDate, _ := time.Parse("2006-01-02", "2025-05-20")
	exerciseActivity := &entity.ExerciseActivity{
		UserID:         1,
		ExerciseID:     1,
		Date:           activityDate,
		Duration:       30,
		CaloriesBurned: 10 * 30, // คำนวณจากค่าของ ExerciseID = 1
	}
	db.FirstOrCreate(exerciseActivity, &entity.ExerciseActivity{
		UserID: 1,
		Date:   activityDate,
	})

}

// Import food data from CSV
func importFoodData() {
	file, err := os.Open("thai_food_menu.csv")
	if err != nil {
		panic("CSV not found: " + err.Error())
	}
	defer file.Close()

	reader := csv.NewReader(file)
	reader.FieldsPerRecord = -1

	rows, err := reader.ReadAll()
	if err != nil {
		panic("Cannot read CSV: " + err.Error())
	}

	// loop
	for i, row := range rows {
		if i == 0 {
			continue // skip header
		}

		if len(row) < 8 {
			continue // ข้ามแถวที่ข้อมูลไม่ครบ
		}

		// trim + convert
		name := strings.TrimSpace(row[1])
		calories, _ := strconv.ParseFloat(strings.TrimSpace(row[2]), 64)
		// sugar, _ := strconv.ParseFloat(strings.TrimSpace(row[9]), 64)
		fat, _ := strconv.ParseFloat(strings.TrimSpace(row[5]), 64)
		sodium, _ := strconv.ParseFloat(strings.TrimSpace(row[6]), 64)
		protein, _ := strconv.ParseFloat(strings.TrimSpace(row[3]), 64)
		carbs, _ := strconv.ParseFloat(strings.TrimSpace(row[4]), 64)

		image := strings.TrimSpace(row[8])
		foodTypeID, _ := strconv.ParseUint(strings.TrimSpace(row[7]), 10, 64)

		food := entity.Foods{
			FoodName: name,
			Calories: calories,
			Protein:  protein,
			Carbs:    carbs,
			Sodium:   sodium,
			Fat:      fat,
			// Sugar:      sugar,
			FoodTypeID: uint(foodTypeID),
			ImageUrl:   image,
		}

		// Food
		result := db.FirstOrCreate(&food, entity.Foods{FoodName: name})

		// FoodRecommend
		// เช็คว่ามี FoodRecommend สำหรับเมนูนี้อยู่แล้วหรือยัง
		var recommend entity.FoodRecommend
		if result.RowsAffected > 0 && i <= 10 {
			randomUserID := rand.Intn(3) + 1

			db.FirstOrCreate(&recommend, entity.FoodRecommend{
				Name:   name + " อร่อยมาก",
				FoodID: food.ID,
				UserID: uint(randomUserID), // 👈 สุ่มจาก 1–3
			})

			// ถ้ายังไม่เคยมี ก็ค่อยเติมรายละเอียด
			if recommend.ID == 0 || recommend.DesCription == "" {
				recommend.DesCription = fmt.Sprintf("เมนูแนะนำที่มีพลังงาน %.0f แคลอรี่", calories)
				recommend.Instruction = "เสิร์ฟแบบเย็น หรือรับประทานเดี่ยว ๆ ก่อนนอน"
				recommend.Benefits = "ช่วยเสริมสร้างกล้ามเนื้อ\nลดความรู้สึกหิว\nดีต่อระบบย่อยอาหาร"
				recommend.Disadvantages = "หากรับประทานมากเกินไปอาจทำให้ได้รับไขมันหรือโซเดียมเกิน"

				// // 👉 สร้าง Like mockup แบบสุ่ม UserID (1–3) โดยไม่ซ้ำ
				// numLikes := rand.Intn(3) + 1
				// userUsed := map[int]bool{}
				// for count := 0; count < numLikes; {
				// 	uid := rand.Intn(3) + 1
				// 	if !userUsed[uid] {
				// 		userUsed[uid] = true
				// 		like := entity.Like{
				// 			UserID:          uint(uid),
				// 			FoodRecommendID: recommend.ID,
				// 		}
				// 		db.FirstOrCreate(&like, entity.Like{
				// 			UserID:          like.UserID,
				// 			FoodRecommendID: like.FoodRecommendID,
				// 		})
				// 		count++
				// 	}
				// }

				//Like
				like := []entity.Like{
					{
						UserID:          1,
						FoodRecommendID: 1,
					},
					{
						UserID:          2,
						FoodRecommendID: 1,
					},
					{
						UserID:          3,
						FoodRecommendID: 1,
					},
					{
						UserID:          1,
						FoodRecommendID: 2,
					},
					{
						UserID:          2,
						FoodRecommendID: 2,
					},
					{
						UserID:          2,
						FoodRecommendID: 3,
					},
					{
						UserID:          3,
						FoodRecommendID: 3,
					},
					{
						UserID:          2,
						FoodRecommendID: 4,
					},
					{
						UserID:          3,
						FoodRecommendID: 5,
					},
					{
						UserID:          2,
						FoodRecommendID: 6,
					},
					{
						UserID:          1,
						FoodRecommendID: 7,
					},
					{
						UserID:          2,
						FoodRecommendID: 8,
					},
					{
						UserID:          3,
						FoodRecommendID: 9,
					},
					{
						UserID:          3,
						FoodRecommendID: 10,
					},
				}
				for _, like := range like {
					db.FirstOrCreate(
						&like,
						&entity.Like{
							UserID:          like.UserID,
							FoodRecommendID: like.FoodRecommendID,
						})
				}

				// 👉 อัปเดต LikeCount ตามจริง
				var likeCount int64
				db.Model(&entity.Like{}).Where("food_recommend_id = ?", recommend.ID).Count(&likeCount)
				recommend.LikeCount = uint(likeCount)

				db.Save(&recommend)
			}
		}
	}
}

func seedLikesMatchingLikeCount() {
	var recommends []entity.FoodRecommend
	db.Find(&recommends)

	for _, rec := range recommends {
		existingLikes := []entity.Like{}
		db.Where("food_recommend_id = ?", rec.ID).Find(&existingLikes)

		likeCount := len(existingLikes)
		if likeCount >= int(rec.LikeCount) {
			continue // Already enough likes
		}

		// หาผู้ใช้ที่ยังไม่ได้ like
		var users []entity.Users
		db.Find(&users)

		added := 0
		for _, user := range users {
			if added >= int(rec.LikeCount)-likeCount {
				break
			}

			// Skip if already liked
			var count int64
			db.Model(&entity.Like{}).
				Where("user_id = ? AND food_recommend_id = ?", user.ID, rec.ID).
				Count(&count)

			if count == 0 {
				db.Create(&entity.Like{
					UserID:          user.ID,
					FoodRecommendID: rec.ID,
				})
				added++
			}
		}
	}
}
