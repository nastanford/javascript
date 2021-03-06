var assert = require("assert");
var homogenius = require('../homogenius.js').homogenius;


//sample JSON to test
var sample_json = [{ key1: 1, key2: 'hello', key3: true },
                   { key1: 4, key2: 'world', key3: false },
                   { key1: 7, key2: 'hello', key3: false },
                   { key1: 5, key2: 'world', key3: true }];

//sample JSON to test
var sample_nested_json = [{ key1: 1, key2: { nested_key1: 'hello', nested_key2: true }, key3: 'hello' },
                          { key1: 4, key2: { nested_key1: 'world', nested_key2: false }, key3: 'world' },
                          { key1: 7, key2: { nested_key1: 'hello', nested_key2: true }, key3: 'hello' },
                          { key1: 4, key2: { nested_key1: 'world', nested_key2: false }, key3: 'world' }];

describe('keys', function () {
  it('should be the same as JSON object', function () {
    assert.deepEqual([{'key1': 2}, {'key2': 1}, {'key3': 3}], homogenius().pack(sample_json)[0]);
  });

  it('should extract from JSON object.', function () {
    assert.equal(3, homogenius().pack(sample_json)[0].length);
  });

  it('should be the same as nested JSON object', function() {
    assert.deepEqual([{'key1': 2}, {'key2': [{'nested_key1': 1}, {'nested_key2': 3}]}, {'key3': 1}], homogenius().pack(sample_nested_json)[0]);
  });

  it('should extract nested keys from JSON object', function() {
    assert.equal(3, homogenius().pack(sample_nested_json)[0].length);
  });

  it('should extract keys with manual schema', function() {
    assert.equal(2, homogenius().setSchema([{'key1': 2}, {'key2': 1}]).pack(sample_json)[0].length);
  });

  it('should be the same with manual schema', function() {
    assert.deepEqual([{'key1': 2}, {'key2': 1}], homogenius().setSchema([{'key1': 2}, {'key2': 1}]).pack(sample_json)[0]);
  });
});

describe('pack/unpack', function () {
  it('should work with objects and manual schema', function () {
    assert.deepEqual(homogenius().setSchema([{'key1':2}, {'key2':1}, {'key3':3}]).unpack(homogenius().pack(sample_json)), sample_json);
  });

  it('should work with nested objects and manual schema', function () {
    assert.deepEqual(homogenius().setSchema([{'key1':2}, {'key2':0}, {'key3':1}]).unpack(homogenius().pack(sample_nested_json)), sample_nested_json);
  });

  it('should work with objects', function () {
    assert.deepEqual(homogenius().unpack(homogenius().pack(sample_json)), sample_json);
  });

  it('should work with nested objects', function () {
    assert.deepEqual(homogenius().unpack(homogenius().pack(sample_nested_json)), sample_nested_json);
  });
});
