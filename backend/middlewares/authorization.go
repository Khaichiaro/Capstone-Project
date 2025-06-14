package middlewares

import(
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/Khaichiaro/Capstone-Project/backend/services"
)

var HashKey = []byte("very-secret")
var BlockKey = []byte("a-lot-secret1234")

// Authorization cookie check
func Authorization() gin.HandlerFunc {
	return func(c *gin.Context){
		clientToken := c.Request.Header.Get("Authorization")
		if clientToken == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "No Authorization header provided"})
			return
		}

		extractedToken := strings.Split(clientToken, "Bearer ")
		if len(extractedToken) == 2 {
			clientToken = strings.TrimSpace(extractedToken[1])
		} else {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Incorrect Format of Authorization Token"})
			return
		}

		jwtWrapper := services.JwtWrapper{
			SecretKey:       "SvNQpBN8y3qlVrsGAYYWoJJk56LtzFHx",
			Issuer:          "AuthService",
		}

		_, err := jwtWrapper.ValidateToken(clientToken)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			return
		}
		c.Next()
		
	}
}