# 🎬 YouTube Clone Project — Task Breakdown (MEAN Stack)

## SETUP PROJECT

### 🧩 1. Setup & Config

#### Backend
- [+] Initialize Express app
- [+] Setup MongoDB + Mongoose
- [+] Setup environment variables
- [+] Configure Multer for uploads
- [+] Add CORS, Morgan, Helmet middlewares
- [+] JWT auth middleware (verifyToken)
- [+] Role-based middleware (adminOnly)

#### Frontend
- [+] Initialize Angular
- [+] Install Tailwind CSS


## ⚙️ Backend Tasks

### 🔐 1. Auth Module
- [+] POST   `/auth/signup` — create user
- [+] POST   `/auth/login` — JWT issue
- [+] POST   `/auth/forgot-password` — send token to email
- [+] POST   `/auth/reset-password` — update password
- [+] GET    `/auth/me` — get logged-in user info

---

### 👤 2. User & Subscription Module
- [ ] GET    `/users/:id` — get profile
- [ ] PATCH  `/users/:id` (PATCH) — edit info
- [ ] POST   `/users/:id/subscribe` — toggle subscribe
- [ ] GET    `/users/:id/videos` — list uploads
- [ ] GET    `/users/:id/subscribers` — list subscribers

---

### 🎥 3. Video Module
- [ ] POST   `/videos/upload` — video upload
- [ ] GET    `/videos` — explore all videos
- [ ] GET    `/videos/:id` — get single video
- [ ] PATCH  `/videos/:id/like` — like/unlike
- [ ] PATCH  `/videos/:id/view` — increment views
- [ ] PATCH  `/videos/:id` (PATCH, DELETE) — edit video (re-upload)
- [ ] DELETE `/videos/:id` (PATCH, DELETE) — delete video

---

### 💬 4. Comment Module
- [ ] POST   `/videos/:id/comments` — add/list comments
- [ ] POST   `/comments/:id/reply` — reply to comment
- [ ] PATCH  `/comments/:id/like` — like/unlike
- [ ] DELETE `/comments/:id` (DELETE) — delete comment

---

### 🔴 5. Streams Module (Optional)
- [ ] POST   `/streams/start` — start stream
- [ ] POST   `/streams/stop` — stop stream
- [ ] GET    `/streams` — list active
- [ ] GET    `/streams/:id` — watch stream
- [ ] Integrate Socket.io for chat

---

### 🧠 6. Admin Module
- [ ] GET    `/admin/users` — list users
- [ ] DELETE `/admin/users` — delete users
- [ ] GET    `/admin/videos` — list videos
- [ ] DELETE `/admin/videos` — delete videos
- [ ] GET    `/admin/reports` — list reports
- [ ] DELETE `/admin/reports` — reslove reports
- [ ] Add “flag video” feature for users

---

## 💻 Frontend Tasks

### 🔐 7. Auth Pages
- [ ] LoginPage (form + validation)
- [ ] SignupPage (upload profile pic)
- [ ] ForgotPasswordPage
- [ ] ResetPasswordPage

---

### 📺 8. Videos
- [ ] ExploreVideosPage — fetch `/videos`
- [ ] WatchVideoPage — video player + comments
- [ ] VideoCard component
- [ ] RelatedVideos component
- [ ] CommentSection component
- [ ] LikeButton component

---

### 🧑‍💻 9. Channel
- [ ] ExploreChannelsPage — `/channels`
- [ ] ChannelPage — show user uploads, subscribe button
- [ ] MyChannelPage — show my uploads
- [ ] UploadForm — `/videos/upload`
- [ ] EditChannelForm — update user info

---

### 🔴 10. Streams (Optional)
- [ ] ExploreStreamsPage
- [ ] WatchStreamPage (live + chat)
- [ ] StreamChat component

---

### 🛡️ 11. Admin
- [ ] AdminDashboard — counts (users, videos)
- [ ] ManageUsersPage — delete users
- [ ] ManageVideosPage — delete videos
- [ ] ManageReportsPage — handle reports

---

### 🧩 12. UI Components
- [ ] Navbar (login/logout/profile)
- [ ] Sidebar (routes)
- [ ] VideoPlayer
- [ ] Loader + Toast components
- [ ] ProtectedRoute wrapper

---

## 🌈 Bonus (if time allows)
- [ ] Dark/light theme toggle
- [ ] Search videos
- [ ] Notifications for new uploads
- [ ] Channel analytics dashboard

---

## 📦 DevOps
- [ ] Setup `.env` and `.env.example`
- [ ] GitHub repo structure: `/client`, `/server`
- [ ] Setup ESLint + Prettier
- [ ] Deploy backend to Render/Railway
- [ ] Deploy frontend to Vercel
- [ ] MongoDB Atlas setup
