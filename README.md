# CampusFix — Smart Campus Complaint Tracking & Resolution Platform

CampusFix is a DevOps-ready college complaint management prototype. Students can report campus issues, receive a complaint ID, track status, and administrators can review complaints and update their status.

## Features
- Student complaint submission
- Complaint ID generation
- Complaint status tracking
- Admin dashboard
- Status workflow: OPEN → IN_PROGRESS → RESOLVED
- Categories: Maintenance, Cleanliness, Safety, IT Support, Transport, Other
- Priority: LOW, MEDIUM, HIGH
- Spring Boot REST backend
- H2 file database (no MySQL setup required)
- Docker
- Jenkins Pipeline

## Ports
- Backend: `http://localhost:8090` when run locally
- Docker: `http://localhost:8082`
- Health endpoint: `http://localhost:8082/api/complaints/health`

## Run locally
1. Open `backend` in IntelliJ/VS Code.
2. Run `BackendApplication.java` using Java 17+.
3. Open `FrontEnd/index.html` in a browser.

## Docker
From project root:
```powershell
docker build -t campusfix-backend:latest backend
docker run -d --name campusfix-backend -p 8082:8090 campusfix-backend:latest
```

## Jenkins
Create a Pipeline job using `Pipeline script from SCM`, point it to this repository, and select the root `Jenkinsfile`. The included Pipeline polls SCM, builds/tests, creates the Docker image, and deploys the container on port 8082.

## Demo flow
Student → Report Complaint → Complaint ID → Admin → Update Status → Student → Track Complaint.
