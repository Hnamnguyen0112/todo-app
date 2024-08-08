package task

import (
	"github.com/google/uuid"

	"github.com/Hnamnguyen0112/todo-app/server/internal/database"
	"github.com/Hnamnguyen0112/todo-app/server/pkg/entities"
)

type Service interface {
	CreateTask(t *entities.Task) error
	FindTasksByColumnIdAndPosition(columnId uuid.UUID, position int) ([]entities.Task, error)
	FindTaskByIdAndColumnId(id uuid.UUID, columnId uuid.UUID) (*entities.Task, error)
	FindTaskByIdAndProjectId(id uuid.UUID, projectId uuid.UUID) (*entities.Task, error)
	DeleteTask(t *entities.Task) error
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

func (s *TaskService) FindTaskByIdAndColumnId(
	id uuid.UUID,
	columnId uuid.UUID,
) (*entities.Task, error) {
	db := database.DB

	var task entities.Task

	if err := db.Where("id = ? AND column_id = ?", id, columnId).First(&task).Error; err != nil {
		return nil, err
	}

	return &task, nil
}

func (s *TaskService) DeleteTask(t *entities.Task) error {
	db := database.DB

	if err := db.Delete(t).Error; err != nil {
		return err
	}

	return nil
}

func (s *TaskService) FindTaskByIdAndProjectId(
	id uuid.UUID,
	projectId uuid.UUID,
) (*entities.Task, error) {
	db := database.DB

	var task entities.Task

	if err := db.Where("id = ? AND project_id = ?", id, projectId).First(&task).Error; err != nil {
		return nil, err
	}

	return &task, nil
}
