// handlers.go
package main

import (
    "fmt"
    "github.com/gin-gonic/gin"
    "github.com/cohere-ai/cohere-go"
)

func ReceiveTranscriptHandler(c *gin.Context) {
    var json map[string]interface{}
    if err := c.ShouldBindJSON(&json); err != nil {
        c.JSON(400, gin.H{"error": err.Error()})
        return
    }

    transcript := json["transcript"].(string)
    personality := json["personality"].(string)

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
}
