package entities

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Project struct {
	ID          uuid.UUID      `gorm:"type:uuid;default:uuid_generate_v4()" json:"id"`
	Name        string         `gorm:"not null;size:50;"                    json:"name"        validate:"required,min=3,max=50"`
	Description *string        `gorm:"size:255;"                            json:"description"`
	CreatedAt   time.Time      `                                            json:"createdAt"`
	UpdatedAt   time.Time      `                                            json:"updatedAt"`
	DeletedAt   gorm.DeletedAt `gorm:"index"                                json:"deletedAt"`
	Invitations []Invitation   `gorm:"foreignKey:ProjectID"                 json:"invitations"`
	Columns     []Column       `gorm:"foreignKey:ProjectID"                 json:"columns"`
}
