package entities

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Project struct {
	gorm.Model
	ID          uuid.UUID    `gorm:"type:uuid;default:uuid_generate_v4()" json:"id"`
	Name        string       `gorm:"not null;size:50;"                    json:"name"        validate:"required,min=3,max=50"`
	Description string       `gorm:"size:255;"                            json:"description"`
	Invitations []Invitation `gorm:"foreignKey:ProjectID"`
	Columns     []Column     `gorm:"foreignKey:ProjectID"`
}
