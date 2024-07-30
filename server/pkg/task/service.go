package task

import (
	"github.com/google/uuid"

	"github.com/Hnamnguyen0112/todo-app/server/internal/database"
	"github.com/Hnamnguyen0112/todo-app/server/pkg/entities"
)

type Service interface {
	CreateTask(t *entities.Task) error
	FindTasksByColumnIdAndPosition(columnId uuid.UUID, position int) ([]entities.Task, error)
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

func (s *TaskService) FindTasksByColumnIdAndPosition(
	columnId uuid.UUID,
	position int,
) ([]entities.Task, error) {
	db := database.DB

	var tasks []entities.Task

	if err := db.Where("column_id = ? AND position = ?", columnId, position).Find(&tasks).Error; err != nil {
		return nil, err
	}

	return tasks, nil
}
