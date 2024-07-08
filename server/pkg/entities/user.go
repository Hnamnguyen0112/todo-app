package entities

import (
	"errors"

	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	ID       uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4()"`
	Username string    `gorm:"uniqueIndex;not null;size:50;"        validate:"required,min=3,max=50" json:"username"`
	Email    string    `gorm:"uniqueIndex;not null;size:255;"       validate:"required,email"        json:"email"`
	Password string    `gorm:"not null;"                            validate:"required,min=6,max=50" json:"password"`
	Names    string    `                                                                             json:"names"`
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
