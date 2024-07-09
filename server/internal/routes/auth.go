package routes

import (
	"github.com/gofiber/fiber/v2"

	"github.com/Hnamnguyen0112/todo-app/server/internal/handler"
	"github.com/Hnamnguyen0112/todo-app/server/pkg/middlewares"
)

func AuthRouter(app fiber.Router, handler *handler.Handler) {
	app.Post("/signin", handler.SignIn)
	app.Post("/signup", handler.SignUp)
	app.Post("/forgot-password", handler.ForgotPassword)
	app.Post("/signout", middlewares.Protected(), handler.SignOut)
	app.Post("/reset-password", middlewares.Protected(), handler.ResetPassword)
}
