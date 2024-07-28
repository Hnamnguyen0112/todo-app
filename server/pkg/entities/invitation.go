package entities

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Invitation struct {
	ID         uuid.UUID      `gorm:"type:uuid;default:uuid_generate_v4()" json:"id"`
	ProjectID  uuid.UUID      `gorm:"type:uuid;not null;"                  json:"projectId"`
	UserID     uuid.UUID      `gorm:"type:uuid;not null;"                  json:"userId"`
	IsOwner    bool           `gorm:"default:false;"                       json:"isOwner"`
	AcceptedAt *time.Time     `gorm:"type:timestamp;"                      json:"acceptedAt"`
	CreatedAt  time.Time      `                                            json:"createdAt"`
	UpdatedAt  time.Time      `                                            json:"updatedAt"`
	DeletedAt  gorm.DeletedAt `gorm:"index"                                json:"deletedAt"`
	User       User           `gorm:"foreignKey:UserID"                    json:"user"`
	Project    Project        `gorm:"foreignKey:ProjectID"                 json:"project"`
}
