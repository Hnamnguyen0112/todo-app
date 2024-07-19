package presenter

import "github.com/Hnamnguyen0112/todo-app/server/pkg/entities"

func CreateProjectSuccessResponse(p *entities.Project) map[string]interface{} {
	var users []map[string]interface{}

	for _, invitaion := range p.Invitations {
		users = append(users, map[string]interface{}{
			"id":        invitaion.User.ID,
			"username":  invitaion.User.Username,
			"email":     invitaion.User.Email,
			"names":     invitaion.User.Names,
			"createdAt": invitaion.User.CreatedAt,
			"updatedAt": invitaion.User.UpdatedAt,
			"deletedAt": invitaion.User.DeletedAt,
		})
	}

	return map[string]interface{}{
		"id":          p.ID,
		"name":        p.Name,
		"description": p.Description,
		"createdAt":   p.CreatedAt,
		"updatedAt":   p.UpdatedAt,
		"deletedAt":   p.DeletedAt,
		"users":       users,
	}
}
