# 🎟️ Event Registration System — MERN Stack

A full-stack event registration app where users can view events and register by submitting their details.

## Project Structure
```
event-registration/
├── backend/
│   ├── models/
│   │   ├── Event.js
│   │   └── Registration.js
│   ├── routes/
│   │   ├── eventRoutes.js
│   │   └── registrationRoutes.js
│   ├── server.js        ← Auto-seeds 3 sample events
│   ├── .env
│   └── package.json
└── frontend/
    ├── public/index.html
    ├── src/
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    ├── .env
    └── package.json
```

## Setup & Run (Local)

### 1. Configure .env files

**backend/.env**
```
PORT=5002
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/eventdb?retryWrites=true&w=majority
```

**frontend/.env**
```
REACT_APP_API_URL=http://localhost:5002/api
```

### 2. Run Backend
```bash
cd backend
npm install
npm run dev        # development (nodemon)
# OR
npm start          # production
```

### 3. Run Frontend
```bash
cd frontend
npm install
npm start
```

App runs at: http://localhost:3000
API runs at: http://localhost:5002

> **Note:** On first run, backend auto-seeds 3 sample events into MongoDB Atlas.

## Features
- View upcoming events (title, date, location, seats)
- Register for an event (name, email, phone, college)
- Duplicate email check per event
- View all registrations in admin tab

## API Endpoints
| Method | Route                          | Description                  |
|--------|-------------------------------|------------------------------|
| GET    | /api/events                   | Get all events               |
| GET    | /api/events/:id               | Get single event             |
| POST   | /api/registrations            | Submit registration          |
| GET    | /api/registrations            | Get all registrations        |
| GET    | /api/registrations/event/:id  | Get registrations for event  |

---

## AWS EC2 Deployment

### Step 1 — Launch EC2
- AMI: Ubuntu 22.04 LTS
- Instance type: t2.micro
- Security Group inbound:
  - SSH: 22, HTTP: 80, Custom TCP: 5002

### Step 2 — Install Node.js & PM2
```bash
ssh -i your-key.pem ubuntu@<EC2_PUBLIC_IP>
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g pm2
sudo apt install nginx -y
```

### Step 3 — Deploy Backend
```bash
scp -r -i your-key.pem event-registration ubuntu@<EC2_PUBLIC_IP>:/home/ubuntu/
cd /home/ubuntu/event-registration/backend
npm install
nano .env   # Set MONGO_URI
pm2 start server.js --name event-backend
pm2 save && pm2 startup
```

### Step 4 — Build & Deploy Frontend
```bash
cd /home/ubuntu/event-registration/frontend
nano .env   # Set REACT_APP_API_URL=http://<EC2_PUBLIC_IP>:5002/api
npm install && npm run build
sudo cp -r build/* /var/www/html/
sudo systemctl restart nginx
```

Access at: http://<EC2_PUBLIC_IP>
