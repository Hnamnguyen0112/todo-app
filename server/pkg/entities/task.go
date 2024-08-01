package entities

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Task struct {
	ID          uuid.UUID      `gorm:"type:uuid;default:uuid_generate_v4()" json:"id"`
	ColumnID    uuid.UUID      `gorm:"type:uuid;not null;"                  json:"columnId"`
	AssigneeID  *uuid.UUID     `gorm:"type:uuid"                            json:"assigneeId"`
	Title       string         `gorm:"not null;size:50;"                    json:"title"       validate:"required,min=3,max=50"`
	Description string         `gorm:"type:text;"                           json:"description" validate:"max=2000"`
	Priority    int            `gorm:"not null;"                            json:"priority"`
	DueDate     time.Time      `gorm:"type:timestamp;"                      json:"dueDate"`
	Position    int            `gorm:"not null;"                            json:"position"`
	CreatedAt   time.Time      `                                            json:"createdAt"`
	UpdatedAt   time.Time      `                                            json:"updatedAt"`
	DeletedAt   gorm.DeletedAt `gorm:"index"                                json:"deletedAt"`
}
