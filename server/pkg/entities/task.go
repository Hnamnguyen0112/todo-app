package entities

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Task struct {
	ID          uuid.UUID      `gorm:"type:uuid;default:uuid_generate_v4()" json:"id"`
	ColumnID    uuid.UUID      `gorm:"type:uuid;not null;"                  json:"column_id"`
	AssigneeID  uuid.UUID      `gorm:"type:uuid;not null;"                  json:"assignee_id"`
	Title       string         `gorm:"not null;size:50;"                    json:"title"       validate:"required,min=3,max=50"`
	Description string         `gorm:"size:255;"                            json:"description"`
	Priority    int            `gorm:"not null;"                            json:"priority"`
	DueDate     time.Time      `gorm:"type:timestamp;"                      json:"due_date"`
	CreatedAt   time.Time      `                                            json:"createdAt"`
	UpdatedAt   time.Time      `                                            json:"updatedAt"`
	DeletedAt   gorm.DeletedAt `gorm:"index"                                json:"deletedAt"`
}
