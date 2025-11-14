# 🎬 YouTube Clone Project — Task Breakdown (MEAN Stack)

## ⚙️ Backend Tasks

### 🧩 1. Setup & Config
- [+] Initialize Express app
- [+] Setup MongoDB + Mongoose
- [+] Setup environment variables
- [+] Configure Multer for uploads
- [+] Add CORS, Helmet middlewares
- [+] JWT auth middleware (verifyToken)
- [+] Role-based middleware (adminOnly)

---

### 🔐 2. Auth Module
- [+] `/auth/signup` — create user
- [+] `/auth/login` — login
- [+] `/auth/logout` — logout
- [+] `/auth/verfy-email` — verify email
- [+] `/auth/forgot-password` — send token to email
- [+] `/auth/reset-password` — update password
- [+] `/auth/me` — get logged-in user info

---

### 👤 3. User & Subscription Module
- [ ] `/users/:id` — get profile
- [ ] `/users/:id` (PATCH) — edit info
- [ ] `/users/:id/subscribe` — toggle subscribe
- [ ] `/users/:id/videos` — list uploads
- [ ] `/users/:id/subscribers` — list subscribers

---

### 🎥 4. Video Module
- [ ] `/videos/upload` — video upload
- [ ] `/videos` — explore all videos
- [ ] `/videos/:id` — get single video
- [ ] `/videos/:id/like` — like/unlike
- [ ] `/videos/:id/view` — increment views
- [ ] `/videos/:id` (PATCH, DELETE) — edit/delete

---

### 💬 5. Comment Module
- [ ] `/videos/:id/comments` — add/list comments
- [ ] `/comments/:id/reply` — reply to comment
- [ ] `/comments/:id/like` — like/unlike
- [ ] `/comments/:id` (DELETE) — delete comment

---

### 🔴 6. Streams Module (Optional)
- [ ] `/streams/start` — start stream
- [ ] `/streams/stop` — stop stream
- [ ] `/streams` — list active
- [ ] `/streams/:id` — watch stream
- [ ] Integrate Socket.io for chat

---

### 🧠 7. Admin Module
- [ ] `/admin/users` — list/delete users
- [ ] `/admin/videos` — list/delete videos
- [ ] `/admin/reports` — list/resolve reports
- [ ] Add “flag video” feature for users

---

## 💻 Frontend Tasks

### 🧱 8. Setup
- [ ] Initialize React + Vite
- [ ] Install Tailwind CSS
- [ ] Setup React Router
- [ ] Setup global Axios config
- [ ] Auth context (user state + JWT storage)

---

### 🔐 9. Auth Pages
- [ ] LoginPage (form + validation)
- [ ] SignupPage (upload profile pic)
- [ ] ForgotPasswordPage
- [ ] ResetPasswordPage

---

### 📺 10. Videos
- [ ] ExploreVideosPage — fetch `/videos`
- [ ] WatchVideoPage — video player + comments
- [ ] VideoCard component
- [ ] RelatedVideos component
- [ ] CommentSection component
- [ ] LikeButton component

---

### 🧑‍💻 11. Channel
- [ ] ExploreChannelsPage — `/channels`
- [ ] ChannelPage — show user uploads, subscribe button
- [ ] MyChannelPage — show my uploads
- [ ] UploadForm — `/videos/upload`
- [ ] EditChannelForm — update user info

---

### 🔴 12. Streams
- [ ] ExploreStreamsPage
- [ ] WatchStreamPage (live + chat)
- [ ] StreamChat component

---

### 🛡️ 13. Admin
- [ ] AdminDashboard — counts (users, videos)
- [ ] ManageUsersPage — delete users
- [ ] ManageVideosPage — delete videos
- [ ] ManageReportsPage — handle reports

---

### 🧩 14. UI Components
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
