```groovy
pipeline {
    agent any

    tools {
        maven 'Maven-3.10.0'
    }

    triggers {
        pollSCM('* * * * *')
    }

    stages {
        stage('Build & Test') {
            steps {
                echo 'Building CampusFix...'

                bat '''
                    cd backend
                    mvn clean test
                '''
            }
        }

        stage('Docker Build') {
            steps {
                echo 'Building CampusFix Docker Image...'

                bat '''
                    cd backend
                    docker build -t campusfix-backend:latest .
                    docker images campusfix-backend
                '''
            }
        }
    }

    post {
        success {
            echo 'CampusFix Build, Test and Docker Image completed successfully!'
        }

        failure {
            echo 'CampusFix Pipeline Failed!'
        }
    }
}
```git 