package genders

import(
	"net/http"
	"github.com/gin-gonic/gin"

	"github.com/Khaichiaro/Capstone-Project/backend/entity"
	"github.com/Khaichiaro/Capstone-Project/backend/config"
)

func GetAll(c *gin.Context){
	db := config.DB()
	var genders []entity.Genders
	db.Find(&genders)
	c.JSON(http.StatusOK, genders)
}