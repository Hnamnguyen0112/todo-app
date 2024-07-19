package handler

import (
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"

	"github.com/Hnamnguyen0112/todo-app/server/internal/presenter"
	"github.com/Hnamnguyen0112/todo-app/server/pkg/entities"
)

func (h *Handler) GetProjectList(c *fiber.Ctx) error {
	user := c.Locals("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	userIdString := claims["sub"].(string)

	userId, err := uuid.Parse(userIdString)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	projects, err := h.projectService.GetProjectListByUserId(userId)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	c.Locals("data", projects)
	return c.SendStatus(fiber.StatusOK)
}

func (h *Handler) CreateProject(c *fiber.Ctx) error {
	user := c.Locals("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	userIdString := claims["sub"].(string)

	userId, err := uuid.Parse(userIdString)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	p := new(entities.Project)
	req := &presenter.CreateProjectRequest{}

	if err := req.Bind(c, p, h.validator.validator); err != nil {
		return fiber.NewError(fiber.StatusUnprocessableEntity, err.Error())
	}

	if err := h.projectService.CreateProject(p); err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	if err := h.invitationService.SendInvitation(p, userId, true); err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	c.Locals("data", presenter.CreateProjectSuccessResponse(p))

	return c.SendStatus(fiber.StatusOK)
}
