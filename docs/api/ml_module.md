# API Documentation for Machine Learning Module

## Overview
This module provides a set of APIs for interacting with machine learning models, including training, prediction, and model management.

## Endpoints

### 1. Train Model
**POST /train**

**Request Body:**
```json
{
  "model_name": "string",
  "training_data": "base64_encoded_data",
  "hyperparameters": {
    "learning_rate": 0.01,
    "batch_size": 32,
    "epochs": 10
  }
}
```

**Response:**
```json
{
  "status": "training_started",
  "model_id": "unique_model_id"
}
```

### 2. Make Prediction
**POST /predict**

**Request Body:**
```json
{
  "model_id": "unique_model_id",
  "input_data": "base64_encoded_data"
}
```

**Response:**
```json
{
  "prediction": "result",
  "confidence_score": 0.95
}
```

### 3. Model Health Check
**GET /health**

**Response:**
```json
{
  "status": "healthy",
  "models_trained": 5,
  "uptime": "2 days"
}
```

## Authentication
API key required in header:
```
Authorization: Bearer <your_api_key>
```

## Error Handling
- **400 Bad Request**: Invalid request format
- **401 Unauthorized**: Missing or invalid API key
- **500 Internal Server Error**: Model training failed

## Examples
```bash
# Train a new model
curl -X POST /train \
  -H "Authorization: Bearer <your_api_key>" \
  -d '{"model_name": "image_classifier", "training_data": "..."}'
```
```