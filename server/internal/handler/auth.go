package handler

import (
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"

	"github.com/Hnamnguyen0112/todo-app/server/internal/presenter"
	"github.com/Hnamnguyen0112/todo-app/server/pkg/entities"
	"github.com/Hnamnguyen0112/todo-app/server/pkg/utils"
)

func (h *Handler) SignIn(c *fiber.Ctx) error {
	req := &presenter.SignInRequest{}

	if err := req.Bind(c, h.validator.validator); err != nil {
		return fiber.NewError(fiber.StatusUnprocessableEntity, err.Error())
	}

	user, err := new(entities.User), *new(error)

	if utils.IsEmail(req.Identity) {
		user, err = h.userService.GetUserByEmail(req.Identity)
	} else {
		user, err = h.userService.GetUserByUsername(req.Identity)
	}

	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	if user == nil {
		return fiber.NewError(
			fiber.StatusUnauthorized,
			"Your username or password is incorrect. Please try again.",
		)
	}

	if !user.CheckPassword(req.Password) {
		return fiber.NewError(
			fiber.StatusUnauthorized,
			"Your username or password is incorrect. Please try again.",
		)
	}

	access, accessExp, err := h.tokenService.GenerateToken(user)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}
	refresh, refreshExp, err := h.tokenService.GenerateRefreshToken(user)
	if err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	c.Locals("data", presenter.SignInSuccessResponse(user, access, refresh, accessExp, refreshExp))
	return c.SendStatus(fiber.StatusOK)
}

func (h *Handler) SignUp(c *fiber.Ctx) error {
	u := new(entities.User)
	req := &presenter.SignUpRequest{}

	if err := req.Bind(c, u, h.validator.validator); err != nil {
		return fiber.NewError(fiber.StatusUnprocessableEntity, err.Error())
	}

	if err := h.userService.Create(u); err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, err.Error())
	}

	c.Locals("data", presenter.SignUpSuccessResponse(u))
	return c.SendStatus(fiber.StatusCreated)
}

func (h *Handler) SignOut(c *fiber.Ctx) error {
	user := c.Locals("user").(*jwt.Token)
	claims := user.Claims.(jwt.MapClaims)
	userId := claims["sub"].(string)

	c.Locals("data", userId)
	return c.SendStatus(fiber.StatusOK)
}

func (h *Handler) ForgotPassword(c *fiber.Ctx) error {
	return c.SendStatus(fiber.StatusOK)
}

func (h *Handler) ResetPassword(c *fiber.Ctx) error {
	return c.SendStatus(fiber.StatusOK)
}
