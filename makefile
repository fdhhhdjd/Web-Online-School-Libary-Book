#!@ Nguyen Tien Tai
#!@ Created_At : 20-12-2022
#!@ Update_At: 28-12-2022

# Not file pre-commit 
install-husky:
	npm i -D
	husky install

# but have to configure husky again
install-dev:
	npm i -D
	npx husky-init

# Run server main
run-backend:
	cd backend-manager-student && \
	make run-dev

# Run Server Email
run-sendemail:
	cd server-send-email-student && \
	make run-dev

# Run Server media
run-media:
	cd server-media-service && \
	docker-compose up -d --build

# Run Network
run-network:
	docker network create server-send-email-student_sendemail
	docker network create server-media-service_upload-network

# Run all server
run-all:
	cd backend-manager-student && \
	docker-compose up -d --build
	cd server-send-email-student && \
	docker-compose up -d --build
	cd server-media-service && \
	docker-compose up -d --build
	