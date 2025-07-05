package controller

import (
	"backend/config"
	"backend/entity"
	"net/http"

	"github.com/gin-gonic/gin"
)

//GET /genders
func ListGenders(c *gin.Context){
	var genders []entity.Gender

	db := config.DB()
	results := db.Find(&genders)
	if results.Error != nil{
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, genders)
}