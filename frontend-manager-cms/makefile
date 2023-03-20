#!@ Author: Nguyễn Tiến Tài.
#! Description: Make run frontend Manager.
#!@ Created_At : 12-03-2023.
#!@ Update_At: 13-03-2023, 18-03-2023, 20-03-2023

# Folder node_modules
NODE_MODULES=node_modules


run-default:
	echo "ITC Libary manager"

# Run Frontend dev
run-dev:
	npm run dev

# Run install node_module
run-install:
	if test -d $(NODE_MODULES); then \
      echo "Node modules already installed"; \
      exit 1; \
	else \
      echo "Preparing to install..."; \
      npm install; \
      echo "Done install."; \
	fi

# Del node_modules
run-clean:
	if test -d $(NODE_MODULES); then \
      echo "Start remove node_modules..."; \
      rm -rf $(NODE_MODULES); \
      echo "Remove Done install."; \
      exit 1; \
	else \
      echo "Folder node_modules already not exist."; \
	fi

# example: make run-library-dev husky prettier lint-staged
run-library-dev:
	npm install --d $* $(filter-out $@,$(MAKECMDGOALS))

check-libary:
	@for lib in $(filter-out $@,$(MAKECMDGOALS)); do \
		if [ "`npm list --depth=0 $$lib | grep $$lib`" = "" ]; then \
			echo "Start instal $$lib" ; \
      npm install --save $$libl ; \
		else \
			echo "Library $$lib already installed"; \
		fi \
	done
	@echo "All libraries installed"
	@exit 0

# Run install library
# example: make run-library axios react-router-dom
run-library:
	make check-libary $(filter-out $@,$(MAKECMDGOALS))

# Run build
run-build:
	npm run build

# Run Production
run-product:
	npm start

