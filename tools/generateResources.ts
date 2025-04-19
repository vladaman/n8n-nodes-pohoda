#!/usr/bin/env ts-node
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import { XMLParser } from 'fast-xml-parser';


// Initialize XML parser to preserve attributes
const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '@_' });

// Directory containing XSD schema files (drop your XSD files here)
const schemasDir = join(__dirname, '../schemas');
// Directory where generated resource definitions will be stored
const resourcesDir = join(__dirname, '../nodes/PohodaNode/resources');

// Ensure schemas and resources directories exist
mkdirSync(schemasDir, { recursive: true });
mkdirSync(resourcesDir, { recursive: true });

// Helper to humanize camelCase strings
function humanize(str: string): string {
  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
}

(async () => {
  const schemaFiles = readdirSync(schemasDir).filter((f) => f.endsWith('.xsd'));
  const resourceList: string[] = [];
  for (const file of schemaFiles) {
    const filePath = join(schemasDir, file);
    const baseName = file.replace(/\.[^/.]+$/, '');
    const resourceName = baseName.charAt(0).toLowerCase() + baseName.slice(1);
    console.log(`Processing schema: ${file}`);
    try {
      // 1) Read and parse XSD file
      const xsdXml = readFileSync(filePath, 'utf-8');
      const xsdObj = parser.parse(xsdXml);

      // 2) Locate the schema element (handles prefixes like xsd: or xs:)
      const rootKeys = Object.keys(xsdObj);
      const schemaKey = rootKeys.find((k) => k.endsWith(':schema') || k === 'schema');
      if (!schemaKey) {
        console.warn(`  Unable to find schema element in ${file}`);
        continue;
      }
      const schema = (xsdObj as any)[schemaKey];

      // 3) Locate element definitions under schema
      const schemaChildKeys = Object.keys(schema);
      const elementKey = schemaChildKeys.find((k) => k.endsWith(':element') || k === 'element');
      if (!elementKey) {
        console.warn(`  No element definitions in ${file}`);
        continue;
      }
      const elements = (schema as any)[elementKey];
      const elemsArr = Array.isArray(elements) ? elements : [elements];

      // 4) Extract operations: use element names, strip 'Request', skip 'Response'
      const rawNames = elemsArr.map((el: any) => el['@_name']).filter((n: any) => typeof n === 'string');
      const ops = rawNames
        .map((n: string) => {
          let raw = n;
          if (raw.endsWith('Request')) raw = raw.slice(0, -'Request'.length);
          if (raw.endsWith('Response')) return null;
          return raw.charAt(0).toLowerCase() + raw.slice(1);
        })
        .filter((n: string | null): n is string => Boolean(n));
      const operations = Array.from(new Set(ops));
      if (operations.length === 0) {
        console.warn(`  No operations found in ${file}`);
        continue;
      }

      // 3) Generate resource module stub
      const operConst = `${resourceName}Operations`;
      const fieldsConst = `${resourceName}Fields`;
      let code = `import { INodeProperties } from 'n8n-workflow';\n\n`;
      code += `export const ${operConst}: INodeProperties[] = [\n`;
      code += `  { displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,\n`;
      code += `    displayOptions: { show: { resource: ['${resourceName}'] } },\n`;
      code += `    options: [\n`;
      for (const op of operations) {
        const label = humanize(op);
        code += `      { name: '${label}', value: '${op}', action: '${label}' },\n`;
      }
      code += `    ], default: '${operations[0]}' },\n];\n\n`;
      code += `export const ${fieldsConst}: INodeProperties[] = [\n`;
      code += `  // TODO: add fields for ${resourceName} operations\n`;
      code += `];\n`;
      const outTs = join(resourcesDir, `${resourceName}.ts`);
      writeFileSync(outTs, code);
      console.log(`  Wrote resource module: ${outTs}`);
      resourceList.push(resourceName);
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }
  // 4) Write index.ts
  if (resourceList.length) {
    const idxFile = join(resourcesDir, 'index.ts');
    const idxCode = resourceList.map((r) => `export * from './${r}';`).join('\n') + '\n';
    writeFileSync(idxFile, idxCode);
    console.log(`Generated index: ${idxFile}`);
  }
})();
