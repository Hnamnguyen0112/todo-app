package eventstore

import (
	"go.mongodb.org/mongo-driver/mongo"
)

var (
	EventStore      *mongo.Client
	EventCollection *mongo.Collection
)
