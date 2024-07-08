package routes

import (
	"github.com/gofiber/fiber/v2"

	"github.com/Hnamnguyen0112/todo-app/server/internal/handler"
)

func AuthRouter(app fiber.Router, handler *handler.Handler) {
	app.Post("/signin", handler.SignIn)
	app.Post("/signup", handler.SignUp)
	app.Post("/signout", handler.SignOut)
	app.Post("/forgot-password", handler.ForgotPassword)
	app.Post("/reset-password", handler.ResetPassword)
}
