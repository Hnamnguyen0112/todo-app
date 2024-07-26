package column

import (
	"github.com/google/uuid"

	"github.com/Hnamnguyen0112/todo-app/server/internal/database"
	"github.com/Hnamnguyen0112/todo-app/server/pkg/entities"
)

type Service interface {
	CreateColumnByProjectId(projectId uuid.UUID, c *entities.Column) error
	FindColumnsByProjectIdAndPosition(projectId uuid.UUID, position int) ([]entities.Column, error)
}

type ColumnService struct{}

func NewService() Service {
	return &ColumnService{}
}

func (s *ColumnService) CreateColumnByProjectId(projectId uuid.UUID, c *entities.Column) error {
	db := database.DB

	c.ProjectID = projectId

	if err := db.Create(c).Error; err != nil {
		return err
	}

	return nil
}

func (s *ColumnService) FindColumnsByProjectIdAndPosition(
	projectId uuid.UUID,
	position int,
) ([]entities.Column, error) {
	db := database.DB

	var columns []entities.Column

	if err := db.Where("project_id = ? AND position = ?", projectId, position).Find(&columns).Error; err != nil {
		return nil, err
	}

	return columns, nil
}
