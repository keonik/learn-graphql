####################################################################################
# This makefile is intended to run on the Mile Two network (your PC)
####################################################################################
define help_instructions
	@echo "Misc tags:"
	@echo "  help       Display this help text"
	@echo ""	
	@echo "Dev tags:"
	@echo "  clear-system       	Prune docker containers, images, and volumes"
	@echo "  clear-volumes      	Prune docker volumes"
	@echo "  build      			Build the dev containers"
	@echo "  down       			Compose down the dev sandbox"
	@echo "  up         			Compose up a development sandbox.  You must run docker login first."
	@echo "  migration-run   		Runs the migrations for Oracle. Docker stack must be running"
	@echo "  migration-generate 	Generates a migration file. Accepts arg name where name will be the filename."
	@echo "	 						Syntax is make name=FileName generateMigration. Docker stack must be running"
	@echo "  migration-create  		Creates an empty migration"
	@echo "  migration-revert  		Rolls back one migration"
	@echo "  database-seed  		Add random data to models"
	@echo "  database-drop  		Drops all database tables"
	@echo "  database-init  		Drops all tables, runs migrations, then seeds data"
	@echo "********" 	
endef

help:
	$(call help_instructions)

clear-system:
	docker container prune --force
	docker system prune -a -f

clear-volumes:
	docker volume prune -f

build: 
	docker-compose build

down:
	docker-compose down

up:
	make install
	docker-compose up

migration-run:
	docker exec learn-graphql-api npm run migration:run

migration-generate:
	docker exec learn-graphql-api npm run migration:generate -- -n $(name)

migration-revert:
	docker exec learn-graphql-api npm run migration:revert

migration-create:
	docker exec learn-graphql-api npm run migration:create -- -n $(name)

database-seed:
	docker exec learn-graphql-api npm run database:seed

database-drop:
	docker exec learn-graphql-api npm run database:drop

database-init:
	docker exec learn-graphql-api npm run database:drop
	sleep 3
	docker exec learn-graphql-api npm run migration:run
	sleep 3
	docker exec learn-graphql-api npm run database:seed

install:
	cd api && npm install
	cd ui && npm install