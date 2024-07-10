# Todo App

This is a simple Todo application with a client-server architecture. The client side is built using Next.js 14, and the server side is developed using Go with the Fiber framework and GORM for ORM. This app allows users to manage their tasks efficiently.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Users can sign up, log in, and log out.
- **Task Management**: Users can create, read, update, and delete tasks.
- **Responsive Design**: The client side is built to be responsive and user-friendly.

## Prerequisites

- **Node.js**: v18.0.0 or higher
- **Go**: v1.19 or higher
- **PostgreSQL**: For the database
- **Yarn** or **npm**: For managing dependencies

## Installation

### Clone the Repository

```bash
git clone https://github.com/yourusername/todo-app.git
cd todo-app
```

### Server Setup

1. Navigate to the server directory:

```bash
cd server
```

2. Install Go dependencies:

```bash
go mod tidy
```

3. Create a `.env` file in the server directory and add the following environment variables:

```env
DB_USER=root
DB_PASSWORD=secret
DB_HOST=localhost
DB_PORT=5432
DB_NAME=todoapp

REDIS_ADDR=localhost:6379
REDIS_PASSWORD=
REDIS_DB=0

JWT_SECRET=7ZhGYNBV3+umoZeV3uPOl0tFwvEYUj5ZeZ5m+KoJVwE=
JWT_EXPIRATION=86400
JWT_REFRESH_EXPIRATION=604800
JWT_ISSUER=
```

4. Start docker-compose to run the PostgreSQL and Redis containers:

```bash
docker-compose -f deployments/docker-compose.yml up -d --build
```

5. Run the server with Air:

```bash
air
```

### Client Setup

1. Navigate to the client directory:

```bash
cd client
```

2. Install Node.js dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the client directory and add the following environment variables:

```env
AUTH_SECRET=
```

4. Start the client:

```bash
npm run dev
```

## Usage

1. Access the client: Open your browser and navigate to `http://localhost:3000`.
2. Access the server: The server runs on `http://localhost:8000`.

## Project Structure

The project structure is as follows:

```
todo-app
├── client
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── app
│   │   ├── libs
│   │...
├── server
│   ├── cmd
│   │   ├── main.go
│   ├── internal
│   │   ├── database
│   │   ├── handler
│   │   ├── presenter
│   │   ├── routes
│   │   ├── redis
│   ├── config
│   ├── deployments
│   ├── pkg
│   │   ├── auth
│   │   ├── middleware
│   │   ├── entities
│   │   ├── utils
│   ├── go.mod
│   ├── go.sum
│   ├── .env.example
```

## Contributing

Contributions are welcome! Please refer to the [contributing guidelines](CONTRIBUTING.md) for more information.

## License

This project is open-source and available under the [MIT License](LICENSE).
