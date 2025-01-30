package entities

import (
	"time"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Notification struct {
	ID          uuid.UUID      `gorm:"type:uuid;default:uuid_generate_v4()" json:"id"`
	UserID      uuid.UUID      `gorm:"type:uuid;not null;"                  json:"userId"`
	Title       string         `gorm:"not null;size:255;"                   json:"title"       validate:"required,min=1,max=255"`
	Description string         `gorm:"not null;size:1000;"                  json:"description" validate:"required,min=1,max=1000"`
	Route       string         `gorm:"not null;size:255;"                   json:"route"       validate:"required,min=1,max=255"`
	IsRead      bool           `gorm:"not null;default:false;"              json:"isRead"`
	CreatedAt   time.Time      `                                            json:"createdAt"`
	UpdatedAt   time.Time      `                                            json:"updatedAt"`
	DeletedAt   gorm.DeletedAt `gorm:"index"                                json:"deletedAt"`
}
