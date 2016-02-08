/**
 * Creates a typescript definition file based on a swagger (v2.0) definition
 *
 * @param root
 * @returns {string}
 */
export default function createTypescriptDefinitions(root) {

  const deref = obj => {
    let selectors = obj['$ref'].split('/');
    selectors.shift();

    return selectors.reduce((last, cur) => last[cur], root);
  };

  const objectDef = object => {
    return '{\n' + Object.keys(object.properties).map(propertyName => {
        const property = object.properties[propertyName];
        return `${propertyName} : ${typeDefiniton(property)}`;
      }).join('\n') + '\n}';
  };

  const arrayDef = object => {
    return typeDefiniton(object.items);
  };

  const typeDefiniton = obj => {
    if (obj['$ref']) return typeDefiniton(deref(obj));
    if (obj.schema) return typeDefiniton(obj.schema);

    switch (obj.type) {
      case 'object':
        return objectDef(obj);
      case 'string':
        return `string;`;
      case 'number':
        return `number;`;
      case 'boolean':
        return `boolean;`;
      case 'file':
        return `File;`;
      case 'array':
        return arrayDef(obj) + '[];';
      default:
        throw new Error(`type ${obj.type} not expected, ${JSON.stringify(obj, null, ' ')}`)
    }
  };

  const modelDefinitions =
  Object.keys(root.definitions).map(definitionName => {
    const definition = root.definitions[definitionName];

    switch (definition.type) {
      case 'object': return `export interface ${definitionName} ${typeDefiniton(definition)}`;
      case 'array': return `export interface ${definitionName} extends Array<${arrayDef(definition)}> {}`;
      default: throw new Error(`type ${obj.type} not supported in interface`);
    }

  }).join('\n');

  const parameterDefinition = obj => {
    return obj.name + ' : ' + typeDefiniton(obj)
  };

  const pathDefinitons =
    Object.keys(root.paths).map(pathName => {
      const path = root.paths[pathName];

      return Object.keys(path).map(methodName => {
        const method = path[methodName];
        let operationId = method.operationId;
        operationId = operationId.charAt(0).toUpperCase() + operationId.slice(1);

        const definition = method.parameters.map(param => parameterDefinition(param)).join('\n');

        return `export interface ${operationId}Parameters {\n${definition}}`;
      }).join('\n');
    }).join('\n');


  return [modelDefinitions, pathDefinitons].join('\n');
}

// started with `$ node <FILENAME>`
if (require.main === module) {

  if (process.argv.length < 3) {
    console.error(`Error Usage: ${process.argv[1]} ./swagger-file.json`);
  } else {
    let swagger = require(process.argv[2]);
    console.log(createTypescriptDefinitions(swagger));
  }

}


