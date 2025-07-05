package controller

import (
	"backend/config"
	"backend/entity"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

// ===== ฟังก์ชันช่วยคำนวณ BMR =====
func calculateBMR(profile *entity.UserProfile, genderName string) float32 {
	// แปลงเพศภาษาไทยเป็นภาษาอังกฤษแบบง่ายๆ
	genderMap := map[string]string{
		"ชาย":   "male",
		"หญิง": "female",
		"male":  "male",
		"female": "female",
	}

	// หาเพศเป็น english จาก map
	gender, ok := genderMap[genderName]
	if !ok {
		return 0
	}

	// คำนวณอายุแบบประมาณ (ปี)
	age := int(time.Since(profile.DateOfBirth).Hours() / 24 / 365.25)

	weight := float64(profile.WeightKg)
	height := float64(profile.HeightCm)
	a := float64(age)

	if gender == "male" {
		// สูตร Mifflin-St Jeor ชาย
		bmr := (10 * weight) + (6.25 * height) - (5 * a) + 5
		return float32(bmr)
	} else if gender == "female" {
		// สูตร Mifflin-St Jeor หญิง
		bmr := (10 * weight) + (6.25 * height) - (5 * a) - 161
		return float32(bmr)
	}

	return 0
}

//GET /profile
func ListProfiles(c *gin.Context){
	var profiles []entity.UserProfile

	db := config.DB()
	results := db.Find(&profiles)
	if results.Error != nil{
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, profiles)
}

//GET /profile/:id
func GetUserProfileByID(c *gin.Context){
	profileID := c.Param("id")
	var profile entity.UserProfile

	db := config.DB()
	results := db.First(&profile, profileID)
	if results.Error != nil{
		c.JSON(http.StatusNotFound, gin.H{"error":results.Error.Error()})
		return
	}
	if profile.ID == 0 {
		c.JSON(http.StatusNoContent, gin.H{})
		return
	}
	c.JSON(http.StatusOK, profile)
}

//GET /users/:id/profile
// func GetUserProfileByUserID(c *gin.Context){
// 	profileID := c.Param("id")
// 	var profiles []entity.UserProfile

// 	db := config.DB()
// 	results := db.Preload("User").Find(&profiles, "user_id=?", profileID)
// 	if results.Error != nil{
// 		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
// 		return
// 	}
// 	c.JSON(http.StatusOK, profiles)
// }

//POST /profile
func CreateUserProfile(c *gin.Context){
	var profile entity.UserProfile

	// Bind ข้อมูลจาก JSON
	if err := c.ShouldBindJSON(&profile); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	var user entity.User
	if profile.UserID == 0{
		c.JSON(http.StatusBadRequest, gin.H{"error": "UserID is required"})
		return
	}
	results := db.First(&user, profile.UserID)
	if results.Error != nil{
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	//ดึงชื่อเพศมาใช้คำนวณ BMR
	var gender entity.Gender
	if err := db.First(&gender, user.GenderID).Error; err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"error": "Gender not found"})
		return
	}

	//คำนวณ BMR ก่อนบันทึก
	profile.BMR = calculateBMR(&profile, gender.GenderName)

	//ค้นหาข้อมูลผู้ใช้โดยใช้ UserID
	// var user entity.User
	// db.First(&user, userprofile.UserID)
	// if user.ID == 0 {
	// 	c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
	// 	return
	// }

	// //ตั้งค่า Date of birth เป็นเวลาปัจจุบัน
	// userprofile.DateOfBirth = time.Now()

	// //สร้าง  UserProfile ใหม่
	// uf := entity.UserProfile{
	// 	FirstName: userprofile.FirstName,
	// 	LastName: userprofile.LastName,
	// 	DateOfBirth: time.Now(),
	// 	Phone: userprofile.Phone,
	// 	WeightKg: userprofile.WeightKg,
	// 	HeightCm: userprofile.HeightCm,
	// 	CurrentPoint: userprofile.CurrentPoint,
	// 	UserID: userprofile.UserID,
	// 	GenderID: userprofile.GenderID,
	// 	ActivityLevelID: userprofile.ActivityLevelID,
	// 	LevelID: userprofile.LevelID,
	// }

	//บันทึกข้อมูล  UserProfile
	if err := db.Create(&profile).Error; err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"message": "Create success", "data": profile})
}

// PATCH /profile/:id
func UpdateUserProfile(c *gin.Context) {
	profileID := c.Param("id")
	db := config.DB()

	// Step 1: Load existing profile
	var existingProfile entity.UserProfile
	if err := db.First(&existingProfile, profileID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "UserProfile not found"})
		return
	}

	// Step 2: Bind input JSON
	var input struct {
		FirstName         string    `json:"FirstName"`
		LastName          string    `json:"LastName"`
		Phone             string    `json:"Phone"`
		FoodAllergies     string    `json:"FoodAllergies"`
		MedicalConditions string    `json:"MedicalConditions"`
		DateOfBirth       time.Time `json:"DateOfBirth"`
		WeightKg          float32   `json:"WeightKg"`
		HeightCm          float32   `json:"HeightCm"`
		GenderID          uint      `json:"GenderID"`
		ActivityLevelID   uint      `json:"ActivityLevelID"`
		LevelID           uint      `json:"LevelID"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input: " + err.Error()})
		return
	}

	// Step 3: Begin transaction
	tx := db.Begin()
	if tx.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to start transaction"})
		return
	}

	defer func() {
		if r := recover(); r != nil {
			tx.Rollback()
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Unexpected error"})
		}
	}()

	// Step 4: Update UserProfile
	existingProfile.FirstName = input.FirstName
	existingProfile.LastName = input.LastName
	existingProfile.Phone = input.Phone
	existingProfile.FoodAllergies = input.FoodAllergies
	existingProfile.MedicalConditions = input.MedicalConditions
	existingProfile.DateOfBirth = input.DateOfBirth
	existingProfile.WeightKg = input.WeightKg
	existingProfile.HeightCm = input.HeightCm

	if err := tx.Save(&existingProfile).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update profile"})
		return
	}

	// Step 5: Update related User
	var user entity.User
	if err := tx.First(&user, existingProfile.UserID).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	if err := tx.Model(&user).Updates(map[string]interface{}{
		"GenderID":         input.GenderID,
		"ActivityLevelID":  input.ActivityLevelID,
		"LevelID":          input.LevelID,
	}).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update User"})
		return
	}

	// Step 6: Commit
	if err := tx.Commit().Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to commit transaction"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Updated successfully"})
}
