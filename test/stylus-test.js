/* global describe, it */

'use strict';

var fs = require('fs'),
    path = require('path'),
    stylus = require('stylus'),
    assert = require('assert');

var fixturePath = 'test/fixtures/';
var expectedPath = 'test/expected';

function fixture(type, name) {
    return fs.readFileSync(path.join(fixturePath, type, name + '.styl'), 'utf8');
}

function expected(type, name) {
    return fs.readFileSync(path.join(expectedPath, type, name + '.css'), 'utf8');
}

function run(type, name) {
    stylus(fixture(type, name))
        .import(path.join('lib', type))
        .render(function(err, css) {
            if (err) {
                throw err;
            }
            assert.equal(css, expected(type, name));
        });
}

describe('Stylus functions', function() {
    it('should compile headings function', function() {
        run('functions', 'headings');
    });
});

describe('Stylus mixins', function() {
    it('should compile arrow-box mixin', function() {
        run('mixins', 'arrow-box');
    });

    it('should compile font-face mixin', function() {
        run('mixins', 'font-face');
    });

    it('should compile gradient-fallback mixin', function() {
        run('mixins', 'gradient-fallback');
    });

    it('should compile hide-text mixin', function() {
        run('mixins', 'hide-text');
    });

    it('should compile link-colors mixin', function() {
        run('mixins', 'link-colors');
    });

    it('should compile placeholder-color mixin', function() {
        run('mixins', 'placeholder-color');
    });
});

describe('Stylus placeholders', function() {
    it('should compile clr placeholder', function() {
        run('placeholders', 'clr');
    });

    it('should compile user-content placeholder', function() {
        run('placeholders', 'user-content');
    });
});