package token

import (
	"strconv"
	"time"

	"github.com/golang-jwt/jwt/v5"

	"github.com/Hnamnguyen0112/todo-app/server/config"
	"github.com/Hnamnguyen0112/todo-app/server/pkg/entities"
)

type Service interface {
	GenerateToken(u *entities.User) (string, int64, error)
	GenerateRefreshToken(u *entities.User) (string, int64, error)
}

type TokenService struct {
	jwt *jwt.Token
}

func NewService() Service {
	return &TokenService{}
}

func (s *TokenService) GenerateToken(u *entities.User) (string, int64, error) {
	jwtSecret := config.Config("JWT_SECRET")
	jwtExpStr := config.Config("JWT_EXPIRATION")
	jwtExp, err := strconv.Atoi(jwtExpStr)
	if err != nil {
		return "", 0, err
	}

	exp := time.Now().Add(time.Second * time.Duration(jwtExp)).Unix()

	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": u.ID,
		"exp": exp,
		"iat": time.Now().Unix(),
		"iss": config.Config("JWT_ISSUER"),
		"aud": "todo-app",
	})

	token, err := claims.SignedString([]byte(jwtSecret))
	if err != nil {
		return "", 0, err
	}

	return token, exp, nil
}

func (s *TokenService) GenerateRefreshToken(u *entities.User) (string, int64, error) {
	jwtSecret := config.Config("JWT_SECRET")
	jwtExpStr := config.Config("JWT_REFRESH_EXPIRATION")
	jwtExp, err := strconv.Atoi(jwtExpStr)
	if err != nil {
		return "", 0, err
	}

	exp := time.Now().Add(time.Second * time.Duration(jwtExp)).Unix()

	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": u.ID,
		"exp": exp,
		"iat": time.Now().Unix(),
		"iss": config.Config("JWT_ISSUER"),
		"aud": "todo-app",
	})

	token, err := claims.SignedString([]byte(jwtSecret))
	if err != nil {
		return "", 0, err
	}

	return token, exp, nil
}
