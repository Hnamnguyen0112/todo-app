package handler

import (
	"github.com/Hnamnguyen0112/todo-app/server/pkg/invitation"
	"github.com/Hnamnguyen0112/todo-app/server/pkg/project"
	"github.com/Hnamnguyen0112/todo-app/server/pkg/token"
	"github.com/Hnamnguyen0112/todo-app/server/pkg/user"
)

type HandlerParams struct {
	UserService       user.Service
	TokenService      token.Service
	ProjectService    project.Service
	InvitationService invitation.Service
}

type Handler struct {
	validator         *Validator
	userService       user.Service
	tokenService      token.Service
	projectService    project.Service
	invitationService invitation.Service
}

func NewHandler(params HandlerParams) *Handler {
	v := NewValidator()
	return &Handler{
		validator:         v,
		userService:       params.UserService,
		tokenService:      params.TokenService,
		projectService:    params.ProjectService,
		invitationService: params.InvitationService,
	}
}
