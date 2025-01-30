package notification

import (
	"github.com/google/uuid"

	"github.com/Hnamnguyen0112/todo-app/server/internal/database"
	"github.com/Hnamnguyen0112/todo-app/server/pkg/entities"
	"github.com/Hnamnguyen0112/todo-app/server/pkg/pagination"
)

type Service interface {
	GetNotificationsByUserId(
		userId uuid.UUID,
		qs *pagination.PaginationRequest,
	) ([]*entities.Notification, *pagination.PaginationResponse, error)
}

type NotificationService struct{}

func NewService() Service {
	return &NotificationService{}
}

func (s *NotificationService) GetNotificationsByUserId(
	userId uuid.UUID,
	req *pagination.PaginationRequest,
) ([]*entities.Notification, *pagination.PaginationResponse, error) {
	db := database.DB

	var notifications []*entities.Notification

	res := &pagination.PaginationResponse{}

	condition := db.Where("user_id = ?", userId)
	condition.Scopes(pagination.Paginate(condition, notifications, req, res)).
		Find(&notifications)

	return notifications, res, nil
}
