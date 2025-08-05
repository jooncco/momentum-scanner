from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Create FastAPI app
app = FastAPI(
    title="Momentum Scanner API",
    description="API for cryptocurrency momentum scanning",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://frontend:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Momentum Scanner API is running!"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "momentum-scanner-api"}

@app.get("/api/v1/status")
async def api_status():
    return {
        "status": "operational",
        "version": "1.0.0",
        "database": "connected" if os.getenv("DATABASE_URL") else "not configured"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 