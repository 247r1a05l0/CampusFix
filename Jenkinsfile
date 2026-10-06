pipeline {
    agent any

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