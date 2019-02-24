run:
	docker-compose up -d

build:
	docker-compose build server
	docker-compose up --no-deps -d server