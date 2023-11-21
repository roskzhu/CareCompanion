// main.go
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

    r.POST("/receive_transcript", ReceiveTranscriptHandler)

    // Run the server
    if err := r.Run(":8080"); err != nil {
        fmt.Println("Error starting server:", err)
    }
}
