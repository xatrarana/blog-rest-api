# blog-rest-api
The Blog REST API is an application programming interface that provides a set of endpoints for managing blog-related operations. It allows users to create, read, update, and delete blog posts, as well as perform other actions such as commenting on posts and retrieving user profiles.

# User Authentication API

This API provides endpoints for user authentication, including signup and login functionality.

## Setup

      1. Clone the repository:
         git clone https://github.com/xatrarana/blog-rest-api.git 

      2. Install dependencies:
      
          cd blog-rest-api
          npm install
      
      3. Start the server:
          npm run dev
          The server will start running on http://localhost:8080.

      4. make the .env file and update the info
      
          DB_URL=your-database-url
          PORT=your-port-number
          SECRET_KEY=your-secret-key
     

# API Endpoints
      ### Base url: http://localhost:8080/api/e/user 
  ## Signup
     Endpoint: POST /auth/signup
     This endpoint allows users to sign up and create a new account.
  ### Request Example
    ````````
        POST /auth/signup HTTP/1.1
        Content-Type: application/json

        {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "phone": "1234567890",
        "password": "secretpassword",
        "cpassword": "secretpassword"
        }
    ````````
    Response
    Upon successful signup, the server will respond with a success message and a status code of 201 Created.
  
  ## Login
      Endpoint: POST /auth/login
      This endpoint allows users to log in and obtain an authorization token.
  ### Request Example
````````
        POST /auth/login HTTP/1.1
        Content-Type: application/json

        {
        "email": "john.doe@example.com",
        "password": "secretpassword"
        }
````````
        Response
        Upon successful login, the server will respond with a token that can be used for authentication in further operations. The token will be included in the Authorization header of the response.
## Error Responses
The API may respond with the following error messages:

Status Code	Message	Description
400	Bad Request	Invalid request or missing parameters
401	Unauthorized	Authentication failed
404	Not Found	

# API Documentation: Post Management

    This documentation provides information about the endpoints for managing posts. These endpoints allow users to retrieve, create, update, and delete posts.     Authentication is required for all operations except retrieving posts.
  ### Base URL
  ````
     htpp://localhost:8080/api/e/posts 
  ````
  ### Authentication
    Authentication is required for all endpoints except retrieving posts. Users need to include an authorization token in the request headers using the Bearer token scheme.

    Authorization: Bearer <token>
## Get Post by ID
Endpoint: GET /posts/:id
    Request Example
````
    GET /api/posts/[$user_id] HTTP/1.1
    Authorization: Bearer your-auth-token
````
## Create Post
Endpoint: POST /posts/create
    Request Example
    ```````
    POST /api/posts/create HTTP/1.1
    Content-Type: application/json
    Authorization: Bearer your-auth-token

    {
    "user": ["user_id"],
    "title": "New Post",
    "description": "Lorem ipsum dolor sit amet..."
    }
    `````
## Update Post
Endpoint: PUT /posts/update/:id

This endpoint allows users to update an existing post. this take post id as parameter
Request Example
`````
    PUT /api/posts/update/[$post_id] HTTP/1.1
    Content-Type: application/json
    Authorization: Bearer your-auth-token

    {
    "title": "Updated Post",
    "content": "Updated content..."
    }
`````
## Delete Post
Endpoint: DELETE /posts/delete/:id

This endpoint allows users to delete a post. this will take the post id.
 Request example
 ``````
    DELETE /api/posts/delete/[$post_id] HTTP/1.1
    Content-Type: application/json
    Authorization: Bearer your-auth-token
``````
# API Documentation: Post Search
     This documentation provides information about the endpoint for searching posts based on query parameters
    #base url : /e/search?q=[$content-to-search]

# API Documentation: Feed Retrieval
This documentation provides information about the endpoint for retrieving the feed. Authentication is required to access the feed.
```
    http://localhost:8080/e/feed
```
## Authentication
    Authentication is required to access the feed. Users need to include an authorization token in the request headers using the Bearer token scheme.
````
Authorization: Bearer <token>
````
## Get Feed
Endpoint: GET /e/feed

This endpoint allows users to retrieve their feed.

Request Example
```
    GET /api/feed HTTP/1.1
    Authorization: Bearer your-auth-token
```
