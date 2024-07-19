package project

import (
	"github.com/google/uuid"

	"github.com/Hnamnguyen0112/todo-app/server/internal/database"
	"github.com/Hnamnguyen0112/todo-app/server/pkg/entities"
)

type Service interface {
	GetProjectListByUserId(userId uuid.UUID) ([]*entities.Project, error)
	CreateProject(p *entities.Project) error
}

type ProjectService struct{}

func NewService() Service {
	return &ProjectService{}
}

func (s *ProjectService) GetProjectListByUserId(userId uuid.UUID) ([]*entities.Project, error) {
	db := database.DB

	var projects []*entities.Project

	var invitaions []*entities.Invitation

	if err := db.Where("user_id = ?", userId).Find(&invitaions).Error; err != nil {
		return nil, err
	}

	projectIds := make([]uuid.UUID, 0, len(invitaions))

	for _, i := range invitaions {
		projectIds = append(projectIds, i.ProjectID)
	}

	if err := db.Where("id IN ?", projectIds).Find(&projects).Error; err != nil {
		return nil, err
	}

	return projects, nil
}

func (s *ProjectService) CreateProject(p *entities.Project) error {
	db := database.DB

	if err := db.Create(p).Error; err != nil {
		return err
	}

	return nil
}
