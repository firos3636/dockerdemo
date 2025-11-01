pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        DOCKER_IMAGE = "firosop3636/nodejs-demo"
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
                    sh 'docker build -t $DOCKER_IMAGE:latest .'
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
                    sh 'docker run -d -p 3000:3000 --name nodejs-demo $DOCKER_IMAGE:latest'
                }
            }
        }

        stage('Push Image to Docker Hub') {
            steps {
                script {
                    sh '''
                        echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin
                        docker push $DOCKER_IMAGE:latest
                    '''
                }
            }
        }
    

     stage('Deploy to Kubernetes') {
            steps {
                script {
                   withCredentials([string(credentialsId: 'kubeconfig', variable: 'KUBECONFIG_CONTENT')]) {
                writeFile file: 'kubeconfig', text: "${KUBECONFIG_CONTENT}"
                sh '''
                        echo "Deploying application to Kubernetes..."
                        kubectl apply -f deployment.yaml
                        kubectl apply -f service.yaml
                      '''
                }
            }
         }
      }
   }
}    
