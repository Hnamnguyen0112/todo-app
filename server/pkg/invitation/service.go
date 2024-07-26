package invitation

import (
	"time"

	"github.com/google/uuid"

	"github.com/Hnamnguyen0112/todo-app/server/internal/database"
	"github.com/Hnamnguyen0112/todo-app/server/pkg/entities"
)

type Service interface {
	SendInvitation(p *entities.Project, uid uuid.UUID, isOwner bool) error
}

type InvitationService struct{}

func NewService() Service {
	return &InvitationService{}
}

func (s *InvitationService) SendInvitation(p *entities.Project, uid uuid.UUID, isOwner bool) error {
	db := database.DB

	user := entities.User{}

	if err := db.Where(&entities.User{ID: uid}).First(&user).Error; err != nil {
		return err
	}

	var acceptedTime *time.Time

	if isOwner {
		now := time.Now()
		acceptedTime = &now
	} else {
		acceptedTime = nil
	}

	invitation := entities.Invitation{
		ProjectID:  p.ID,
		UserID:     user.ID,
		IsOwner:    isOwner,
		AcceptedAt: acceptedTime,
	}

	if err := db.Create(&invitation).Error; err != nil {
		return err
	}

	p.Invitations = append(p.Invitations, invitation)

	return nil
}
