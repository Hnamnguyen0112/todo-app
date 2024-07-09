package entities

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Column struct {
	gorm.Model
	ID        uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4()" json:"id"`
	ProjectID uuid.UUID `gorm:"type:uuid;not null;"                  json:"project_id"`
	Name      string    `gorm:"not null;size:50;"                    json:"name"       validate:"required,min=3,max=50"`
	Position  int       `gorm:"not null;"                            json:"position"`
	Tasks     []Task    `gorm:"foreignKey:ColumnID"`
}
