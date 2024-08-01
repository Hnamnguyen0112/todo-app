package presenter

import (
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"

	"github.com/Hnamnguyen0112/todo-app/server/pkg/entities"
	"github.com/Hnamnguyen0112/todo-app/server/pkg/utils"
)

type CreateProjectRequest struct {
	Name        string `json:"name"        validate:"required,min=3,max=50"`
	Description string `json:"description" validate:"required,min=3,max=50"`
}

func (r *CreateProjectRequest) Bind(
	c *fiber.Ctx,
	p *entities.Project,
	v *validator.Validate,
) error {
	if err := c.BodyParser(r); err != nil {
		return err
	}

	if err := v.Struct(r); err != nil {
		return err
	}

	p.Name = r.Name
	p.Description = &r.Description

	return nil
}

type AddColumnToProjectRequest struct {
	Name     string `json:"name"     validate:"required,min=3,max=50"`
	Position int    `json:"position" validate:"required"`
}

func (r *AddColumnToProjectRequest) Bind(
	c *fiber.Ctx,
	p *entities.Column,
	v *validator.Validate,
) error {
	if err := c.BodyParser(r); err != nil {
		return err
	}

	if err := v.Struct(r); err != nil {
		return err
	}

	p.Name = r.Name
	p.Position = r.Position
	p.Tasks = []entities.Task{}

	return nil
}

type AddTaskToProjectRequest struct {
	ColumnID    uuid.UUID `json:"columnId"    validate:"required"`
	AssigneeID  uuid.UUID `json:"assigneeId"`
	Title       string    `json:"title"       validate:"required,min=3,max=50"`
	Description string    `json:"description" validate:"max=2000"`
	Priority    int       `json:"priority"    validate:"required"`
	DueDate     int64     `json:"dueDate"     validate:"required"`
	Position    int       `json:"position"    validate:"required"`
}

func (r *AddTaskToProjectRequest) Bind(
	c *fiber.Ctx,
	t *entities.Task,
	v *validator.Validate,
) error {
	v.RegisterCustomTypeFunc(utils.ValidateUUID, uuid.UUID{})

	if err := c.BodyParser(r); err != nil {
		return err
	}

	if err := v.Struct(r); err != nil {
		return err
	}

	t.ColumnID = r.ColumnID
	if r.AssigneeID != uuid.Nil {
		t.AssigneeID = &r.AssigneeID
	}
	t.Title = r.Title
	t.Description = r.Description
	t.Priority = r.Priority
	t.DueDate = utils.ParseUnixTimestampToTime(r.DueDate)
	t.Position = r.Position

	return nil
}
