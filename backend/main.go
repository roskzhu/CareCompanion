package main

import (
    "net/http"
    "fmt"
)

func main() {
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        fmt.Fprint(w, "Hello, Golang Backend!")
    })

    http.ListenAndServe(":8080", nil)
}
