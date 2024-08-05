package entities

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Column struct {
	ID        uuid.UUID      `gorm:"type:uuid;default:uuid_generate_v4()" json:"id"`
	ProjectID uuid.UUID      `gorm:"type:uuid;not null;"                  json:"projectId"`
	Name      string         `gorm:"not null;size:50;"                    json:"name"      validate:"required,min=1,max=50"`
	Position  int            `gorm:"not null;"                            json:"position"`
	CreatedAt time.Time      `                                            json:"createdAt"`
	UpdatedAt time.Time      `                                            json:"updatedAt"`
	DeletedAt gorm.DeletedAt `gorm:"index"                                json:"deletedAt"`
	Tasks     []Task         `gorm:"foreignKey:ColumnID"                  json:"tasks"`
}
