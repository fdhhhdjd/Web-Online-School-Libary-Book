#!@ Author: Nguyễn Tiến Tài.
#! Description: Make run auto service Main.
#!@ Created_At : 20-12-2022.
#!@ Update_At: 02-01-2023.
#!@ Update_At_2: 16-01-2023, 12-03-2023.

###################! Define variables ###################!

# FILE DOCKER COMPOSE
DOCKER_COMPOSE_DEV=docker-compose-dev.yml
DOCKER_COMPOSE_PRO=docker-compose.yml

###################################### !GENERAL ######################################

## Watch Container Active
default:
	docker ps

## Run Container Backgroud (Deamon)
stg-dev:
	docker-compose -f ${DOCKER_COMPOSE_DEV} up -d

stg-prod:
	docker-compose -f ${DOCKER_COMPOSE_PRO} up -d
	
###################################### !DEVELOPER ######################################

## Down Container 
run-devdown:
	docker-compose -f ${DOCKER_COMPOSE_DEV} down

## Run Container Backgroud (Deamon) and Build Container
run-backend:
	docker-compose -f ${DOCKER_COMPOSE_DEV} up -d --build

###################################### !PRODUCTION ######################################

## Down Container 
run-down-live-backend:
	docker-compose -f ${DOCKER_COMPOSE_PRO} down

## Run Container Backgroud (Deamon) and Build Container  && Run File docker-compose.yml
run-live-backend:
	docker-compose -f ${DOCKER_COMPOSE_PRO} up -d --build