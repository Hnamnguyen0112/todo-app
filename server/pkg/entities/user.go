package entities

import (
	"errors"
	"time"

	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type User struct {
	ID          uuid.UUID      `gorm:"type:uuid;default:uuid_generate_v4()" json:"id"`
	Username    string         `gorm:"uniqueIndex;not null;size:50;"        json:"username"    validate:"required,min=3,max=50"`
	Email       string         `gorm:"uniqueIndex;not null;size:255;"       json:"email"       validate:"required,email"`
	Password    string         `gorm:"not null;"                            json:"password"    validate:"required,min=6,max=50"`
	Names       string         `gorm:"not null;"                            json:"names"       validate:"required,min=6,max=50"`
	CreatedAt   time.Time      `                                            json:"createdAt"`
	UpdatedAt   time.Time      `                                            json:"updatedAt"`
	DeletedAt   gorm.DeletedAt `gorm:"index"                                json:"deletedAt"`
	Invitations []Invitation   `gorm:"foreignKey:UserID"                    json:"invitations"`
	Tasks       []Task         `gorm:"foreignKey:AssigneeID"                json:"tasks"`
}

func (u *User) HashPassword(plain string) (string, error) {
	if len(plain) == 0 {
		return "", errors.New("password should not be empty")
	}
	h, err := bcrypt.GenerateFromPassword([]byte(plain), bcrypt.DefaultCost)
	return string(h), err
}

func (u *User) CheckPassword(plain string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(plain))
	return err == nil
}
