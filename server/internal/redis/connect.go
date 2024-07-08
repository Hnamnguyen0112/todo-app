package redis

import (
	"context"
	"fmt"
	"strconv"

	"github.com/redis/go-redis/v9"

	"github.com/Hnamnguyen0112/todo-app/server/config"
)

var ctx = context.Background()

func Connect() {
	redisAddr := config.Config("REDIS_ADDR")
	redisPassword := config.Config("REDIS_PASSWORD")
	redisDBStr := config.Config("REDIS_DB")

	redisDB, err := strconv.Atoi(redisDBStr)
	if err != nil {
		fmt.Println("redis err: ", err)
	}

	RDB = redis.NewClient(&redis.Options{
		Addr:     redisAddr,
		Password: redisPassword,
		DB:       redisDB,
	})

	if err := RDB.Ping(ctx).Err(); err != nil {
		fmt.Println("redis err: ", err)
	}
}
