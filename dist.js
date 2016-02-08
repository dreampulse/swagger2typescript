#!/usr/bin/env node
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createTypescriptDefinitions;


/**
 * Creates a typescript definition file based on a swagger (v2.0) definition
 *
 * @param root
 * @returns {string}
 */
function createTypescriptDefinitions(root) {

  var referenceDef = function referenceDef(obj) {
    return obj['$ref'].split('/')[2];
  };

  var objectDef = function objectDef(object) {
    return '{\n' + Object.keys(object.properties).map(function (propertyName) {
      var property = object.properties[propertyName];
      return propertyName + ' : ' + typeDefiniton(property) + ';';
    }).join('\n') + '\n}';
  };

  var arrayDef = function arrayDef(object) {
    return typeDefiniton(object.items);
  };

  var typeDefiniton = function typeDefiniton(obj) {
    if (obj['$ref']) return referenceDef(obj);
    if (obj.schema) return typeDefiniton(obj.schema);

    switch (obj.type) {
      case 'object':
        return objectDef(obj);
      case 'string':
        return 'string';
      case 'number':
        return 'number';
      case 'boolean':
        return 'boolean';
      case 'file':
        return 'File';
      case 'array':
        return arrayDef(obj) + '[]';
      default:
        throw new Error('type ' + obj.type + ' not expected, ' + JSON.stringify(obj, null, ' '));
    }
  };

  var modelDefinitions = Object.keys(root.definitions).map(function (definitionName) {
    var definition = root.definitions[definitionName];

    switch (definition.type) {
      case 'object':
        return 'export interface ' + definitionName + ' ' + typeDefiniton(definition);
      case 'array':
        return 'export interface ' + definitionName + ' extends Array<' + arrayDef(definition) + '> {}';
      default:
        throw new Error('type ' + obj.type + ' not supported in interface');
    }
  }).join('\n\n');

  var parameterDefinition = function parameterDefinition(obj) {
    return obj.name + ' : ' + typeDefiniton(obj);
  };

  var pathDefinitons = Object.keys(root.paths).map(function (pathName) {
    var path = root.paths[pathName];

    return Object.keys(path).map(function (methodName) {
      var method = path[methodName];
      var operationId = method.operationId;
      operationId = operationId.charAt(0).toUpperCase() + operationId.slice(1);

      var definition = method.parameters.map(function (param) {
        return parameterDefinition(param) + ';';
      }).join('\n');

      return '// ' + method.summary + '\nexport interface ' + operationId + 'Parameters {\n' + definition + '}';
    }).join('\n\n');
  }).join('\n\n');

  return [modelDefinitions, pathDefinitons].join('\n');
}

// started with `$ node <FILENAME>`
if (require.main === module) {

  if (process.argv.length < 3) {
    console.error('Error Usage: ' + process.argv[1] + ' ./swagger-file.json');
  } else {
    var swagger = require(process.argv[2]);
    console.log(createTypescriptDefinitions(swagger));
  }
}

