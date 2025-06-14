package main

import (
	"net/http"

	"github.com/Khaichiaro/Capstone-Project/backend/config"

	"github.com/Khaichiaro/Capstone-Project/backend/controller/users"
	"github.com/Khaichiaro/Capstone-Project/backend/controller/genders"
	"github.com/Khaichiaro/Capstone-Project/backend/controller/eatingHistory"

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

	// Gender Route
	r.GET("/genders", genders.GetAll)

	//Eating History Route
    r.GET("/eatingHistory", eatingHistory.GetEatingHistory)
    r.GET("/eatingHistory/:id", eatingHistory.GetEatingHistoryById)
    r.POST("/eatingHistory", eatingHistory.CreateEatingHistory)
    r.PATCH("/eatingHistory/:id", eatingHistory.UpdateEatingHistory)
    r.DELETE("/eatingHistory/:id", eatingHistory.DeleteEatingHistory)
	
	// // Meals Route
	// r.GET("/eatingHistory/meals", eatingHistory.GetMeals)
	
	// // Meal Types Route
	// r.GET("/eatingHistory/mealTypes", eatingHistory.GetMealTypes)

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