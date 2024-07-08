package presenter

import "github.com/Hnamnguyen0112/todo-app/server/pkg/entities"

func SignUpSuccessResponse(u *entities.User) map[string]interface{} {
	return map[string]interface{}{
		"id":        u.ID,
		"username":  u.Username,
		"email":     u.Email,
		"names":     u.Names,
		"createdAt": u.CreatedAt,
		"updatedAt": u.UpdatedAt,
		"deletedAt": u.DeletedAt,
	}
}

func SignInSuccessResponse(u *entities.User, token string, refresh string) map[string]interface{} {
	return map[string]interface{}{
		"user": map[string]interface{}{
			"id":        u.ID,
			"username":  u.Username,
			"email":     u.Email,
			"names":     u.Names,
			"createdAt": u.CreatedAt,
			"updatedAt": u.UpdatedAt,
			"deletedAt": u.DeletedAt,
		},
		"token":   token,
		"refresh": refresh,
	}
}
