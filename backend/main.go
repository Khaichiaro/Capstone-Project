package main

import (
	"backend/config"
	"backend/controller"
	"net/http"

	"github.com/gin-gonic/gin"
)

const PORT = "8000"

func main() {

	// open connection database
	config.ConnectionDB()

	//Generate databases
	config.SetupDatabase()

	r := gin.Default()

	r.Use(CORSMiddleware())

	router := r.Group("")
	{
		//User Route
		router.GET("/users", controller.ListUsers)
		router.GET("/user/:id", controller.GetUserByID)
		router.POST("/user", controller.CreateUser)
		router.PATCH("/user/:id", controller.UpdateUser)

		//UserProfile
		router.GET("/profiles", controller.ListProfiles)
		router.GET("/profile/:id", controller.GetUserProfileByID)
		// router.GET("/users/:id/profile", controller.GetUserProfileByUserID)
		router.POST("/profile", controller.CreateUserProfile)
		router.PATCH("/profile/:id", controller.UpdateUserProfile)

		//ActivityLevel
		router.GET("/activity-levels", controller.ListActivityLevels)

		//ActivityType
		router.GET("/activity-types", controller.ListActivityTyeps)
		router.GET("/activity-type/:id", controller.GetActivityTypeByID)

		//Gender
		router.GET("/genders", controller.ListGenders)

		//Level
		router.GET("/levels", controller.ListLevels)
		router.GET("/level/:id", controller.GetLevelByUserProfileID)

		//NutritionGoal
		router.GET("/nutrition-goals", controller.ListNutritionGoals)
		router.GET("/nutrition-goal/:id", controller.GetNutritionGoalByID)
		router.GET("/user/:id/nutrition-goal", controller.GetNutritionGoalByUserID)
		router.POST("/nutrition-goal", controller.CreateNutritionGoal)
		router.PATCH("/nutrition-goal/:id", controller.UpdateNutritionGoal)

		//UserActivity
		router.GET("/user-activities", controller.ListUserActivities)
		router.GET("/user-activity/:id", controller.GetUserActivityByID)
		router.POST("/user-activity", controller.CreateUserActivity)

		//DailyNutrientSum
		router.GET("/daily-nutrients", controller.ListDailyNutrientSums)
		router.GET("/daily-nutrients/:id", controller.GetDailyNutrientSumByID)
		router.GET("/user/:id/daily-nutrient", controller.GetDailyNutrientSumByUserID)
		router.POST("/daily-nutrient", controller.CreateDailyNutrientSum)
	}

	r.GET("/", func(c *gin.Context){
		c.String(http.StatusOK, "API RUNNING... PORT: %s", PORT)
	})

	//Run the server
	r.Run("localhost:" + PORT)
}

func CORSMiddleware() gin.HandlerFunc{
	return func(c *gin.Context){
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE, PATCH")

		if c.Request.Method == "OPTIONS"{
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	}
}