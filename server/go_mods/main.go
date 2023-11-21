// main.go
package main1

import (
	"fmt"
	"log"
	// "net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/cohere-ai/cohere-go"
)

var cohereClient *cohere.Client

func main() {
	r := setupRouter()

	// Start the HTTP server on port 8080
	go func() {
		if err := r.Run(":8080"); err != nil {
			fmt.Println("Error starting server:", err)
		}
	}()

	// Run the server
	select {}
}

func setupRouter() *gin.Engine {
	r := gin.Default()

	// CORS middleware
	r.Use(cors.Default())

	// Initialize Cohere client
	var err error
	cohereClient, err = createCohereClient()
	if err != nil {
		log.Fatal("Error initializing Cohere client:", err)
	}

	// Register your handlers
	r.POST("/transcribe", func(c *gin.Context) {
		handleAudioRequest(c.Writer, c.Request)
	})
	r.POST("/receive_transcript", func(c *gin.Context) {
		receiveTranscriptHandler(c, cohereClient)
	})
	r.POST("/cohere_chat", func(c *gin.Context) {
		handleCohereChat(c.Writer, c.Request, c, cohereClient)
	}) // Added route for Cohere chat

	return r
}

// Function to create a Cohere client
// func createCohereClient() (*cohere.Client, error) {
// 	client, err := cohere.CreateClient(cohereAPIKey)
// 	if err != nil {
// 		log.Printf("Error creating Cohere client: %v", err)
// 		return nil, err
// 	}
// 	return client, nil
// }
