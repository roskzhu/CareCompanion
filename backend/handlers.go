// handlers.go
package main

import (
    "bytes"
	"context"
	"encoding/base64"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strings"

    "github.com/gin-gonic/gin"
    "github.com/cohere-ai/cohere-go"

    "cloud.google.com/go/speech/apiv1"
	"google.golang.org/api/option"
	speechpb "google.golang.org/genproto/googleapis/cloud/speech/v1"
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


// Function to transcribe speech using Google Cloud Speech-to-Text API
func transcribeSpeech(audioContent []byte) (string, error) {
	ctx := context.Background()

	// Replace 'your-google-cloud-credentials.json' with the path to your Google Cloud API key JSON file.
	client, err := speech.NewClient(ctx, option.WithAPIKey(gcpAPIKey))
	if err != nil {
		return "", fmt.Errorf("failed to create Speech client: %v", err)
	}
	defer client.Close()

	// Create a SpeechRecognition request
	req := &speechpb.RecognizeRequest{
		Config: &speechpb.RecognitionConfig{
			Encoding:        speechpb.RecognitionConfig_LINEAR16,
			SampleRateHertz: 16000,
			LanguageCode:    "en-US",
		},
		Audio: &speechpb.RecognitionAudio{
			AudioSource: &speechpb.RecognitionAudio_Content{Content: audioContent},
		},
	}

	// Send the request to the Speech-to-Text API
	resp, err := client.Recognize(ctx, req)
	if err != nil {
		return "", fmt.Errorf("failed to recognize speech: %v", err)
	}

	// Check if there are any results
	if len(resp.Results) == 0 {
		return "", fmt.Errorf("no speech recognition results found")
	}

	// Extract and join the transcript from the results
	transcript := resp.Results[0].Alternatives[0].Transcript
	return transcript, nil
}

// Handler function for processing audio data from the frontend
func handleAudioRequest(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

    // Read the Google Cloud API key from an environment variable
	apiKey := os.Getenv("GOOGLE_CLOUD_API_KEY")
	if apiKey == "" {
		http.Error(w, "Google Cloud API key not set", http.StatusInternalServerError)
		return
	}

	// Read the audio data from the request body
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Error reading request body", http.StatusInternalServerError)
		return
	}

	// Decode base64-encoded audio data
	audioData, err := base64.StdEncoding.DecodeString(string(body))
	if err != nil {
		http.Error(w, "Error decoding audio data", http.StatusBadRequest)
		return
	}

	// Transcribe the speech using the Speech-to-Text API
	transcription, err := transcribeSpeech(audioData)
	if err != nil {
		log.Printf("Speech transcription error: %v", err)
		http.Error(w, "Error transcribing speech", http.StatusInternalServerError)
		return
	}

	// Return the transcription to the frontend
	fmt.Fprintf(w, "Transcription: %s", transcription)
}