pipeline {
    agent any
    environment {
    DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
}

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/firos3636/dockerdemo.git'
            }
        }
       

        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t nodejs-demo:latest .'
                }
            }
        } 
        

        stage('Run Docker Container') {
            steps {
                script {
                    // Stop old container if running
                    sh 'docker stop nodejs-demo || true'
                    sh 'docker rm nodejs-demo || true'

                    // Run new container
                     sh 'docker run -d -p 3000:3000 --name nodejs-demo nodejs-demo'
                }
            }
        }
        
            stage('Push Image to Docker Hub') {
    steps {
        sh '''
            echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin
            docker push nodejs-demo:latest
        '''
         }
      }
   }
}    
