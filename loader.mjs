import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { loadBinding } from '@node-rs/helper';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function resolve(specifier, context, defaultResolve) {
  if (specifier.endsWith('.node')) {
    return {
      url: new URL(specifier, context.parentURL).href,
      format: 'node'
    };
  }
  return defaultResolve(specifier, context, defaultResolve);
}

export function getFormat(url, context, defaultGetFormat) {
  if (url.endsWith('.node')) {
    return {
      format: 'node'
    };
  }
  return defaultGetFormat(url, context, defaultGetFormat);
}

export function load(url, context, defaultLoad) {
  if (url.endsWith('.node')) {
    return {
      format: 'node',
      source: loadBinding(resolve(__dirname, url), 'query_engine', 'query_engine')
    };
  }
  return defaultLoad(url, context, defaultLoad);
}