package main

import (
	"fmt"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/cohere-ai/cohere-go"
)

func main() {
	r := gin.Default()

	// CORS middleware
	r.Use(cors.Default())

	// Initialize Cohere client
	cohereAPIKey := os.Getenv("COHERE_API_KEY")

	if cohereAPIKey == "" {
		fmt.Println("COHERE_API_KEY environment variable is not set.")
		return
	}

	co := cohere.NewClient(cohereAPIKey)

	r.POST("/receive_transcript", func(c *gin.Context) {
    var json map[string]interface{}
    if err := c.ShouldBindJSON(&json); err != nil {
        c.JSON(400, gin.H{"error": err.Error()})
        return
    }

    transcript := json["transcript"].(string)
    personality := json["personality"].(string) // Add a 'personality' field to the JSON payload

    fmt.Printf("Transcript received: %s\n", transcript)

    // Set the style/personality for the response
    styleOptions := cohere.StyleOptions{
        Personality: personality,
    }

    // You can handle the transcript here using Cohere client
    response, err := co.Generate(transcript, styleOptions)

    if err != nil {
        c.JSON(500, gin.H{"error": err.Error()})
        return
    }

    c.JSON(200, gin.H{"message": "Transcript received successfully", "response": response})
	})

	// Run the server
	if err := r.Run(":8080"); err != nil {
		fmt.Println("Error starting server:", err)
	}
}
