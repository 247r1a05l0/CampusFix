# Viva / Demo Notes

## One-line project explanation
CampusFix is a centralized platform for reporting, routing/tracking, and resolving campus complaints with transparent status updates.

## DevOps flow
Developer change → Git → GitHub → Jenkins → Build/Test → Docker Image → Docker Container.

## Important terms
- Git: version control system.
- GitHub: remote Git repository hosting platform.
- Jenkins: automation server.
- Jenkinsfile: pipeline-as-code file.
- Docker image: packaged template for an application.
- Docker container: running instance of an image.
- CI: automated build/test integration.
- CD: automated delivery/deployment.

## Demo questions
**Why is this a DevOps project?** Because the application is maintained in source control and passed through an automated Jenkins pipeline that builds, tests, packages, and deploys it with Docker.

**Why is H2 used?** To keep the friend/demo copy easy to run without requiring a separate MySQL server. It can later be changed to MySQL for a production-style setup.
