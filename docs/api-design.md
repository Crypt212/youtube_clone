# AUTH ROUTES

| Method | Endpoint                    | Auth | Description                        |
| :----- | :-------------------------- | :--- | :--------------------------------- |
| `POST` | `/api/auth/signup`          | ❌    | Register new user                  |
| `POST` | `/api/auth/login`           | ❌    | Login and get JWT                  |
| `POST` | `/api/auth/forgot-password` | ❌    | Send reset token to email          |
| `POST` | `/api/auth/reset-password`  | ❌    | Reset password using token         |
| `GET`  | `/api/auth/me`              | ✅    | Get current logged-in user profile |

# CHANNEL ROUTES

| Method  | Endpoint                     | Auth | Description                     |
| :------ | :--------------------------- | :--- | :------------------------------ |
| `GET`   | `/api/users/:id`             | ❌    | Get user profile/channel        |
| `PATCH` | `/api/users/:id`             | ✅    | Edit user info                  |
| `POST`  | `/api/users/:id/subscribe`   | ✅    | Subscribe / Unsubscribe to user |
| `GET`   | `/api/users/:id/videos`      | ❌    | Get videos uploaded by user     |
| `GET`   | `/api/users/:id/subscribers` | ❌    | List user subscribers           |

# VIDEO ROUTES

| Method   | Endpoint               | Auth | Description                |
| :------- | :--------------------- | :--- | :------------------------- |
| `POST`   | `/api/videos/upload`   | ✅    | Upload video               |
| `GET`    | `/api/videos`          | ❌    | Explore all videos         |
| `GET`    | `/api/videos/trending` | ❌    | Get trending videos        |
| `GET`    | `/api/videos/:id`      | ❌    | Get single video           |
| `POST`   | `/api/videos/:id/view` | ❌    | Increment view count       |
| `PATCH`  | `/api/videos/:id`      | ✅    | Edit video (owner only)    |
| `DELETE` | `/api/videos/:id`      | ✅    | Delete video (owner/admin) |
| `POST`   | `/api/videos/:id/like` | ✅    | Like/unlike a video        |

# COMMENT ROUTES

| Method   | Endpoint                   | Auth | Description                |
| :------- | :------------------------- | :--- | :------------------------- |
| `POST`   | `/api/videos/:id/comments` | ✅    | Add comment                |
| `GET`    | `/api/videos/:id/comments` | ❌    | Get comments for a video   |
| `POST`   | `/api/comments/:id/like`   | ✅    | Like/unlike a comment      |
| `POST`   | `/api/comments/:id/reply`  | ✅    | Reply to comment           |
| `DELETE` | `/api/comments/:id`        | ✅    | Delete comment (own/admin) |

# STREAM ROUTES

| Method | Endpoint             | Auth | Description             |
| :----- | :------------------- | :--- | :---------------------- |
| `POST` | `/api/streams/start` | ✅    | Start live stream       |
| `POST` | `/api/streams/stop`  | ✅    | Stop live stream        |
| `GET`  | `/api/streams`       | ❌    | List all active streams |
| `GET`  | `/api/streams/:id`   | ❌    | Watch live stream       |

# ADMIN ROUTES

| Method   | Endpoint                         | Auth (admin) | Description             |
| :------- | :------------------------------- | :----------- | :---------------------- |
| `GET`    | `/api/admin/users`               | ✅            | List all users          |
| `DELETE` | `/api/admin/users/:id`           | ✅            | Delete user             |
| `GET`    | `/api/admin/videos`              | ✅            | List all videos         |
| `DELETE` | `/api/admin/videos/:id`          | ✅            | Remove video            |
| `GET`    | `/api/admin/reports`             | ✅            | View reports            |
| `POST`   | `/api/admin/reports/:id/resolve` | ✅            | Mark report as resolved |
