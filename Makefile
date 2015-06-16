# Makefile for easy testing

test: all

all: test-asciiTree \
	test-middleware \
	test-rack

test-asciiTree:
	@./node_modules/.bin/mocha --compilers js:babel/register --reporter spec --slow 500 --timeout 2000 test/spec/asciiTree.spec.js

test-middleware:
	@./node_modules/.bin/mocha --compilers js:babel/register --reporter spec --slow 500 --timeout 2000 test/spec/middleware.spec.js

test-rack:
	@./node_modules/.bin/mocha --compilers js:babel/register --reporter spec --slow 500 --timeout 2000 test/spec/rack.spec.js

.PHONY: test
