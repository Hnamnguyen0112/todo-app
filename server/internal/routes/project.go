package routes

import (
	"github.com/gofiber/fiber/v2"

	"github.com/Hnamnguyen0112/todo-app/server/internal/handler"
	"github.com/Hnamnguyen0112/todo-app/server/pkg/middlewares"
)

func ProjectRouter(app fiber.Router, handler *handler.Handler) {
	app.Get("/", middlewares.Protected(), handler.GetProjectList)
	app.Post("/", middlewares.Protected(), handler.CreateProject)
	app.Get("/:id", middlewares.Protected(), handler.GetProjectById)
	app.Post("/:id/columns", middlewares.Protected(), handler.AddColumnToProject)
	app.Post("/:id/tasks", middlewares.Protected(), handler.AddTaskToProject)
}
