package project

import (
	"github.com/google/uuid"

	"github.com/Hnamnguyen0112/todo-app/server/internal/database"
	"github.com/Hnamnguyen0112/todo-app/server/pkg/entities"
	"github.com/Hnamnguyen0112/todo-app/server/pkg/pagination"
)

type Service interface {
	GetProjectListByUserId(
		userId uuid.UUID,
		qs *pagination.PaginationRequest,
	) ([]*entities.Project, *pagination.PaginationResponse, error)
	GetProjectByIdAndUserId(id uuid.UUID, userId uuid.UUID) (*entities.Project, error)
	CreateProject(p *entities.Project) error
}

type ProjectService struct{}

func NewService() Service {
	return &ProjectService{}
}

func (s *ProjectService) GetProjectListByUserId(
	userId uuid.UUID,
	req *pagination.PaginationRequest,
) ([]*entities.Project, *pagination.PaginationResponse, error) {
	db := database.DB

	var projects []*entities.Project

	var invitaions []*entities.Invitation

	if err := db.Where("user_id = ?", userId).Find(&invitaions).Error; err != nil {
		return nil, nil, err
	}

	projectIds := make([]uuid.UUID, 0, len(invitaions))

	for _, i := range invitaions {
		projectIds = append(projectIds, i.ProjectID)
	}

	res := &pagination.PaginationResponse{}

	condition := db.Where("id IN (?)", projectIds)
	condition.Scopes(pagination.Paginate(condition, projects, req, res)).
		Find(&projects)

	return projects, res, nil
}

func (s *ProjectService) CreateProject(p *entities.Project) error {
	db := database.DB

	if err := db.Create(p).Error; err != nil {
		return err
	}

	return nil
}

func (s *ProjectService) GetProjectByIdAndUserId(
	id uuid.UUID,
	userId uuid.UUID,
) (*entities.Project, error) {
	db := database.DB

	var project entities.Project

	if err := db.Joins("JOIN invitations ON invitations.project_id = projects.id").
		Where("invitations.user_id = ? AND projects.id = ?", userId, id).
		Preload("Columns").
		Preload("Columns.Tasks").
		First(&project).Error; err != nil {
		return nil, err
	}

	return &project, nil
}
