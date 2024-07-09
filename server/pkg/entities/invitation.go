package entities

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Invitation struct {
	gorm.Model
	ID         uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4()" json:"id"`
	ProjectID  uuid.UUID `gorm:"type:uuid;not null;"                  json:"project_id"`
	UserID     uuid.UUID `gorm:"type:uuid;not null;"                  json:"user_id"`
	IsOwner    bool      `gorm:"default:false;"                       json:"is_owner"`
	AcceptedAt time.Time `gorm:"type:timestamp;"                      json:"accepted_at"`
}
