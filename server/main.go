// main.go
package main

import (
    "fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors" // Import the cors middleware
)


func main() {
    r := gin.Default()

    // CORS middleware
	r.Use(cors.Default())

    // Register your handlers
    r.POST("/transcribe", handleAudioRequest)
    r.POST("/receive_transcript", receiveTranscriptHandler)
    r.POST("/cohere_chat", handleCohereChat) // Added route for Cohere chat

	// Start the HTTP server on port 8080
	log.Fatal(http.ListenAndServe(":8080", nil))

    // Run the server
    if err := r.Run(":8080"); err != nil {
        fmt.Println("Error starting server:", err)
    }
}
