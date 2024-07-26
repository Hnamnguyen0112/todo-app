package handler

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"

	"github.com/Hnamnguyen0112/todo-app/server/internal/presenter"
	"github.com/Hnamnguyen0112/todo-app/server/pkg/entities"
	"github.com/Hnamnguyen0112/todo-app/server/pkg/pagination"
)

func (h *Handler) GetProjectList(c *fiber.Ctx) error {
	user := c.Locals("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	userIdString := claims["sub"].(string)

	req := &pagination.PaginationRequest{}

	if err := req.Bind(c); err != nil {
		return fiber.NewError(fiber.StatusUnprocessableEntity, err.Error())
	}

	userId, err := uuid.Parse(userIdString)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	projects, meta, err := h.projectService.GetProjectListByUserId(
		userId,
		req,
	)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	c.Locals("data", projects)
	c.Locals("meta", meta)
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

func (h *Handler) GetProjectById(c *fiber.Ctx) error {
	user := c.Locals("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	userIdString := claims["sub"].(string)

	userId, err := uuid.Parse(userIdString)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	projectIdString := c.Params("id")
	projectId, err := uuid.Parse(projectIdString)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	p, err := h.projectService.GetProjectByIdAndUserId(projectId, userId)
	if err != nil {
		return fiber.NewError(fiber.StatusNotFound, err.Error())
	}

	fmt.Println(p.Columns)

	c.Locals("data", p)
	return c.SendStatus(fiber.StatusOK)
}

func (h *Handler) AddColumnToProject(c *fiber.Ctx) error {
	user := c.Locals("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	userIdString := claims["sub"].(string)

	userId, err := uuid.Parse(userIdString)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	projectIdString := c.Params("id")
	projectId, err := uuid.Parse(projectIdString)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	req := &presenter.AddColumnToProjectRequest{}
	co := &entities.Column{}

	if err := req.Bind(c, co, h.validator.validator); err != nil {
		return fiber.NewError(fiber.StatusUnprocessableEntity, err.Error())
	}

	exists, err := h.columnService.FindColumnsByProjectIdAndPosition(projectId, co.Position)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	if len(exists) > 0 {
		return fiber.NewError(fiber.StatusConflict, "column with this position already exists")
	}

	p, err := h.projectService.GetProjectByIdAndUserId(projectId, userId)
	if err != nil {
		return fiber.NewError(fiber.StatusNotFound, err.Error())
	}

	if err := h.columnService.CreateColumnByProjectId(p.ID, co); err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	c.Locals("data", presenter.AddColumnToProjectSuccessResponse(co))

	return c.SendStatus(fiber.StatusOK)
}
