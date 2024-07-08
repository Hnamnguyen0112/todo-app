package presenter

import (
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"

	"github.com/Hnamnguyen0112/todo-app/server/pkg/entities"
)

type SignInRequest struct {
	Identity string `json:"identity" validate:"required"`
	Password string `json:"password" validate:"required,min=6,max=50"`
}

func (r *SignInRequest) Bind(c *fiber.Ctx, v *validator.Validate) error {
	if err := c.BodyParser(r); err != nil {
		return err
	}

	if err := v.Struct(r); err != nil {
		return err
	}

	return nil
}

type SignUpRequest struct {
	Username string `json:"username" validate:"required,min=3,max=50"`
	Email    string `json:"email"    validate:"required,email"`
	Password string `json:"password" validate:"required,min=6,max=50"`
	Names    string `json:"names"`
}

func (r *SignUpRequest) Bind(c *fiber.Ctx, u *entities.User, v *validator.Validate) error {
	if err := c.BodyParser(r); err != nil {
		return err
	}

	if err := v.Struct(r); err != nil {
		return err
	}

	u.Username = r.Username
	u.Email = r.Email
	u.Names = r.Names

	h, err := u.HashPassword(r.Password)
	if err != nil {
		return err
	}
	u.Password = h

	return nil
}
