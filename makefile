#!@ Author: Nguyễn Tiến Tài.
#! Description: Make run auto service all.
#!@ Created_At : 20-12-2022.
#!@ Update_At: 28-12-2022.

###################! SETTING HUSKY ###################
# Not file pre-commit 
install-husky:
	npm i -D
	husky install

# But have to configure husky again
install-dev:
	npm i -D
	npx husky-init

###################! SETTING DOCKER BUILD FILE CHANGE AND BACKGROUND (DEAMON)  ###################
# Run Server Email And Build
run-send-email-build:
	cd server-send-email-student && \
	make run-email

# Run Server media And Build
run-media-build:
	cd server-media-service && \
	make run-media

# Run Server Main And Build
run-backend-build:
	cd backend-manager-student && \
	make run-backend
	

# Run All Server And Build
run-all-build:
	make run-send-email-build
	make run-media-build
	make run-backend-build

###################! RUN AUTO BACKGROUND (DEAMON) DOCKER  ###################
# Run Server Email 
run-send-email:
	cd server-send-email-student && \
	make stg

# Run Server media 
run-media:
	cd server-media-service && \
	make stg

# Run Server Main 
run-backend:
	cd backend-manager-student && \
	make stg

# Run All Server
run-all:
	make run-send-email
	make run-media
	make run-backend

###################! RUN AUTO DOWN CONTAINER DOCKER  ##########################
# Run Down Container Server Email 
run-send-email-down:
	cd server-send-email-student && \
	make devdown

# Run Down Container Server media 
run-media-down:
	cd server-media-service && \
	make devdown

# Run Down Container Server Main 
run-backend-down:
	cd backend-manager-student && \
	make devdown

# Run Down Container All Server
run-all-down:
	make run-backend-down
	make run-send-email-down
	make run-media-down