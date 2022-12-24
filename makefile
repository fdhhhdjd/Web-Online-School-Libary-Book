#!@ Nguyen Tien Tai

# Not file pre-commit 
install-husky:
	npm i -D
	husky install

# but have to configure husky again
install-dev:
	npm i -D
	npx husky-init
	