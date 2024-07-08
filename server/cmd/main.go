package main

import (
	"context"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"

	"github.com/Hnamnguyen0112/todo-app/server/internal/database"
	"github.com/Hnamnguyen0112/todo-app/server/internal/handler"
	"github.com/Hnamnguyen0112/todo-app/server/internal/redis"
	"github.com/Hnamnguyen0112/todo-app/server/internal/routes"
	"github.com/Hnamnguyen0112/todo-app/server/pkg/middlewares"
	"github.com/Hnamnguyen0112/todo-app/server/pkg/token"
	"github.com/Hnamnguyen0112/todo-app/server/pkg/user"
)

var ctx = context.Background()

func main() {
	database.Connect()
	redis.Connect()

	us := user.NewService()
	ts := token.NewService()

	app := fiber.New(fiber.Config{
		ReadBufferSize: 4096 * 2,
		ErrorHandler:   middlewares.ErrorHandlerMiddleware,
		Prefork:        true,
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

	app.Listen(":3000")
}
