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

func AddColumnToProjectSuccessResponse(c *entities.Column) map[string]interface{} {
	return map[string]interface{}{
		"id":        c.ID,
		"name":      c.Name,
		"position":  c.Position,
		"createdAt": c.CreatedAt,
		"updatedAt": c.UpdatedAt,
		"deletedAt": c.DeletedAt,
	}
}

func AddTaskToProjectSuccessResponse(t *entities.Task) map[string]interface{} {
	return map[string]interface{}{
		"id":          t.ID,
		"column_id":   t.ColumnID,
		"assignee_id": t.AssigneeID,
		"title":       t.Title,
		"description": t.Description,
		"priority":    t.Priority,
		"due_date":    t.DueDate,
		"createdAt":   t.CreatedAt,
		"updatedAt":   t.UpdatedAt,
		"deletedAt":   t.DeletedAt,
	}
}
