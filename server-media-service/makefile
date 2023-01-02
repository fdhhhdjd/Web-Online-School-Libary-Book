#!@ Author: Nguyễn Tiến Tài.
#! Description: Make run auto service Media
#!@ Created_At : 20-12-2022.
#!@ Update_At: 02-01-2023.

## Watch Container Active
default:
	docker ps

## Down Container
devdown:
	docker-compose -f docker-compose.yml down

## Run Container Backgroud (Deamon)
stg:
	docker-compose up -d

## Run Container Backgroud (Deamon) and Build Container
run-media:
	docker-compose up -d --build

## Run Container Backgroud (Deamon) and Build Container  && Run File docker-compose.yml
run-dev:
	docker-compose up -d --build
	docker-compose -f docker-compose.yml up -d --build