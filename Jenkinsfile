pipeline {
    agent any
    triggers { pollSCM('* * * * *') }
    stages {
        stage('Build & Test') {
            steps {
                bat 'docker build --target builder -t campusfix-build:latest backend'
                bat 'docker run --rm campusfix-build:latest mvn -q test'
            }
        }
        stage('Docker Build') {
            steps { bat 'docker build -t campusfix-backend:latest backend' }
        }
        stage('Deploy') {
            steps {
                bat 'docker rm -f campusfix-backend 2>nul || exit /b 0'
                bat 'docker run -d --name campusfix-backend -p 8082:8090 campusfix-backend:latest'
            }
        }
    }
    post {
        success { echo 'CampusFix build, test, image and deployment completed successfully!' }
        failure { echo 'CampusFix pipeline failed.' }
    }
}
