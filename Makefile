install:
	npm ci
start:
	bin/gendiff.js -h
publish:
	npm publish --access=public
lint:
	npx eslint .
test:
	npm test
test-coverage:
	npm test -- --coverage --coverageProvider=v8

.PHONY: test
