package middlewares

import (
	"github.com/gofiber/fiber/v2"

	"github.com/Hnamnguyen0112/todo-app/server/pkg/utils"
)

type Response struct {
	Success bool        `json:"success"`
	Code    int         `json:"code"`
	Message string      `json:"message"`
	Error   interface{} `json:"error"`
	Data    interface{} `json:"data"`
	Meta    interface{} `json:"meta"`
}

func ResponseFormatterMiddleware(ctx *fiber.Ctx) error {
	// Call the next handler in the chain
	err := ctx.Next()
	if err != nil {
		return err
	}

	// Get the status code
	statusCode := ctx.Response().StatusCode()

	return ctx.Status(statusCode).JSON(Response{
		Success: true,
		Code:    ctx.Response().StatusCode(),
		Message: utils.StatusCodeMessages[ctx.Response().StatusCode()],
		Error:   nil,
		Data:    ctx.Locals("data"),
		Meta:    ctx.Locals("meta"),
	})
}
