package middlewares

import (
	"errors"

	"github.com/gofiber/fiber/v2"

	"github.com/Hnamnguyen0112/todo-app/server/pkg/utils"
)

type Error struct {
	Success bool        `json:"success"`
	Code    int         `json:"code"`
	Message string      `json:"message"`
	Error   interface{} `json:"error"`
	Data    interface{} `json:"data"`
	Meta    interface{} `json:"meta"`
}

func ErrorHandlerMiddleware(ctx *fiber.Ctx, err error) error {
	code := fiber.StatusInternalServerError

	var e *fiber.Error
	if errors.As(err, &e) {
		code = e.Code
	}

	if err != nil {
		return ctx.Status(code).JSON(Error{
			Success: false,
			Code:    code,
			Message: utils.StatusCodeMessages[code],
			Error:   err.Error(),
			Data:    ctx.Locals("data"),
			Meta:    ctx.Locals("meta"),
		})
	}

	return nil
}
