// package controller

// import (
// 	"backend/config"
// 	"backend/entity"
// 	"net/http"
// 	"time"

// 	"github.com/gin-gonic/gin"
// )

// func calculateNutritionTargets(profile *entity.UserProfile, goal *entity.NutritionGoal) {
// 	// คำนวณอายุ
// 	age := int(time.Since(profile.DateOfBirth).Hours() / 24 / 365.25)

// 	// คำนวณ BMR (ถ้ายังไม่ได้คำนวณ)
// 	var bmr float64
// 	if profile.Gender.GenderName == "male" {
// 		bmr = 88.362 + (13.397 * float64(profile.WeightKg)) + (4.799 * float64(profile.HeightCm)) - (5.677 * float64(age))
// 	} else {
// 		bmr = 447.593 + (9.247 * float64(profile.WeightKg)) + (3.098 * float64(profile.HeightCm)) - (4.330 * float64(age))
// 	}

// 	// หาตัวคูณ TDEE
// 	tdee := bmr * float64(profile.ActivityLevel.Multiplier)

// 	// ตั้งค่า default เปอร์เซ็นต์
// 	var proteinPct, fatPct, carbPct float32 = 30, 25, 45 // default

// 	switch goal.GoalType {
// 	case "เพิ่มน้ำหนัก":
// 		goal.TargetCalories = float32(tdee + 300) // เพิ่มแคล
// 	case "ลดน้ำหนัก":
// 		goal.TargetCalories = float32(tdee - 300) // ลดแคล
// 	default:
// 		goal.TargetCalories = float32(tdee) // รักษาน้ำหนัก
// 	}

// 	// กำหนดเปอร์เซ็นต์
// 	goal.ProteinPercentage = proteinPct
// 	goal.FatPercentage = fatPct
// 	goal.CarbPercentage = carbPct

// 	// กำหนด TDEE และค่าสารอาหารเป้าหมาย
// 	goal.CalculatedTDEE = float32(tdee)

// 	tc := goal.TargetCalories
// 	goal.TargetProtein = (tc * proteinPct / 100) / 4  // 1g protein = 4 kcal
// 	goal.TargetCarbs = (tc * carbPct / 100) / 4       // 1g carb = 4 kcal
// 	goal.TargetFat = (tc * fatPct / 100) / 9          // 1g fat = 9 kcal
// }

// //GET /nutrition-goals
// func ListNutritionGoals(c *gin.Context){
// 	var nutritionGoals []entity.NutritionGoal

// 	db := config.DB()
// 	results := db.Preload("UserProfile").Find(&nutritionGoals)
// 	if results.Error != nil{
// 		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, nutritionGoals)
// }

// //GET /nutrition-goal/:id
// func GetNutritionGoalByID(c *gin.Context){
// 	nutritionGoalID := c.Param("id")
// 	var nutritionGoal entity.NutritionGoal

// 	db := config.DB()
// 	results := db.Preload("UserProfile").First(&nutritionGoal, nutritionGoalID)
// 	if results.Error != nil{
// 		c.JSON(http.StatusNotFound, gin.H{"error":results.Error.Error()})
// 		return
// 	}
// 	if nutritionGoal.ID == 0 {
// 		c.JSON(http.StatusNoContent, gin.H{})
// 		return
// 	}
// 	c.JSON(http.StatusOK, nutritionGoal)
// }

// //GET /user-profile/:id/nutrition-goal
// func GetNutritionGoalByUserProfileID(c *gin.Context){
// 	nutritionGoalID := c.Param("id")
// 	var nutritionGoals []entity.NutritionGoal

// 	db := config.DB()
// 	results := db.Preload("UserProfile").Find(&nutritionGoals, "user_profile_id=?", nutritionGoalID)
// 	if results.Error != nil{
// 		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, nutritionGoals)
// }

// // POST /nutrition-goal
// func CreateNutritionGoal(c *gin.Context){
// 	var nutritionGoal entity.NutritionGoal

// 	// Bind JSON
// 	if err := c.ShouldBindJSON(&nutritionGoal); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	db := config.DB()

// 	// โหลด UserProfile พร้อม Gender และ ActivityLevel สำหรับคำนวณ
// 	var userProfile entity.UserProfile
// 	if err := db.Preload("Gender").Preload("ActivityLevel").First(&userProfile, nutritionGoal.UserProfileID).Error; err != nil {
// 		c.JSON(http.StatusNotFound, gin.H{"error": "UserProfile not found"})
// 		return
// 	}

// 	// คำนวณค่าต่าง ๆ
// 	calculateNutritionTargets(&userProfile, &nutritionGoal)

// 	// สร้าง NutritionGoal
// 	if err := db.Create(&nutritionGoal).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	// โหลด NutritionGoal ใหม่พร้อมข้อมูลความสัมพันธ์เพื่อแสดงผลลัพธ์ให้สมบูรณ์
// 	var fullGoal entity.NutritionGoal
// 	if err := db.Preload("UserProfile.Gender").
// 		Preload("UserProfile.ActivityLevel").
// 		Preload("UserProfile.Level").
// 		First(&fullGoal, nutritionGoal.ID).Error; err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to load full goal"})
// 		return
// 	}

// 	c.JSON(http.StatusCreated, gin.H{"message": "Create success", "data": fullGoal})
// }

// // //POST /nutrition-goal
// // func CreateNutritionGoal(c *gin.Context){
// // 	var nutritionGoal entity.NutritionGoal

// // 	// Bind ข้อมูลจาก JSON
// // 	if err := c.ShouldBindJSON(&nutritionGoal); err != nil {
// // 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// // 		return
// // 	}

// // 	db := config.DB()

// // 	var userProfile entity.UserProfile
// // 	// if nutritionGoal.UserProfileID == 0{
// // 	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "UserProfileID is required"})
// // 	// 	return
// // 	// }
// // 	// results := db.First(&userProfile, nutritionGoal.UserProfileID)
// // 	// if results.Error != nil{
// // 	// 	c.JSON(http.StatusNotFound, gin.H{"error": "UserProfile not found"})
// // 	// 	return
// // 	// }
// // 	if err := db.Preload("Gender").Preload("ActivityLevel").First(&userProfile, nutritionGoal.UserProfileID).Error; err != nil{
// // 		c.JSON(http.StatusNotFound, gin.H{"error": "UserProfile not found"})
// // 		return
// // 	}

// // 	//คำนวณเป้าหมายโภชนาการ
// // 	calculateNutritionTargets(&userProfile, &nutritionGoal)

// // 	//บันทึกข้อมูล  UserProfile
// // 	if err := db.Create(&nutritionGoal).Error; err != nil{
// // 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// // 		return
// // 	}
// // 	c.JSON(http.StatusCreated, gin.H{"message": "Create success", "data": nutritionGoal})
// // }

// // //PATCH /nutrition-goal/:id
// // func UpdateNutritionGoal(c *gin.Context){
// // 	nutritionGoalID := c.Param("id")
// // 	var nutritionGoal entity.NutritionGoal

// // 	db := config.DB()
// // 	result := db.First(&nutritionGoal, nutritionGoalID)
// // 	if result.Error != nil{
// // 		c.JSON(http.StatusNotFound, gin.H{"error": "NutritionGoal not found"})
// // 		return
// // 	}

// // 	// Bind ข้อมูลจาก JSON เพื่ออัปเดต UserProfile
// // 	if err := c.ShouldBindJSON(&nutritionGoal); err != nil{
// // 		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
// // 		return
// // 	}

// // 	//บันทึกข้อมูลการอัปเดต
// // 	result = db.Save(&nutritionGoal)
// // 	if result.Error != nil{
// // 		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
// // 		return
// // 	}
// // 	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
// // }

// // PATCH /nutrition-goal/:id
// func UpdateNutritionGoal(c *gin.Context) {
// 	nutritionGoalID := c.Param("id")
// 	db := config.DB()

// 	var existingGoal entity.NutritionGoal
// 	if err := db.First(&existingGoal, nutritionGoalID).Error; err != nil {
// 		c.JSON(http.StatusNotFound, gin.H{"error": "NutritionGoal not found"})
// 		return
// 	}

// 	var input entity.NutritionGoal
// 	if err := c.ShouldBindJSON(&input); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON: " + err.Error()})
// 		return
// 	}

// 	// รวมค่าที่อัปเดตเข้ากับ existingGoal
// 	existingGoal.GoalType = input.GoalType
// 	existingGoal.TargetWeight = input.TargetWeight
// 	existingGoal.StartDate = input.StartDate
// 	existingGoal.EndDate = input.EndDate
// 	existingGoal.UserProfileID = input.UserProfileID

// 	// ต้องเพิ่ม: อัปเดตเปอร์เซ็นต์
// 	existingGoal.ProteinPercentage = input.ProteinPercentage
// 	existingGoal.FatPercentage = input.FatPercentage
// 	existingGoal.CarbPercentage = input.CarbPercentage

// 	// โหลด UserProfile เพื่อใช้ในการคำนวณ
// 	var userProfile entity.UserProfile
// 	if err := db.Preload("Gender").Preload("ActivityLevel").First(&userProfile, existingGoal.UserProfileID).Error; err != nil {
// 		c.JSON(http.StatusNotFound, gin.H{"error": "UserProfile not found"})
// 		return
// 	}

// 	// คำนวณค่าใหม่
// 	calculateNutritionTargets(&userProfile, &existingGoal)

// 	// บันทึกการเปลี่ยนแปลง
// 	if err := db.Save(&existingGoal).Error; err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update NutritionGoal"})
// 		return
// 	}

// 	// preload ข้อมูลเต็มเพื่อส่งกลับ
// 	var fullGoal entity.NutritionGoal
// 	if err := db.Preload("UserProfile.Gender").
// 		Preload("UserProfile.ActivityLevel").
// 		Preload("UserProfile.Level").
// 		First(&fullGoal, existingGoal.ID).Error; err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to load updated goal"})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{
// 		"message": "Updated successfully",
// 		"data":    fullGoal,
// 	})
// }






//============================================= แก้จาก UserProfile เป็น User =================================================================
package controller

import (
	"backend/config"
	"backend/entity"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

func calculateNutritionTargets(profile *entity.UserProfile, goal *entity.NutritionGoal, user *entity.User) {
	// คำนวณอายุ
	age := int(time.Since(profile.DateOfBirth).Hours() / 24 / 365.25)

	// คำนวณ BMR (ถ้ายังไม่ได้คำนวณ)
	var bmr float64
	if user.Gender.GenderName == "male" {
		bmr = 88.362 + (13.397 * float64(profile.WeightKg)) + (4.799 * float64(profile.HeightCm)) - (5.677 * float64(age))
	} else {
		bmr = 447.593 + (9.247 * float64(profile.WeightKg)) + (3.098 * float64(profile.HeightCm)) - (4.330 * float64(age))
	}

	// หาตัวคูณ TDEE
	tdee := bmr * float64(user.ActivityLevel.Multiplier)

	// ตั้งค่า default เปอร์เซ็นต์
	var proteinPct, fatPct, carbPct float32 = 30, 25, 45 // default

	switch goal.GoalType {
	case "เพิ่มน้ำหนัก":
		goal.TargetCalories = float32(tdee + 300) // เพิ่มแคล
	case "ลดน้ำหนัก":
		goal.TargetCalories = float32(tdee - 300) // ลดแคล
	default:
		goal.TargetCalories = float32(tdee) // รักษาน้ำหนัก
	}

	// กำหนดเปอร์เซ็นต์
	goal.ProteinPercentage = proteinPct
	goal.FatPercentage = fatPct
	goal.CarbPercentage = carbPct

	// กำหนด TDEE และค่าสารอาหารเป้าหมาย
	goal.CalculatedTDEE = float32(tdee)

	tc := goal.TargetCalories
	goal.TargetProtein = (tc * proteinPct / 100) / 4  // 1g protein = 4 kcal
	goal.TargetCarbs = (tc * carbPct / 100) / 4       // 1g carb = 4 kcal
	goal.TargetFat = (tc * fatPct / 100) / 9          // 1g fat = 9 kcal
}

//GET /nutrition-goals
func ListNutritionGoals(c *gin.Context){
	var nutritionGoals []entity.NutritionGoal

	db := config.DB()
	results := db.Preload("User").Find(&nutritionGoals)
	if results.Error != nil{
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, nutritionGoals)
}

//GET /nutrition-goal/:id
func GetNutritionGoalByID(c *gin.Context){
	nutritionGoalID := c.Param("id")
	var nutritionGoal entity.NutritionGoal

	db := config.DB()
	results := db.Preload("User").First(&nutritionGoal, nutritionGoalID)
	if results.Error != nil{
		c.JSON(http.StatusNotFound, gin.H{"error":results.Error.Error()})
		return
	}
	if nutritionGoal.ID == 0 {
		c.JSON(http.StatusNoContent, gin.H{})
		return
	}
	c.JSON(http.StatusOK, nutritionGoal)
}

//GET /user/:id/nutrition-goal
func GetNutritionGoalByUserID(c *gin.Context){
	nutritionGoalID := c.Param("id")
	var nutritionGoals []entity.NutritionGoal

	db := config.DB()
	results := db.Preload("User").Find(&nutritionGoals, "user_id=?", nutritionGoalID)
	if results.Error != nil{
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, nutritionGoals)
}

// POST /nutrition-goal
func CreateNutritionGoal(c *gin.Context){
	var nutritionGoal entity.NutritionGoal

	// Bind JSON
	if err := c.ShouldBindJSON(&nutritionGoal); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	// โหลด UserProfile พร้อม Gender และ ActivityLevel สำหรับคำนวณ
	var user entity.User
	if err := db.Preload("Gender").Preload("ActivityLevel").First(&user, nutritionGoal.UserID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	var userProfile entity.UserProfile
	if err := db.Where("user_id = ?", user.ID).First(&userProfile).Error; err != nil {
    	c.JSON(http.StatusNotFound, gin.H{"error": "UserProfile not found"})
    	return
	}


	// คำนวณค่าต่าง ๆ
	calculateNutritionTargets(&userProfile, &nutritionGoal, &user)

	// สร้าง NutritionGoal
	if err := db.Create(&nutritionGoal).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// โหลด NutritionGoal ใหม่พร้อมข้อมูลความสัมพันธ์เพื่อแสดงผลลัพธ์ให้สมบูรณ์
	var fullGoal entity.NutritionGoal
	if err := db.Preload("User.Gender").
		Preload("User.ActivityLevel").
		Preload("User.Level").
		First(&fullGoal, nutritionGoal.ID).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to load full goal"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Create success", "data": fullGoal})
}

// PATCH /nutrition-goal/:id
func UpdateNutritionGoal(c *gin.Context) {
	nutritionGoalID := c.Param("id")
	db := config.DB()

	var existingGoal entity.NutritionGoal
	if err := db.First(&existingGoal, nutritionGoalID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "NutritionGoal not found"})
		return
	}

	// เช็คค่า UserID ก่อนใช้งาน
if existingGoal.UserID == 0 {
    c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid UserID in NutritionGoal"})
    return
}

	var input entity.NutritionGoal
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON: " + err.Error()})
		return
	}

	// รวมค่าที่อัปเดตเข้ากับ existingGoal
	existingGoal.GoalType = input.GoalType
	existingGoal.TargetWeight = input.TargetWeight
	existingGoal.StartDate = input.StartDate
	existingGoal.EndDate = input.EndDate
	// existingGoal.UserID = input.UserID

	// ต้องเพิ่ม: อัปเดตเปอร์เซ็นต์
	existingGoal.ProteinPercentage = input.ProteinPercentage
	existingGoal.FatPercentage = input.FatPercentage
	existingGoal.CarbPercentage = input.CarbPercentage

	// โหลด UserProfile เพื่อใช้ในการคำนวณ
	var userProfile entity.UserProfile
	if err := db.First(&userProfile, existingGoal.UserID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "UserProfile not found"})
		return
	}

	// โหลด User สำหรับการคำนวณ (เอาไว้ใช้ Gender และ ActivityLevel)
	var user entity.User
	if err := db.Preload("Gender").Preload("ActivityLevel").First(&user, existingGoal.UserID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

// ส่งเข้า calculateNutritionTargets
calculateNutritionTargets(&userProfile, &existingGoal, &user)


	// คำนวณค่าใหม่
	calculateNutritionTargets(&userProfile, &existingGoal, &user)

	// บันทึกการเปลี่ยนแปลง
	if err := db.Save(&existingGoal).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update NutritionGoal"})
		return
	}

	// preload ข้อมูลเต็มเพื่อส่งกลับ
	var fullGoal entity.NutritionGoal
	if err := db.Preload("User.Gender").
		Preload("User.ActivityLevel").
		Preload("User.Level").
		First(&fullGoal, existingGoal.ID).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to load updated goal"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Updated successfully",
		"data":    fullGoal,
	})
}