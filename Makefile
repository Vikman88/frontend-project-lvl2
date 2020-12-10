install:
	npm ci
help:
	bin/gendiff.js -h
publish:
	npm publish --dry-run
lint:
	npx eslint .
test:
	npm test
test-coverage:
	npm test -- --coverage --coverageProvider=v8
commit:
	git add .
	git status
	git commit -m '$(name)'

.PHONY: test
