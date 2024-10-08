package handler

import (
	"github.com/Hnamnguyen0112/todo-app/server/pkg/column"
	"github.com/Hnamnguyen0112/todo-app/server/pkg/invitation"
	"github.com/Hnamnguyen0112/todo-app/server/pkg/project"
	"github.com/Hnamnguyen0112/todo-app/server/pkg/task"
	"github.com/Hnamnguyen0112/todo-app/server/pkg/token"
	"github.com/Hnamnguyen0112/todo-app/server/pkg/user"
)

type HandlerParams struct {
	UserService       user.Service
	TokenService      token.Service
	ProjectService    project.Service
	InvitationService invitation.Service
	ColumnService     column.Service
	TaskService       task.Service
}

type Handler struct {
	validator         *Validator
	userService       user.Service
	tokenService      token.Service
	projectService    project.Service
	invitationService invitation.Service
	columnService     column.Service
	taskService       task.Service
}

func NewHandler(params HandlerParams) *Handler {
	v := NewValidator()
	return &Handler{
		validator:         v,
		userService:       params.UserService,
		tokenService:      params.TokenService,
		projectService:    params.ProjectService,
		invitationService: params.InvitationService,
		columnService:     params.ColumnService,
		taskService:       params.TaskService,
	}
}
