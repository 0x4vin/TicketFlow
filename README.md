# 🎫 TicketFlow: MERN Stack Issue Tracker

TicketFlow is a comprehensive, full-stack issue tracking system built with the MERN stack (MongoDB, Express, React, Node.js). It allows different user roles (Clients, Developers, Admins) to submit, view, and manage technical support tickets or feature requests.

## ✨ Features

* **Role-Based Access Control (RBAC):**
    * **Client:** Can register, log in, create new tickets, and view/update only their reported tickets.
    * **Developer:** Can view all reported/assigned tickets and update ticket status/assignment.
    * **Admin:** Has full control, viewing all tickets and managing assignments/deletion.
* **Authentication:** Secure registration and login using JWT (JSON Web Tokens).
* **Ticket Management:** CRUD (Create, Read, Update, Delete) operations for tickets with fields like `title`, `description`, `category`, `priority`, `status`, `reporter`, and `assignedTo`.
* **Cloud Database:** Uses MongoDB Atlas for persistent, cloud-based data storage.

---

## 🛠️ Project Structure

The project is divided into two main services: a Node/Express backend API and a React frontend client.

ticketflow/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── app.js
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── styles/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│
└── README.md
---
## 🚀 Setup and Running Instructions

Follow these steps to get the application running locally.

### 1. Prerequisites

You must have the following installed:

* **Node.js** (v18 or higher) and **npm**
* A **MongoDB Atlas Cluster** (or local MongoDB instance)

### 2. Backend Setup

The backend handles the API and database connection.

1.  **Navigate to the backend directory:**
    ```bash
    cd ticketflow/backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables (CRITICAL):**
    * Create a file named **`.env`** by copying the example template:
        ```bash
        cp .env.example .env
        ```
    * Open **`.env`** and fill in your unique values:
        ```
        PORT=5000
        # Replace with your Atlas connection string (including user/password)
        MONGO_URI=mongodb+srv://<user>:<password>@clusterx.xxxxx.mongodb.net/ticketflowdb?retryWrites=true&w=majority
        # Use a long, random, secure string
        JWT_SECRET=your_long_and_secure_jwt_secret_key
        ```

4.  **Start the Backend Server:**
    ```bash
    npm run dev
    ```
    Wait for the messages `✅ MongoDB Connected` and `Server running on port 5000`.

### 3. Frontend Setup

The frontend is the React client accessed via the browser.

1.  **Open a new terminal window** and navigate to the frontend directory:
    ```bash
    cd ticketflow/frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the Frontend Client:**
    ```bash
    npm run dev
    ```
    The application will typically be available at `http://localhost:5173/`.

### 4. Usage

1.  Open your browser and navigate to the local frontend address (e.g., `http://localhost:5173/`).
2.  Start by using the **Register** link to create your first user.
3.  **To test RBAC**, register at least two users: one as a `client` and one as an `admin` or `developer`.

---
