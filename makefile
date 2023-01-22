#!@ Author: Nguyễn Tiến Tài.
#! Description: Make run auto service all.
#!@ Created_At : 20-12-2022.
#!@ Update_At: 28-12-2022,22-01-2023

###################################### !DEVELOPER ######################################

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
	make stg-dev

# Run Server media 
run-media:
	cd server-media-service && \
	make stg-dev

# Run Server Main 
run-backend:
	cd backend-manager-student && \
	make stg-dev

# Run All Server
run-all-dev:
	make run-send-email
	make run-media
	make run-backend

###################! RUN AUTO DOWN CONTAINER DOCKER  ##########################
# Run Down Container Server Email 
run-send-email-dev-down:
	cd server-send-email-student && \
	make run-devdown

# Run Down Container Server media 
run-media-dev-down:
	cd server-media-service && \
	make run-devdown

# Run Down Container Server Main 
run-backend-dev-down:
	cd backend-manager-student && \
	make run-devdown

# Run Down Container All Server
run-all-dev-down:
	make run-backend-dev-down
	make run-send-email-dev-down
	make run-media-dev-down

###################################### !PRODUCTION ######################################

###################! RUN BUILD AUTO BACKGROUND (DEAMON) DOCKER  ###################

# Run service email
run-build-live-email:
	cd server-send-email-student && \
	make run-live-email

# run service media 
run-build-live-media:
	cd server-media-service && \
	make run-live-media

# run service backend
run-build-live-backend:
	cd backend-manager-student && \
	make run-live-backend

# Run All Service
run-all-build-live-service:
	make run-build-live-email
	make run-build-live-media
	make run-build-live-backend

###################! RUN AUTO BACKGROUND (DEAMON) DOCKER  ###################
# Run service email
run-live-email:
	cd server-send-email-student && \
	make stg-prod

# run service media 
run-live-media:
	cd server-media-service && \
	make stg-prod

# run service backend
run-live-backend:
	cd backend-manager-student && \
	make stg-prod

# Run All Service
run-all-live-service:
	make run-live-email
	make run-live-media
	make run-live-backend

##############! RUN AUTO DOWN CONTAINER DOCKER  #####################

# Down service email
run-down-live-email:
	cd server-send-email-student && \
	make run-down-live-email

# Down service media 
run-down-live-media:
	cd server-media-service && \
	make run-down-live-media

# Down service backend
run-down-live-backend:
	cd backend-manager-student && \
	make run-down-live-backend

# Down all service  
run-down-all-live-service:
	make run-down-live-email
	make run-down-live-media
	make run-down-live-backend
