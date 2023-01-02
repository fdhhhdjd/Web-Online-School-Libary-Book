#!@ Author: Nguyễn Tiến Tài.
#! Description: Make run auto service all.
#!@ Created_At : 20-12-2022.
#!@ Update_At: 28-12-2022.

# Not file pre-commit 
install-husky:
	npm i -D
	husky install

# but have to configure husky again
install-dev:
	npm i -D
	npx husky-init

# Run Server Email
run-sendemail:
	cd server-send-email-student && \
	make run-email

# Run Server media
run-media:
	cd server-media-service && \
	make run-media

# Run Server Main 
run-backend:
	cd backend-manager-student && \
	make run-backend

# Run all server
run-all:
	make run-sendemail
	make run-media
	make run-backend