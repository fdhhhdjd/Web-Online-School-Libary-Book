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

	