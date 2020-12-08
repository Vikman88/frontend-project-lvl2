install:
	npm ci
start:
	bin/gendiff.js -h
start-stylish:
	npx src/bin/gendiff.js file5.json file6.json
start-plain:
	npx src/bin/gendiff.js -f plain file5.json file6.yml
start-json:
	npx src/bin/gendiff.js -f json file5.yml file6.json	
publish:
	npm publish --dry-run
lint:
	npx eslint .
test:
	npm test
test-coverage:
	npm test -- --coverage --coverageProvider=v8

.PHONY: test
