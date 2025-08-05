# Docker Setup for Momentum Scanner

This document describes the Docker Compose setup for the Momentum Scanner application.

## Services

### 1. MySQL Database

- **Image**: `mysql:8.0` (official MySQL image)
- **Port**: `3306`
- **Database**: `momentum_scanner`
- **User**: `momentum_user`
- **Password**: `momentum_password`
- **Root Password**: `rootpassword`

### 2. Backend API (Placeholder)

- **Port**: `8000`
- **Depends on**: MySQL
- **Environment**: Development mode

### 3. Frontend (Placeholder)

- **Port**: `3000`
- **Depends on**: Backend
- **Environment**: Development mode

## Quick Start

### Prerequisites

- Docker
- Docker Compose

### Running the Application

1. **Start all services**:

   ```bash
   docker-compose up -d
   ```

2. **View logs**:

   ```bash
   docker-compose logs -f
   ```

3. **Stop all services**:

   ```bash
   docker-compose down
   ```

4. **Stop and remove volumes**:
   ```bash
   docker-compose down -v
   ```

## Database Connection

### From Host Machine

- **Host**: `localhost`
- **Port**: `3306`
- **Database**: `momentum_scanner`
- **Username**: `momentum_user`
- **Password**: `momentum_password`

### From Other Containers

- **Host**: `mysql`
- **Port**: `3306`
- **Database**: `momentum_scanner`
- **Username**: `momentum_user`
- **Password**: `momentum_password`

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database Configuration
MYSQL_ROOT_PASSWORD=rootpassword
MYSQL_DATABASE=momentum_scanner
MYSQL_USER=momentum_user
MYSQL_PASSWORD=momentum_password

# Backend Configuration
DATABASE_URL=mysql://momentum_user:momentum_password@mysql:3306/momentum_scanner
NODE_ENV=development

# Frontend Configuration
REACT_APP_API_URL=http://localhost:8000
```

## Database Initialization

Place SQL initialization scripts in the `./backend/init/` directory. These scripts will be executed when the MySQL container starts for the first time.

## Volumes

- `mysql_data`: Persistent storage for MySQL data
- `./backend:/app`: Backend source code mounting
- `./frontend:/app`: Frontend source code mounting

## Networks

All services are connected through the `momentum-network` bridge network for internal communication.

## Security Notes

⚠️ **Important**: Change the default passwords in production!

- Update `MYSQL_ROOT_PASSWORD`
- Update `MYSQL_PASSWORD`
- Use strong, unique passwords
- Consider using Docker secrets for production

## Troubleshooting

### MySQL Connection Issues

1. Check if MySQL container is running:

   ```bash
   docker-compose ps
   ```

2. View MySQL logs:

   ```bash
   docker-compose logs mysql
   ```

3. Connect to MySQL container:
   ```bash
   docker-compose exec mysql mysql -u momentum_user -p momentum_scanner
   ```

### Port Conflicts

If ports are already in use, modify the port mappings in `docker-compose.yml`:

- MySQL: Change `3306:3306` to `3307:3306`
- Backend: Change `8000:8000` to `8001:8000`
- Frontend: Change `3000:3000` to `3001:3000`

## Development Workflow

1. Start services: `docker-compose up -d`
2. Make code changes in `./backend` or `./frontend`
3. Changes are automatically reflected due to volume mounting
4. Restart services if needed: `docker-compose restart [service-name]`
