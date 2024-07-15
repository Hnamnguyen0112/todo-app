package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"

	"github.com/Hnamnguyen0112/todo-app/server/internal/database"
	"github.com/Hnamnguyen0112/todo-app/server/internal/eventstore"
	"github.com/Hnamnguyen0112/todo-app/server/internal/handler"
	"github.com/Hnamnguyen0112/todo-app/server/internal/redis"
	"github.com/Hnamnguyen0112/todo-app/server/internal/routes"
	"github.com/Hnamnguyen0112/todo-app/server/pkg/middlewares"
	"github.com/Hnamnguyen0112/todo-app/server/pkg/token"
	"github.com/Hnamnguyen0112/todo-app/server/pkg/user"
)

var ctx = context.Background()

const idleTimeout = 5 * time.Second

func main() {
	database.Connect()
	eventstore.Connect()
	redis.Connect()

	us := user.NewService()
	ts := token.NewService()

	app := fiber.New(fiber.Config{
		ReadBufferSize: 4096 * 2,
		ErrorHandler:   middlewares.ErrorHandlerMiddleware,
		Prefork:        true,
		IdleTimeout:    idleTimeout,
	})

	app.Use(logger.New())
	app.Use(recover.New())

	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowHeaders: "Origin, Content-Type, Accept, Authorization",
		AllowMethods: "GET, HEAD, PUT, PATCH, POST, DELETE",
	}))

	app.Use(middlewares.ResponseFormatterMiddleware)

	api := app.Group("/api")
	v1 := api.Group("/v1")

	h := handler.NewHandler(handler.HandlerParams{
		UserService:  us,
		TokenService: ts,
	})

	routes.AuthRouter(v1.Group("/auth"), h)

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)

	go func() {
		if err := app.Listen(":8000"); err != nil {
			log.Fatalf("Failed to start Fiber app: %v", err)
		}
	}()

	sig := <-quit
	log.Printf("Received %s signal. Shutting down server with PID: %d", sig, os.Getpid())

	if err := app.Shutdown(); err != nil {
		log.Fatalf("Failed to shutdown server: %v", err)
	}

	fmt.Println("Running cleanup tasks...")

	database.Disconnect()
	redis.Disconnect()
	eventstore.Disconnect()

	log.Printf("Server with PID: %d gracefully stopped", os.Getpid())
}
