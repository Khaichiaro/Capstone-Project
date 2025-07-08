package main

import (
	"net/http"

	"github.com/Khaichiaro/Capstone-Project/backend/config"

	"github.com/Khaichiaro/Capstone-Project/backend/controller/eatingHistory"
	"github.com/Khaichiaro/Capstone-Project/backend/controller/exercise"
	"github.com/Khaichiaro/Capstone-Project/backend/controller/exerciseActivity"
	"github.com/Khaichiaro/Capstone-Project/backend/controller/genders"
	recommendsystems "github.com/Khaichiaro/Capstone-Project/backend/controller/recommendSystems"
	"github.com/Khaichiaro/Capstone-Project/backend/controller/users"

	"github.com/Khaichiaro/Capstone-Project/backend/middlewares"
	"github.com/gin-gonic/gin"
)

const POST = "8000"

func main() {

	config.ConnectionDB()
	config.SetupDatabase()

	r := gin.Default()

	r.Use(CORSMiddleware())

	// Auth Route
	r.POST("/signup", users.SignUp)
	r.POST("/signin", users.SignIn)

	router := r.Group("/")
	{
		router.Use(middlewares.Authorization())
		// // User Route
		// router.GET("/users", users.GetAll)

		// // Gender Route
		// router.GET("/genders", genders.GetAll)
	}

	// เราจะเอาออกมา test ข้างนอก Auth ก่อน เพื่อที่จะได้ไม่ต้องแปะ Header ตลอด เวลา test postman
	// เขียน service ตัวเองต่อลงไปได้เลย ตอน ทำ login เดียวเรามาแก้เอง
	// User Route
	r.GET("/users", users.GetAll)
	r.GET("/users/:id", users.GetUserById)

	// Gender Route
	r.GET("/genders", genders.GetAll)

	// Food Recommend Route
	r.GET("/foodRecommend", recommendsystems.GetAllFoodRecommend)
	r.GET("/foodRanking", recommendsystems.GetAllFoodRecommendWithRanking)
	r.POST("/toggleLike", recommendsystems.ToggleLike)
	r.GET("/checkLikeStatus/:user_id/:food_recommend_id", recommendsystems.CheckLikeStatus)

	//Eating History Route
    r.GET("/eatingHistory", eatingHistory.GetEatingHistory)
    r.GET("/eatingHistory/:id", eatingHistory.GetEatingHistoryById)
    r.POST("/eatingHistory", eatingHistory.CreateEatingHistory)
    r.PATCH("/eatingHistory/:id", eatingHistory.UpdateEatingHistory)
    r.DELETE("/eatingHistory/:id", eatingHistory.DeleteEatingHistory)

	// Meals Route
	r.GET("/meals", eatingHistory.GetMeals)
	r.GET("/meals/:id", eatingHistory.GetMealsById)
	r.POST("/meals", eatingHistory.CreateMeals)
	r.PATCH("/meals/:id", eatingHistory.UpdateMeals)
	r.DELETE("/meals/:id", eatingHistory.DeleteMeals)

	// Meal Types Route
	r.GET("/meals/mealTypes", eatingHistory.GetMealTypes)

	   // Exercise Records Route
   	r.GET("/exercises", exercises.ListExercises)
	// Exercise Activity Route
   	r.GET("/exercise_activity/:id", exercise_activities.GetExerciseActivitiesbyID)                 // GetExerciseActivitiesbyID
   	r.GET("/exercise_activities/user/:user_id", exercise_activities.GetExerciseActivitiesbyUserID) // GetExerciseActivitiesbyUserID
   	r.POST("/exercise_activity", exercise_activities.CreateExerciseActivity)                       // CreateExerciseActivity
   	r.PUT("/exercise_activity/:id", exercise_activities.UpdateExerciseActivitybyID)
   	r.PATCH("/exercise_activity/:id", exercise_activities.PatchExerciseActivitybyID)                // UpdateExerciseActivitybyID
   	r.DELETE("/exercise_activity/:id", exercise_activities.DeleteExerciseActivitybyID) 

	r.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK,"API RUNNING... PORT: %s", POST)
	})

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})

	// Run the server
	r.Run("localhost:" + POST)
}

func CORSMiddleware() gin.HandlerFunc{
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")
		
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	}
}