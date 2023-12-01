import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { readFileSync } from 'fs';

export function getInput(moduleUrl, fileName) {
  const __filename = fileURLToPath(moduleUrl);
  const __dirname = dirname(__filename);
  return readFileSync(resolve(__dirname, fileName), {
    encoding: 'utf-8',
  }).split(/\r?\n/);
}
