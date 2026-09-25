import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

function readEnvFile(): Record<string, string> {
  const envPath = resolve(__dirname, '../.env');
  return Object.fromEntries(
    readFileSync(envPath, 'utf8')
      .split(/\r?\n/)
      .filter((line) => line.trim() && !line.trim().startsWith('#'))
      .map((line) => {
        const separator = line.indexOf('=');
        return [line.slice(0, separator).trim(), line.slice(separator + 1).trim()];
      }),
  );
}

const env = readEnvFile();

export const credentials = {
  username: env.USERNAME,
  password: env.PASSWORD,
};

if (!credentials.username || !credentials.password) {
  throw new Error('USERNAME and PASSWORD must be defined in src/.env');
}
