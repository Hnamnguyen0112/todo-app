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
	app.Delete("/:id/columns/:columnId", middlewares.Protected(), handler.DeleteColumnFromProject)
	app.Patch("/:id/columns/:columnId", middlewares.Protected(), handler.UpdateColumnFromProject)
	app.Post("/:id/tasks", middlewares.Protected(), handler.AddTaskToProject)
	app.Get("/:id/tasks/:taskId", middlewares.Protected(), handler.GetTaskById)
	// app.Patch("/:id/tasks/:taskId", middlewares.Protected(), handler.UpdateTaskById)
	app.Delete("/:id/tasks/:taskId", middlewares.Protected(), handler.DeleteTaskById)
}
