package pagination

import (
	"math"

	"gorm.io/gorm"
)

func Paginate(
	db *gorm.DB,
	value interface{},
	request *PaginationRequest,
	response *PaginationResponse,
) func(db *gorm.DB) *gorm.DB {
	var totalRows int64

	db.Model(value).Count(&totalRows)

	response.Total = totalRows
	totalPages := int(math.Ceil(float64(totalRows) / float64(request.GetLimit())))
	response.TotalPages = totalPages
	response.Limit = request.GetLimit()
	response.Page = request.GetPage()

	return func(db *gorm.DB) *gorm.DB {
		return db.Offset(request.GetOffset()).
			Limit(request.GetLimit()).
			Order(request.GetSort())
	}
}
