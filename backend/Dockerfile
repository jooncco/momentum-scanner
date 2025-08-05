# Use Python 3.12 Alpine for smaller image size
FROM python:3.12-alpine

# Set working directory
WORKDIR /app

# Install system dependencies including MySQL development libraries
RUN apk add --no-cache \
    gcc \
    musl-dev \
    mysql-dev \
    mysql-client

# Copy requirements file
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy source code
COPY . .

# Expose port
EXPOSE 8000

# Start the FastAPI application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"] 