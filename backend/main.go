package main

import (
	"fmt"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/cohere-ai/cohere-go"
)

func main() {
	r := gin.Default()

	// CORS middleware
	r.Use(cors.Default())

	// Initialize Cohere client
	co := cohere.NewClient("YOUR_COHERE_API_KEY")

	r.POST("/receive_transcript", func(c *gin.Context) {
		var json map[string]interface{}
		if err := c.ShouldBindJSON(&json); err != nil {
			c.JSON(400, gin.H{"error": err.Error()})
			return
		}

		transcript := json["transcript"].(string)
		fmt.Printf("Transcript received: %s\n", transcript)

		// You can handle the transcript here using Cohere client
		// co.Generate(...) or other Cohere methods

		c.JSON(200, gin.H{"message": "Transcript received successfully"})
	})

	// Run the server
	if err := r.Run(":8080"); err != nil {
		fmt.Println("Error starting server:", err)
	}
}
