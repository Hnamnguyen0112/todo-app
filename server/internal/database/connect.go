package database

import (
	"fmt"
	"log"
	"os"
	"time"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"

	"github.com/Hnamnguyen0112/todo-app/server/config"
	"github.com/Hnamnguyen0112/todo-app/server/pkg/entities"
)

func Connect() {
	var err error

	dbUser := config.Config("DB_USER")
	dbPassword := config.Config("DB_PASSWORD")
	dbHost := config.Config("DB_HOST")
	dbPort := config.Config("DB_PORT")
	dbName := config.Config("DB_NAME")

	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Saigon",
		dbHost,
		dbUser,
		dbPassword,
		dbName,
		dbPort,
	)

	newLogger := logger.New(
		log.New(os.Stdout, "\r\n", log.LstdFlags), // io writer
		logger.Config{
			SlowThreshold:             time.Millisecond * 10, // Slow SQL threshold
			LogLevel:                  logger.Info,           // Log level
			IgnoreRecordNotFoundError: false,                 // Ignore ErrRecordNotFound error for logger
			Colorful:                  true,                  // Disable color
		},
	)

	DB, err = gorm.Open(postgres.New(postgres.Config{
		DSN: dsn,
	}), &gorm.Config{
		Logger: newLogger,
	})
	if err != nil {
		fmt.Println("database err: ", err)
	}

	sqlDB, err := DB.DB()
	if err != nil {
		fmt.Println("database err: ", err)
	}

	sqlDB.SetMaxIdleConns(3)
	sqlDB.SetMaxOpenConns(100)
	sqlDB.SetConnMaxLifetime(time.Hour)

	DB.AutoMigrate(
		&entities.User{},
	)
}
