# AlgoViz MERN Backend - API Documentation

This document provides details about the API endpoints for the AlgoViz MERN backend server.

**Base URL:** (Typically `http://localhost:3001` during development, or your deployed server URL)

**Authentication:**
Protected routes require a valid JSON Web Token (JWT) issued by Clerk. The token must be included in the `Authorization` header of the request as a Bearer token:
`Authorization: Bearer <CLERK_JWT_TOKEN>`
The `@clerk/clerk-sdk-node` middleware automatically handles verification.

---

## Table of Contents

*   [Public Endpoints](#public-endpoints)
    *   [GET /api/ping](#get-apiping)
    *   [GET /api/lessons](#get-apilessons)
    *   [GET /api/lessons/:slug](#get-apilessonsslug)
    *   [GET /api/quizzes](#get-apiquizzes)
    *   [GET /api/quizzes/:quizId](#get-apiquizzesquizid)
*   [Protected Endpoints (User-Specific)](#protected-endpoints-user-specific)
    *   [GET /api/user/progress](#get-apiuserprogress)
    *   [GET /api/user/progress/:quizId](#get-apiuserprogressquizid)
    *   [POST /api/user/progress/:quizId](#post-apiuserprogressquizid)
*   [Error Responses](#error-responses)

---

## Public Endpoints

These endpoints do not require authentication.

### GET /api/ping

*   **Description:** A simple health check endpoint.
*   **Authentication:** Public
*   **Request:** None
*   **Responses:**
    *   **200 OK:**
        ```json
        {
          "message": "pong"
        }
        ```

---

### GET /api/lessons

*   **Description:** Retrieves metadata (slug, title, category, description) for all available lessons.
*   **Authentication:** Public
*   **Request:** None
*   **Responses:**
    *   **200 OK:** Returns an array of lesson metadata objects.
        ```json
        [
          {
            "slug": "introduction-to-algorithms",
            "title": "Introduction to Algorithms",
            "category": "Fundamentals",
            "description": "Learn the basic concepts of algorithms."
          },
          {
            "slug": "big-o-notation",
            "title": "Big O Notation",
            "category": "Complexity Analysis",
            "description": "Understand how to analyze algorithm efficiency."
          }
          // ... more lessons
        ]
        ```
    *   **500 Internal Server Error:** If there's an error fetching data from the database.

---

### GET /api/lessons/:slug

*   **Description:** Retrieves the full details of a specific lesson identified by its unique `slug`. Also includes metadata (slug and title) for the previous and next lessons, if they exist.
*   **Authentication:** Public
*   **Request:**
    *   **URL Parameters:**
        *   `slug` (string, required): The unique identifier for the lesson.
*   **Responses:**
    *   **200 OK:** Returns the complete lesson object.
        ```json
        {
          "_id": "...", // MongoDB ObjectId
          "slug": "big-o-notation",
          "title": "Big O Notation",
          "category": "Complexity Analysis",
          "description": "Understand how to analyze algorithm efficiency.",
          "content": "# Big O Notation\n...", // Markdown content
          "examples": "```javascript\n...\n```", // Markdown content
          "resources": "- [Link 1](...)\n- [Link 2](...)", // Markdown content
          "visualizerPath": "/visualizers/sorting",
          "prevLessonSlug": "introduction-to-algorithms",
          "nextLessonSlug": "basic-data-structures",
          "createdAt": "...", // ISO 8601 Date String
          "updatedAt": "...", // ISO 8601 Date String
          "prevLesson": { // Added dynamically if prevLessonSlug exists
            "slug": "introduction-to-algorithms",
            "title": "Introduction to Algorithms"
          },
          "nextLesson": { // Added dynamically if nextLessonSlug exists
            "slug": "basic-data-structures",
            "title": "Basic Data Structures"
          }
        }
        ```
    *   **404 Not Found:** If no lesson with the specified `slug` exists.
    *   **500 Internal Server Error:** If there's an error fetching data from the database.

---

### GET /api/quizzes

*   **Description:** Retrieves metadata (id, title, description, topic, difficulty) for all available quizzes. Note the mapping from `quizId` (database) to `id` (response).
*   **Authentication:** Public
*   **Request:** None
*   **Responses:**
    *   **200 OK:** Returns an array of quiz metadata objects.
        ```json
        [
          {
            "id": "algorithms-basics", // Mapped from quizId
            "title": "Algorithms Fundamentals",
            "description": "Test your knowledge on fundamental algorithm concepts...",
            "topic": "Fundamentals",
            "difficulty": "beginner"
          },
          {
            "id": "sorting-algorithms", // Mapped from quizId
            "title": "Sorting Algorithms",
            "description": "Test your knowledge on common sorting algorithms...",
            "topic": "Sorting",
            "difficulty": "intermediate"
          }
          // ... more quizzes
        ]
        ```
    *   **500 Internal Server Error:** If there's an error fetching data from the database.

---

### GET /api/quizzes/:quizId

*   **Description:** Retrieves the full details of a specific quiz, including all its questions and options, identified by its unique `quizId`. Note the mapping from database IDs (`quizId`, `questionId`, `optionId`) to frontend IDs (`id`).
*   **Authentication:** Public
*   **Request:**
    *   **URL Parameters:**
        *   `quizId` (string, required): The unique identifier for the quiz (e.g., "algorithms-basics").
*   **Responses:**
    *   **200 OK:** Returns the complete quiz object structured for the frontend.
        ```json
        {
          "id": "algorithms-basics", // Mapped from quizId
          "title": "Algorithms Fundamentals",
          "description": "Test your knowledge...",
          "topic": "Fundamentals",
          "difficulty": "beginner",
          "questions": [
            {
              "id": "algo-basics-1", // Mapped from questionId
              "text": "What is an algorithm?",
              "options": [
                { "id": "a1", "text": "A programming language", "isCorrect": false }, // id mapped from optionId
                { "id": "a2", "text": "A step-by-step procedure...", "isCorrect": true },
                { "id": "a3", "text": "A type of computer hardware", "isCorrect": false },
                { "id": "a4", "text": "A mathematical equation", "isCorrect": false }
              ],
              "explanation": "An algorithm is a step-by-step..."
            }
            // ... more questions
          ]
        }
        ```
    *   **404 Not Found:** If no quiz with the specified `quizId` exists.
    *   **500 Internal Server Error:** If there's an error fetching data from the database.

---

## Protected Endpoints (User-Specific)

These endpoints require a valid Clerk JWT passed in the `Authorization: Bearer <token>` header.

### GET /api/user/progress

*   **Description:** Retrieves all quiz progress records for the currently authenticated user.
*   **Authentication:** Protected (Requires Clerk Authentication)
*   **Request:** None (User ID is extracted from the validated Clerk token)
*   **Responses:**
    *   **200 OK:** Returns a map where keys are `quizId`s and values are the progress objects for that quiz.
        ```json
        {
          "algorithms-basics": {
            "quizId": "algorithms-basics",
            "completed": true,
            "score": 4,
            "totalQuestions": 5,
            "lastAttemptDate": "...", // ISO 8601 Date String
            "answers": {
              "algo-basics-1": "a2",
              "algo-basics-2": "a3"
              // ... other answers for this quiz
            }
          },
          "sorting-algorithms": {
            "quizId": "sorting-algorithms",
            "completed": false,
            "score": 2,
            "totalQuestions": 5,
            "lastAttemptDate": "...", // ISO 8601 Date String
            "answers": {
              "sort-1": "a2",
              "sort-2": "a1" // Example incorrect answer
            }
          }
          // ... other progress records
        }
        ```
    *   **401 Unauthorized:** If the token is missing, invalid, or expired.
    *   **500 Internal Server Error:** If there's an error fetching data from the database.

---

### GET /api/user/progress/:quizId

*   **Description:** Retrieves the progress record for a specific quiz for the currently authenticated user.
*   **Authentication:** Protected (Requires Clerk Authentication)
*   **Request:**
    *   **URL Parameters:**
        *   `quizId` (string, required): The identifier of the quiz to fetch progress for.
*   **Responses:**
    *   **200 OK:** Returns the specific progress object, or `null` if no progress exists for this user/quiz combination.
        ```json
        // Example if progress exists
        {
          "quizId": "algorithms-basics",
          "completed": true,
          "score": 4,
          "totalQuestions": 5,
          "lastAttemptDate": "...", // ISO 8601 Date String
          "answers": {
            "algo-basics-1": "a2",
            "algo-basics-2": "a3"
          }
        }

        // Example if no progress exists
        null
        ```
    *   **401 Unauthorized:** If the token is missing, invalid, or expired.
    *   **500 Internal Server Error:** If there's an error fetching data from the database.

---

### POST /api/user/progress/:quizId

*   **Description:** Saves or updates the progress (including answers and completion status) for a specific quiz for the currently authenticated user. Calculates the score server-side based on the submitted answers and the correct answers stored in the database. Uses upsert logic: creates a new record if one doesn't exist, updates it otherwise.
*   **Authentication:** Protected (Requires Clerk Authentication)
*   **Request:**
    *   **URL Parameters:**
        *   `quizId` (string, required): The identifier of the quiz to save progress for.
    *   **Body (JSON):**
        *   `answers` (object, required): An object mapping `questionId` to the selected `optionId`. Example: `{ "questionId1": "optionId2", "questionId2": "optionId1", ... }`
        *   `completed` (boolean, required): Indicates whether the user has marked the quiz as completed.
        ```json
        // Example Request Body
        {
          "answers": {
            "algo-basics-1": "a2",
            "algo-basics-2": "a3",
            "algo-basics-3": "a1",
            "algo-basics-4": "a2",
            "algo-basics-5": "a3"
          },
          "completed": true
        }
        ```
*   **Responses:**
    *   **200 OK:** Indicates progress was saved successfully. Returns a confirmation message and the updated/created progress record.
        ```json
        {
          "message": "Progress saved successfully",
          "progress": {
            "quizId": "algorithms-basics",
            "completed": true,
            "score": 5, // Calculated server-side
            "totalQuestions": 5,
            "lastAttemptDate": "...", // Updated ISO 8601 Date String
            "answers": {
              "algo-basics-1": "a2",
              "algo-basics-2": "a3",
              "algo-basics-3": "a1",
              "algo-basics-4": "a2",
              "algo-basics-5": "a3"
            }
          }
        }
        ```
    *   **400 Bad Request:** If the request body is missing required fields (`answers`, `completed`) or if data types are incorrect. May also occur for Mongoose validation errors or invalid ID formats (CastError).
    *   **401 Unauthorized:** If the token is missing, invalid, or expired.
    *   **404 Not Found:** If the specified `quizId` does not correspond to an existing quiz in the database (needed for scoring).
    *   **500 Internal Server Error:** If there's an error interacting with the database during the save/update operation.

---

## Error Responses

Common error responses across endpoints:

*   **400 Bad Request:**
    *   Usually indicates invalid input data (e.g., missing fields in POST body, incorrect data types).
    *   May include specific validation errors from Mongoose.
    *   May indicate an invalid ID format (Mongoose CastError).
    ```json
    // Example Validation Error
    {
        "message": "Validation Error",
        "errors": {
            "fieldName": { /* Mongoose error details */ }
        }
    }
    // Example CastError
    {
        "message": "Invalid ID format",
        "path": "quizId",
        "value": "invalid-id-format"
    }
    // Example Missing Fields (from POST progress)
    {
        "message": "Invalid progress data: \"answers\" and \"completed\" required."
    }
    ```
*   **401 Unauthorized:**
    *   Returned for protected routes when the `Authorization` header is missing, the token is invalid/expired, or Clerk verification fails.
    ```json
    {
        "message": "Authentication error" // Or a more specific message from Clerk
    }
    ```
*   **403 Forbidden:**
    *   May be returned by Clerk middleware if the token is valid but lacks necessary permissions (though not configured in this specific server setup).
*   **404 Not Found:**
    *   Returned when a requested resource (lesson, quiz) identified by a parameter (`:slug`, `:quizId`) cannot be found.
    *   Also returned by the catch-all middleware if no route matches the request path/method.
    ```json
    // Example for GET /api/lessons/non-existent-slug
    {
        "message": "Lesson not found"
    }
    // Example from catch-all middleware
    {
        "message": "Not Found: Cannot GET /api/nonexistent/route"
    }
    ```
*   **500 Internal Server Error:**
    *   A generic error indicating an unexpected problem on the server, often related to database connectivity issues or unhandled exceptions in the code.
    ```json
    {
        "message": "Internal Server Error"
    }
    ```
