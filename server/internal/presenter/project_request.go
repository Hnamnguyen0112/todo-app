package presenter

import (
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"

	"github.com/Hnamnguyen0112/todo-app/server/pkg/entities"
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
