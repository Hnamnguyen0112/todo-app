package eventstore

import (
	"context"
	"fmt"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"

	"github.com/Hnamnguyen0112/todo-app/server/config"
)

func Connect() {
	var err error

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	eventStoreUser := config.Config("EVENT_STORE_USER")
	eventStorePassword := config.Config("EVENT_STORE_PASSWORD")
	eventstoreDatabase := config.Config("EVENT_STORE_DATABASE")
	eventStoreHost := config.Config("EVENT_STORE_HOST")
	eventStorePort := config.Config("EVENT_STORE_PORT")

	mongoURI := fmt.Sprintf(
		"mongodb://%s:%s@%s:%s/%s?authSource=admin",
		eventStoreUser,
		eventStorePassword,
		eventStoreHost,
		eventStorePort,
		eventstoreDatabase,
	)

	clientOptions := options.Client().ApplyURI(mongoURI)
	EventStore, err = mongo.Connect(ctx, clientOptions)
	if err != nil {
		fmt.Println("eventstore err: ", err)
	}

	err = EventStore.Ping(context.TODO(), nil)
	if err != nil {
		fmt.Println("eventstore err: ", err)
	}

	EventCollection = EventStore.Database(eventstoreDatabase).Collection("events")
}

func Disconnect() {
	err := EventStore.Disconnect(context.Background())
	if err != nil {
		fmt.Println("eventstore err: ", err)
	}
}
