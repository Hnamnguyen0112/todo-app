package pagination

type PaginationResponse struct {
	Total      int64 `json:"total"`
	TotalPages int   `json:"totalPages"`
}
