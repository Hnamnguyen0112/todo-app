package column

import (
	"github.com/google/uuid"
	"gorm.io/gorm"

	"github.com/Hnamnguyen0112/todo-app/server/internal/database"
	"github.com/Hnamnguyen0112/todo-app/server/pkg/entities"
)

type Service interface {
	CreateColumnByProjectId(projectId uuid.UUID, c *entities.Column) error
	FindColumnsByProjectIdAndPosition(projectId uuid.UUID, position int) ([]*entities.Column, error)
	FindColumnByIdAndProjectId(id uuid.UUID, projectId uuid.UUID) (*entities.Column, error)
	DeleteColumnByIdAndProjectId(id uuid.UUID, projectId uuid.UUID) error
	UpdateColumnById(id uuid.UUID, c *entities.Column) error
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

func (s *ColumnService) FindColumnByIdAndProjectId(
	id uuid.UUID,
	projectId uuid.UUID,
) (*entities.Column, error) {
	db := database.DB

	var column entities.Column

	if err := db.Where("id = ? AND project_id = ?", id, projectId).First(&column).Error; err != nil {
		return nil, err
	}

	return &column, nil
}

func (s *ColumnService) FindColumnsByProjectIdAndPosition(
	projectId uuid.UUID,
	position int,
) ([]*entities.Column, error) {
	db := database.DB

	var columns []*entities.Column

	if err := db.Where("project_id = ? AND position = ?", projectId, position).Find(&columns).Error; err != nil {
		return nil, err
	}

	return columns, nil
}

func (s *ColumnService) DeleteColumnByIdAndProjectId(
	id uuid.UUID,
	projectId uuid.UUID,
) error {
	db := database.DB

	var deletedColumn entities.Column
	if err := db.Where("id = ? AND project_id = ?", id, projectId).First(&deletedColumn).Error; err != nil {
		return err // Return if column not found
	}

	// Delete the column
	if err := db.Where("id = ? AND project_id = ?", id, projectId).Delete(&entities.Column{}).Error; err != nil {
		return err
	}

	if err := db.Model(&entities.Column{}).
		Where("project_id = ? AND position > ?", projectId, deletedColumn.Position).
		Update("position", gorm.Expr("position - 1")).Error; err != nil {
		return err
	}

	return nil
}

func (s *ColumnService) UpdateColumnById(id uuid.UUID, c *entities.Column) error {
	db := database.DB

	if err := db.Model(&entities.Column{}).Where("id = ?", id).Updates(c).Error; err != nil {
		return err
	}

	return nil
}
