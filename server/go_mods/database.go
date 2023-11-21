package main1

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

func runMyDatabaseOperations() {
	// Replace these values with your actual MySQL connection details
	dsn := "your_username:your_password@tcp(127.0.0.1:3306)/data"

	// Open a connection to the MySQL database
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	// Test the connection
	err = db.Ping()
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connected to MySQL database!")

	// Now you can perform database operations using the db object
	// ...

	// Example: Querying data
	rows, err := db.Query("SELECT * FROM your_table_name")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	for rows.Next() {
		var id int
		var name string
		// Scan the result into variables
		err := rows.Scan(&id, &name)
		if err != nil {
			log.Fatal(err)
		}
		// Process the data
		fmt.Println(id, name)
	}

	// Insert data into the database
	value1 := "your_value1"
	value2 := "your_value2"

	// Example: Inserting data
	_, err = db.Exec("INSERT INTO your_table_name (column1, column2) VALUES (?, ?)", value1, value2)
	if err != nil {
		log.Fatal(err)
	}
}
