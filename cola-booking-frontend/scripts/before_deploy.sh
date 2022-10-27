# !/bin/bash

echo "BeforeDeploy [1/1] - Preparing SSH client + credentials before deployment to remote server"
# Install SSH client
apk --update add openssh-client
eval $(ssh-agent -s)
# Set the SSH PEM key to connect to the remote server (AWS EC2 instance)
mkdir -p ~/.ssh
chmod 700 ~/.ssh
echo -e "$AWS_PEM_KEY" > ~/.ssh/$OWNER.pem
# Sets the permission to 600 on PEM file to prevent a usual problem with AWS saying that it’s too unprotected.
chmod 600 ~/.ssh/$OWNER.pem
touch ~/.ssh/config
echo -e "Host *\n\tStrictHostKeyChecking no\n\n" > ~/.ssh/config