# API Documentation

This document describes the API structure and endpoints for the Next.js application.

## Overview

The application uses Next.js App Router API routes for server-side functionality. All API routes are located in the `app/api/` directory and follow RESTful conventions.

## API Structure

```text
app/api/
├── health/
│   └── route.ts          # Health check endpoint
├── auth/
│   ├── login/
│   │   └── route.ts      # User authentication
│   └── logout/
│       └── route.ts      # User logout
└── users/
    ├── route.ts          # User operations
    └── [id]/
        └── route.ts      # Individual user operations
```

## Base Configuration

### Base URL

```text
Development: http://localhost:3000/api
Production: https://your-domain.com/api
```

### Headers

All API requests should include these headers:

```javascript
{
  "Content-Type": "application/json",
  "Accept": "application/json"
}
```

### Authentication

Protected endpoints require authentication:

```javascript
{
  "Authorization": "Bearer <your-jwt-token>"
}
```

## Endpoints

### Health Check

Check API availability and status.

**GET** `/api/health`

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-09-17T10:30:00.000Z",
  "version": "1.0.0"
}
```

**Status Codes:**
- `200` - API is healthy
- `503` - API is unavailable

### Authentication

#### Login

Authenticate user and receive access token.

**POST** `/api/auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "email": "user@example.com",
      "name": "John Doe"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "refresh_token_here"
  }
}
```

**Status Codes:**
- `200` - Login successful
- `400` - Invalid request body
- `401` - Invalid credentials
- `429` - Too many attempts

#### Logout

Invalidate user session.

**POST** `/api/auth/logout`

**Headers:**
```javascript
{
  "Authorization": "Bearer <your-jwt-token>"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully logged out"
}
```

**Status Codes:**
- `200` - Logout successful
- `401` - Unauthorized

### Users

#### Get All Users

Retrieve list of users (admin only).

**GET** `/api/users`

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `search` (optional): Search term

**Example:**
```
GET /api/users?page=1&limit=10&search=john
```

**Response:**
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "user_123",
        "email": "john@example.com",
        "name": "John Doe",
        "createdAt": "2025-01-01T00:00:00.000Z",
        "updatedAt": "2025-01-15T10:30:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "pages": 3
    }
  }
}
```

**Status Codes:**
- `200` - Success
- `401` - Unauthorized
- `403` - Forbidden (insufficient permissions)

#### Create User

Create a new user account.

**POST** `/api/users`

**Request Body:**
```json
{
  "email": "newuser@example.com",
  "name": "New User",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_124",
      "email": "newuser@example.com",
      "name": "New User",
      "createdAt": "2025-09-17T10:30:00.000Z"
    }
  }
}
```

**Status Codes:**
- `201` - User created successfully
- `400` - Invalid request body
- `409` - Email already exists

#### Get User by ID

Retrieve specific user information.

**GET** `/api/users/[id]`

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "email": "user@example.com",
      "name": "John Doe",
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-01-15T10:30:00.000Z"
    }
  }
}
```

**Status Codes:**
- `200` - Success
- `401` - Unauthorized
- `404` - User not found

#### Update User

Update user information.

**PUT** `/api/users/[id]`

**Request Body:**
```json
{
  "name": "Updated Name",
  "email": "updated@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "email": "updated@example.com",
      "name": "Updated Name",
      "updatedAt": "2025-09-17T10:30:00.000Z"
    }
  }
}
```

**Status Codes:**
- `200` - Update successful
- `400` - Invalid request body
- `401` - Unauthorized
- `404` - User not found

#### Delete User

Delete user account.

**DELETE** `/api/users/[id]`

**Response:**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

**Status Codes:**
- `200` - Delete successful
- `401` - Unauthorized
- `404` - User not found

## Error Handling

### Error Response Format

All error responses follow this structure:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": "Additional error details (optional)"
  }
}
```

### Common Error Codes

- `VALIDATION_ERROR` - Invalid request data
- `AUTHENTICATION_ERROR` - Authentication failed
- `AUTHORIZATION_ERROR` - Insufficient permissions
- `NOT_FOUND_ERROR` - Resource not found
- `RATE_LIMIT_ERROR` - Too many requests
- `INTERNAL_ERROR` - Server error

### Status Codes

- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `429` - Too Many Requests
- `500` - Internal Server Error

## Rate Limiting

API endpoints are rate limited to prevent abuse:

- **Authentication endpoints**: 5 requests per minute per IP
- **General endpoints**: 100 requests per minute per authenticated user
- **Public endpoints**: 20 requests per minute per IP

Rate limit headers are included in responses:

```javascript
{
  "X-RateLimit-Limit": "100",
  "X-RateLimit-Remaining": "95",
  "X-RateLimit-Reset": "1642780800"
}
```

## Data Types

### User Object

```typescript
interface User {
  id: string
  email: string
  name: string
  createdAt: string
  updatedAt: string
}
```

### Pagination Object

```typescript
interface Pagination {
  page: number
  limit: number
  total: number
  pages: number
}
```

### API Response

```typescript
interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
    details?: string
  }
}
```

## Implementation Example

### Client-side Usage

```typescript
// lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api'

class ApiClient {
  private baseURL: string
  private token: string | null = null

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  setToken(token: string) {
    this.token = token
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    }

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`
    }

    const response = await fetch(url, {
      ...options,
      headers,
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }

    return response.json()
  }

  // Auth methods
  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  }

  // User methods
  async getUsers(params?: { page?: number; limit?: number; search?: string }) {
    const searchParams = new URLSearchParams()
    if (params?.page) searchParams.set('page', params.page.toString())
    if (params?.limit) searchParams.set('limit', params.limit.toString())
    if (params?.search) searchParams.set('search', params.search)

    const query = searchParams.toString()
    return this.request(`/users${query ? `?${query}` : ''}`)
  }

  async createUser(userData: { email: string; name: string; password: string }) {
    return this.request('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  }
}

export const apiClient = new ApiClient(API_BASE_URL)
```

### Server-side Implementation

```typescript
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search')

    // Implement your logic here
    const users = await getUsersFromDatabase({ page, limit, search })

    return NextResponse.json({
      success: true,
      data: {
        users,
        pagination: {
          page,
          limit,
          total: users.length,
          pages: Math.ceil(users.length / limit),
        },
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to fetch users',
        },
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate request body
    if (!body.email || !body.name || !body.password) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Missing required fields',
          },
        },
        { status: 400 }
      )
    }

    // Create user
    const user = await createUserInDatabase(body)

    return NextResponse.json(
      {
        success: true,
        data: { user },
      },
      { status: 201 }
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to create user',
        },
      },
      { status: 500 }
    )
  }
}
```

This API documentation provides a comprehensive guide for understanding and implementing the API endpoints in your Next.js application.
