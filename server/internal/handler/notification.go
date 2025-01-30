package handler

import (
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"

	"github.com/Hnamnguyen0112/todo-app/server/pkg/pagination"
)

func (h *Handler) GetNotifications(c *fiber.Ctx) error {
	user := c.Locals("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	userIdString := claims["sub"].(string)

	userId, err := uuid.Parse(userIdString)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	req := &pagination.PaginationRequest{}

	notifications, meta, err := h.notificationService.GetNotificationsByUserId(
		userId,
		req,
	)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	c.Locals("data", notifications)
	c.Locals("meta", meta)
	return c.SendStatus(fiber.StatusOK)
}
