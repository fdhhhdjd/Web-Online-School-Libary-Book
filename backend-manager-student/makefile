#!@ Author: Nguyễn Tiến Tài.
#! Description: Make run auto service Main.
#!@ Created_At : 20-12-2022.
#!@ Update_At: 02-01-2023.
#!@ Update_At_2: 16-01-2023.

###################################### !GENERAL ######################################

## Watch Container Active
default:
	docker ps

## Run Container Backgroud (Deamon)
stg-dev:
	docker-compose -f docker-compose-dev.yml up -d

stg-prod:
	docker-compose -f docker-compose.yml up -d
	
###################################### !DEVELOPER ######################################

## Down Container 
run-devdown:
	docker-compose -f docker-compose-dev.yml down

## Run Container Backgroud (Deamon) and Build Container
run-backend:
	docker-compose -f docker-compose-dev.yml up -d --build

###################################### !PRODUCTION ######################################

## Down Container 
run-down-live-backend:
	docker-compose -f docker-compose.yml down

## Run Container Backgroud (Deamon) and Build Container  && Run File docker-compose.yml
run-live-backend:
	docker-compose -f docker-compose.yml up -d --build