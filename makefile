#!@ Author: Nguyễn Tiến Tài.
#! Description: Make run auto service all.
#!@ Created_At : 20-12-2022.
#!@ Update_At: 28-12-2022,22-01-2023,10-03-2023,12-03-2023,13-03-2023

###################! Define variables ###################!

# FOLDER
SEND_EMAIL_FOLDER=server-send-email-student
MEDIA_FOLDER=server-media-service
BACKEND_FOLDER=backend-manager-student


# INCLUDE FORDER
include ./${SEND_EMAIL_FOLDER}/.env
include ./${MEDIA_FOLDER}/.env
include ./${BACKEND_FOLDER}/.env

# CONTAINER
CONTAINER_STUDENT=server_user_api
CONTAINER_ADMIN=server_admin_api
CONTAINER_CRON=cron_job
CONTAINER_EMAIL=send_email_student
CONTAINER_MEDIA=upload-api
CONTAINER_POSGREQL=postgresql
CONTAINER_REDIS_MASTER=redis-master
CONTAINER_REDIS_SLAVE=redis-slave
CONTAINER_NGINX=nginx_libary_school

# ALL CONTAINER
CONTAINERS = ${CONTAINER_STUDENT} ${CONTAINER_ADMIN} ${CONTAINER_EMAIL} ${CONTAINER_MEDIA} ${CONTAINER_CRON} ${CONTAINER_NGINX} ${CONTAINER_POSGREQL} ${CONTAINER_REDIS_MASTER} ${CONTAINER_REDIS_SLAVE}

# EVIRONMENT_SHELL
EVIRONMENT_SHELL=sh bash

# LIMT LOGS
NUMBER_LOGS=100


# TAKE VARIABLE FROM .env
POSTGRES_VARS = PASSWORD=$$(grep -oP 'POSTGRES_PASSWORD=\K(.*)' ./${BACKEND_FOLDER}/.env); \
				USER_NAME=$$(grep -oP 'POSTGRES_USER=\K(.*)' ./${BACKEND_FOLDER}/.env); \
				POSTGRES_HOST=$$(grep -oP 'POSTGRES_HOST=\K(.*)' ./${BACKEND_FOLDER}/.env); \
				POSTGRES_DB=$$(grep -oP 'POSTGRES_DB=\K(.*)' ./${BACKEND_FOLDER}/.env); \
				
# DATE TODAY
TODAY := $(shell date +%Y%m%d)

# Tạo tên file mới
EXPORT_NEW_FILE := $(TODAY)_libary_school_main.sql

###################! CHECK DATA ###################

check-variable:
	$(POSTGRES_VARS) \
		if [ -z "$$PASSWORD" -o -z "$$USER_NAME" -o -z "$$POSTGRES_HOST" -o -z  "$$POSTGRES_DB" ]; then \
				echo "One or more variables are not set: PASSWORD=$$PASSWORD USER_NAME=$$USER_NAME POSTGRES_HOST=$$POSTGRES_HOST POSTGRES_DB=$$POSTGRES_DB"; \
			exit 1; \
		fi; \
		echo "VARIABLES PASSWORD :::: $$PASSWORD"; \
		echo "VARIABLES USER_NAME :::: $$USER_NAME"; \
		echo "VARIABLES POSTGRES_HOST :::: $$POSTGRES_HOST"; \
		echo "VARIABLES POSTGRES_DB :::: $$POSTGRES_DB"

###################! SETTING HUSKY ###################

# Not file pre-commit 
install-husky:
	npm i -D
	husky install

# But have to configure husky again
install-dev:
	npm i -D
	npx husky-init

###################!DOCKER ###################

# Go to volume root container
# Example: make docker-root-target-server_user_api sh
docker-root-target-%:
	@if [ "$(filter $*, $(CONTAINERS))" != "$*" ]; then \
		echo "Invalid target '$*'. Please specify a valid container name." >&2; \
	else \
		docker exec -it $* $(filter-out $@,$(MAKECMDGOALS)) $(filter $*, $(EVIRONMENT_SHELL)); \
	fi

# Go to logs container
# Example: make docker-logs-target-server_user_api
docker-logs-target-%:
	@echo $(CONTAINERS)
	@if [ "$(filter $*, $(CONTAINERS))" != "$*" ]; then \
		echo "Invalid target '$*'. Please specify a valid container name." >&2; \
	else \
		docker logs -f  $(filter-out $@,$(MAKECMDGOALS)) $(filter $*, $(CONTAINERS)) --tail ${NUMBER_LOGS}; \
	fi

# Check effect container
# Example: make docker-stats-target-*
docker-stats-target-%:
	@docker stats $(filter-out $@,$(MAKECMDGOALS)) $(filter $*, $(CONTAINERS))
	
# Check inspect container
# Example: make docker-inspect-target-server_user_api
docker-inspect-target-%:
	@echo $(CONTAINERS)
	@if [ "$(filter $*, $(CONTAINERS))" != "$*" ]; then \
		echo "Invalid target '$*'. Please specify a valid container name." >&2; \
	else \
		docker inspect $(filter-out $@,$(MAKECMDGOALS)) $(filter $*, $(CONTAINERS)); \
	fi;

# Export DB
docker-export-db-posgresql:
	$(POSTGRES_VARS) \
		if [ -z "$$PASSWORD" -o -z "$$USER_NAME" -o -z "$$POSTGRES_HOST" -o -z  "$$POSTGRES_DB" ]; then \
			echo "One or more variables are not set: PASSWORD=$$PASSWORD USER_NAME=$$USER_NAME POSTGRES_HOST=$$POSTGRES_HOST POSTGRES_DB=$$POSTGRES_DB"; \
			exit 1; \
		fi; \
		docker exec -it ${CONTAINER_POSGREQL} bash -c "\
			cd docker-entrypoint-initdb.d && \
    			if [ -e $$EXPORT_NEW_FILE ] && [ -f $$EXPORT_NEW_FILE ]; then \
    				rm -rf $(EXPORT_NEW_FILE); \
       				echo \"File exists and is a regular file\"; \
    			else \
    			    echo \"File does not exist\"; \
    			fi; \
				 	PGPASSWORD=$${PASSWORD} pg_dump -U $${USER_NAME} --format=p --file=$(EXPORT_NEW_FILE) --dbname=$${POSTGRES_DB} --no-owner --no-privileges -w"

# import DB
docker-import-db-posgresql:
	$(POSTGRES_VARS) \
		if [ -z "$$PASSWORD" -o -z "$$USER_NAME" -o -z "$$POSTGRES_HOST" -o -z  "$$POSTGRES_DB" ]; then \
			echo "One or more variables are not set: PASSWORD=$$PASSWORD USER_NAME=$$USER_NAME POSTGRES_HOST=$$POSTGRES_HOST POSTGRES_DB=$$POSTGRES_DB"; \
			exit 1; \
		fi; \
		docker exec -it ${CONTAINER_POSGREQL} bash -c "\
			cd docker-entrypoint-initdb.d && \
				if [ -e $$EXPORT_NEW_FILE ] && [ -f $$EXPORT_NEW_FILE  ]; then \
					PGPASSWORD=$${PASSWORD} psql -h $${POSTGRES_HOST} -U $${USER_NAME} -d $${POSTGRES_DB} -a -f $(EXPORT_NEW_FILE); \
       				echo \"Import file success!!\"; \
    			else \
    			    echo \"Import file fail!!!\"; \
				fi;"

###################!DEVELOPER ###################

###################! SETTING DOCKER BUILD FILE CHANGE AND BACKGROUND (DEAMON)  ###################
# Run Server Email And Build
run-send-email-build:
	cd ${SEND_EMAIL_FOLDER} && \
		make run-email

# Run Server media And Build
run-media-build:
	cd ${MEDIA_FOLDER} && \
		make run-media

# Run Server Main And Build
run-backend-build:
	cd ${BACKEND_FOLDER} && \
		make run-backend
	
# Run All Server And Build
run-all-build:
	make run-send-email-build && \
		make run-media-build && \
			make run-backend-build

###################! RUN AUTO BACKGROUND (DEAMON) DOCKER  ###################
# Define variables
APP_TARGET_DEAMON := stg-dev
define run_container_dev
	cd $1 && \
	make $(APP_TARGET_DEAMON)
endef

# Run Server Email 
run-send-email:
	$(call run_container_dev, ${SEND_EMAIL_FOLDER})

# Run Server media 
run-media:
	$(call run_container_dev, ${MEDIA_FOLDER})

# Run Server Main 
run-backend:
	$(call run_container_dev, ${BACKEND_FOLDER})

run-all-dev: 
	@make run-send-email 
	@make run-media 
	@make run-backend

###################! RUN AUTO DOWN CONTAINER DOCKER  ##########################
# Define variables
APP_TARGET_DOWN := run-devdown
define down_container_dev
	cd $1 && \
	make $(APP_TARGET)
endef
# Run Down Container Server Email 
run-send-email-dev-down:
	$(call down_container_dev, ${SEND_EMAIL_FOLDER})

# Run Down Container Server media 
run-media-dev-down:
	$(call down_container_dev, ${MEDIA_FOLDER})

# Run Down Container Server Main 
run-backend-dev-down:
	$(call down_container_dev, ${BACKEND_FOLDER})

# Run Down Container All Server
run-all-dev-down:
	make run-backend-dev-down && \
		make run-send-email-dev-down && \
			make run-media-dev-down


###################################### !PRODUCTION ######################################

###################! RUN BUILD AUTO BACKGROUND (DEAMON) DOCKER  ###################

# Run service email
run-build-live-email:
	cd ${SEND_EMAIL_FOLDER} && \
		make run-live-email

# run service media 
run-build-live-media:
	cd ${MEDIA_FOLDER} && \
		make run-live-media

# run service backend
run-build-live-backend:
	cd ${BACKEND_FOLDER} && \
		make run-live-backend

# Run All Service
run-all-build-live-service:
	make run-build-live-email && \
		make run-build-live-media && \
			make run-build-live-backend && \

###################! RUN AUTO BACKGROUND (DEAMON) DOCKER  ###################
# Define variables
APP_TARGET_DEAMON_LIVE := run-devdown
define run_container_live
	cd $1 && \
	make $(APP_TARGET_DEAMON_LIVE)
endef
# Run service email
run-live-email:
	$(call run_container_live, ${SEND_EMAIL_FOLDER})

# run service media 
run-live-media:
	$(call run_container_live, ${MEDIA_FOLDER})

# run service backend
run-live-backend:
	$(call run_container_live, ${BACKEND_FOLDER})

# Run All Service
run-all-live-service:
	@make run-live-email
	@make run-live-media
	@make run-live-backend

##############! RUN AUTO DOWN CONTAINER DOCKER  #####################

# Down service email
run-down-live-email:
	cd ${SEND_EMAIL_FOLDER}&& \
		make run-down-live-email

# Down service media 
run-down-live-media:
	cd ${MEDIA_FOLDER} && \
		make run-down-live-media

# Down service backend
run-down-live-backend:
	cd ${BACKEND_FOLDER} && \
		make run-down-live-backend

# Down all service  
run-down-all-live-service:
	make run-down-live-email && \
		make run-down-live-media && \
			make run-down-live-backend && \
