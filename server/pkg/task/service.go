package task

import (
	"github.com/Hnamnguyen0112/todo-app/server/internal/database"
	"github.com/Hnamnguyen0112/todo-app/server/pkg/entities"
)

type Service interface {
	CreateTask(t *entities.Task) error
}

type TaskService struct{}

func NewService() Service {
	return &TaskService{}
}

func (s *TaskService) CreateTask(t *entities.Task) error {
	db := database.DB

	if err := db.Create(t).Error; err != nil {
		return err
	}

	return nil
}
