# !/bin/bash
set — f

TEMP_FOLDER=tmp/$(date +%s)
PRIVATE_KEY_PEM_FILE=~/.ssh/$OWNER.pem

echo "Deploy [1/3] - Creating temp deployment folder ${TEMP_FOLDER} on remote server"
ssh ec2-user@$SERVER -i $PRIVATE_KEY_PEM_FILE "mkdir -p ${TEMP_FOLDER}"

echo "Deploy [2/3] - Pushing built files to remote server ${SERVER} (private IP)"
tar cf - .env build static node_modules package.json package-lock.json | ssh ec2-user@$SERVER -i $PRIVATE_KEY_PEM_FILE "tar x -C ${TEMP_FOLDER}"

echo "Deploy [3/3] - Replacing previous running version of ${PROCESS_NAME} by the new one on remote server"
ssh ec2-user@$SERVER -i $PRIVATE_KEY_PEM_FILE "pm2 stop $PROCESS_NAME && rm -rf $DEPLOY_PATH && mv ${TEMP_FOLDER} $DEPLOY_PATH && pm2 start $PROCESS_NAME && cd ~ && rm -rf ${TEMP_FOLDER}"
