
---

# 📝 Todo Web App: Full-Stack Task Management App

A robust, secure To-Do application built with **React**, **Spring Boot**, and **MySQL**. This app allows users to manage their daily tasks with granular control over priorities, statuses, and deadlines, all protected by JWT-based authentication.

## 🚀 Features

### 🔐 Security & User Management

* **User Authentication:** Secure Signup and Login system.
* **JWT Authorization:** Stateless session management using JSON Web Tokens.
* **Protected Routes:** Only authenticated users can access and manage their tasks.

### ✅ Task Management

* **CRUD Operations:** Create, view, and delete tasks.
* **Rich Task Data:** Each task includes:
* **Description:** Detailed text for the task.
* **Urgency/Priority:** Categorized as *Urgent*, *Normal*, or *Do when time allows*.
* **Status:** Track progress through *Not Started Yet*, *In Progress*, *Done*, or *Missed Deadline*.
* **Deadline:** Date-based tracking for time-sensitive items.



### 🔍 Organization & Efficiency

* **Dynamic Sorting:** Sort your task list by Priority, Status, or Deadline.
* **Smart Filtering:** Filter views to focus only on specific task categories (e.g., view only "Urgent" or "In Progress" tasks).

---

## 🛠 Tech Stack

### Frontend

* **React.js:** Component-based UI logic.
* **Tailwind CSS:** Modern, utility-first styling for a responsive design.
* **Axios:** For handling API requests to the backend.

### Backend

* **Spring Boot:** Robust Java framework for the REST API.
* **Spring Security:** Comprehensive security and access control.
* **JWT (jjwt):** Token-based security for RESTful communication.
* **Spring Data JPA:** For easy interaction with the database.

### Database

* **MySQL:** Reliable relational database storage.

---

## 🏗 System Architecture

The application follows a standard Client-Server architecture:

1. **Frontend (React)** sends credentials to the **Backend (Spring Boot)**.
2. **Spring Boot** validates credentials and returns a **JWT**.
3. The **Frontend** stores the JWT and sends it in the `Authorization` header for subsequent requests.
4. The **Database (MySQL)** persists user data and task details.

---

## 🚦 Getting Started

### Prerequisites

* **Node.js** (v16+)
* **JDK 17** or higher
* **MySQL** instance
* **Maven**

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/your-repo-name.git

```


2. **Backend Setup**
* Navigate to the `/backend` folder.
* Open `src/main/resources/application.properties` and update your MySQL credentials:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/your_db_name
spring.datasource.username=your_username
spring.datasource.password=your_password

```


* Run the application:
```bash
mvn spring-boot:run

```




3. **Frontend Setup**
* Navigate to the `/frontend` folder.
* Install dependencies and start the dev server:
```bash
npm install
npm start

```





---

## 📌 API Endpoints (Quick Reference)

| Method | Endpoint | Description | Auth Required |
| --- | --- | --- | --- |
| `POST` | `/api/auth/signup` | Register a new user | No |
| `POST` | `/api/auth/login` | Login and get JWT | No |
| `GET` | `/api/tasks` | Get all user tasks | Yes |
| `POST` | `/api/tasks` | Create a new task | Yes |
| `DELETE` | `/api/tasks/{id}` | Remove a task | Yes |

---
