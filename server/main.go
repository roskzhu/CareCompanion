// main.go
package main

import (
    "fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors" // Import the cors middleware
    "github.com/cohere-ai/cohere-go"
)


func main() {
    r := gin.Default()

    // CORS middleware
	r.Use(cors.Default())

	// Create Cohere client
	var err error
    var cohereClient *cohere.Client
	cohereClient, err = createCohereClient()
	if err != nil {
		log.Fatalf("Error creating Cohere client: %v", err)
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
    })

	// Start the HTTP server on port 8080
	log.Fatal(http.ListenAndServe(":8080", nil))

    // Run the server
    if err := r.Run(":8080"); err != nil {
        fmt.Println("Error starting server:", err)
    }
}
