install:
	npm ci --production
	npm link
help:
	gendiff.js -h
publish:
	npm publish --dry-run
lint:
	npx eslint .
test:
	npm test
test-coverage:
	npm test -- --coverage --coverageProvider=v8
commit:
	$(VAR)
	git add .
	git status
	git commit -m '$(name)'

.PHONY: test
