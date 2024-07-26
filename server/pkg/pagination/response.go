package pagination

type PaginationResponse struct {
	Total      int64 `json:"total"`
	TotalPages int   `json:"totalPages"`
	Limit      int   `json:"limit"`
	Page       int   `json:"page"`
}
