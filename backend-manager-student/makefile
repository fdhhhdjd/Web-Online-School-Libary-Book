#!@ Nguyen Tien Tai

default:
	docker ps

devdown:
	docker-compose -f docker-compose.yml down

stg:
	docker-compose up -d
run-dev:
	docker-compose up -d --build
	docker-compose -f docker-compose.yml up -d --build