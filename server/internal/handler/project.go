package handler

import (
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

func (h *Handler) AddTaskToProject(c *fiber.Ctx) error {
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

	req := &presenter.AddTaskToProjectRequest{}
	t := &entities.Task{}

	if err := req.Bind(c, t, h.validator.validator); err != nil {
		return fiber.NewError(fiber.StatusUnprocessableEntity, err.Error())
	}

	t.ProjectID = projectId

	p, err := h.projectService.GetProjectByIdAndUserId(projectId, userId)
	if err != nil {
		return fiber.NewError(fiber.StatusNotFound, err.Error())
	}

	if _, err := h.columnService.FindColumnByIdAndProjectId(t.ColumnID, p.ID); err != nil {
		return fiber.NewError(fiber.StatusNotFound, err.Error())
	}

	if existingTasks, err := h.taskService.FindTasksByColumnIdAndPosition(t.ColumnID, t.Position); err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	} else if len(existingTasks) > 0 {
		return fiber.NewError(fiber.StatusConflict, "task with this position already exists")
	}

	if err := h.taskService.CreateTask(t); err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	c.Locals("data", presenter.AddTaskToProjectSuccessResponse(t))

	return c.SendStatus(fiber.StatusOK)
}

func (h *Handler) DeleteColumnFromProject(c *fiber.Ctx) error {
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

	columnIdString := c.Params("columnId")
	columnId, err := uuid.Parse(columnIdString)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	p, err := h.projectService.GetProjectByIdAndUserId(projectId, userId)
	if err != nil {
		return fiber.NewError(fiber.StatusNotFound, err.Error())
	}

	if err := h.columnService.DeleteColumnByIdAndProjectId(columnId, p.ID); err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	return c.SendStatus(fiber.StatusOK)
}

func (h *Handler) UpdateColumnFromProject(c *fiber.Ctx) error {
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

	columnIdString := c.Params("columnId")
	columnId, err := uuid.Parse(columnIdString)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	req := &presenter.UpdateColumnRequest{}

	if err := req.Bind(c, h.validator.validator); err != nil {
		return fiber.NewError(fiber.StatusUnprocessableEntity, err.Error())
	}

	p, err := h.projectService.GetProjectByIdAndUserId(projectId, userId)
	if err != nil {
		return fiber.NewError(fiber.StatusNotFound, err.Error())
	}

	co, err := h.columnService.FindColumnByIdAndProjectId(columnId, p.ID)
	if err != nil {
		return fiber.NewError(fiber.StatusNotFound, err.Error())
	}

	if co.Position == req.Position {
		co.Name = req.Name
		h.columnService.UpdateColumnById(co.ID, co)
	} else {
		exists, err := h.columnService.FindColumnsByProjectIdAndPosition(p.ID, req.Position)
		if err != nil {
			return fiber.NewError(fiber.StatusInternalServerError, err.Error())
		}

		if len(exists) > 0 {
			for _, swco := range exists {
				swco.Position = co.Position
				h.columnService.UpdateColumnById(swco.ID, swco)
			}
		}

		co.Name = req.Name
		co.Position = req.Position
		h.columnService.UpdateColumnById(co.ID, co)
	}

	c.Locals("data", presenter.UpdateColumnSuccessResponse(co))

	return c.SendStatus(fiber.StatusOK)
}

func (h *Handler) DeleteTaskById(c *fiber.Ctx) error {
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

	taksIdString := c.Params("taskId")
	taskId, err := uuid.Parse(taksIdString)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	if _, err := h.projectService.GetProjectByIdAndUserId(projectId, userId); err != nil {
		return fiber.NewError(fiber.StatusNotFound, err.Error())
	}

	req := &presenter.DeleteTaskRequest{}

	if err := req.Bind(c, h.validator.validator); err != nil {
		return fiber.NewError(fiber.StatusUnprocessableEntity, err.Error())
	}

	t, err := h.taskService.FindTaskByIdAndColumnId(taskId, req.ColumnID)
	if err != nil {
		return fiber.NewError(fiber.StatusNotFound, err.Error())
	}

	if err := h.taskService.DeleteTask(t); err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	return c.SendStatus(fiber.StatusOK)
}

func (h *Handler) GetTaskById(c *fiber.Ctx) error {
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

	taskIdString := c.Params("taskId")
	taskId, err := uuid.Parse(taskIdString)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	if _, err := h.projectService.GetProjectByIdAndUserId(projectId, userId); err != nil {
		return fiber.NewError(fiber.StatusNotFound, err.Error())
	}

	t, err := h.taskService.FindTaskByIdAndProjectId(taskId, projectId)
	if err != nil {
		return fiber.NewError(fiber.StatusNotFound, err.Error())
	}

	c.Locals("data", t)
	return c.SendStatus(fiber.StatusOK)
}
