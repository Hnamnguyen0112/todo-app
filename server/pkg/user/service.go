package user

import (
	"errors"

	"gorm.io/gorm"

	"github.com/Hnamnguyen0112/todo-app/server/internal/database"
	"github.com/Hnamnguyen0112/todo-app/server/pkg/entities"
)

type Service interface {
	GetUserByEmail(email string) (*entities.User, error)
	GetUserByUsername(username string) (*entities.User, error)
	Create(user *entities.User) error
}

type UserService struct{}

func NewService() Service {
	return &UserService{}
}

func (s *UserService) GetUserByEmail(email string) (*entities.User, error) {
	db := database.DB
	var user entities.User

	if err := db.Where(&entities.User{Email: email}).First(&user).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}

	return &user, nil
}

func (s *UserService) GetUserByUsername(username string) (*entities.User, error) {
	db := database.DB
	var user entities.User

	if err := db.Where(&entities.User{Username: username}).First(&user).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, err
	}

	return &user, nil
}

func (s *UserService) Create(user *entities.User) error {
	db := database.DB

	if err := db.Create(user).Error; err != nil {
		return err
	}

	return nil
}
