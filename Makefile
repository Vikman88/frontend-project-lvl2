install:
	npm install
start-stylish:
	npx babel-node src/bin/gendiff.js file5.json file6.json
start-plain:
	npx babel-node src/bin/gendiff.js -f plain file5.json file6.yml
start-json:
	npx babel-node src/bin/gendiff.js -f json file5.yml file6.json	
publish:
	npm publish --dry-run
lint:
	npx eslint .
test:
	npx -n --experimental-vm-modules jest
test-coverage:
	npm test -- --coverage --coverageProvider=v8

.PHONY: test
