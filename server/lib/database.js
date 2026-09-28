import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import vendors from '../../src/data/vendors.js';

const databasePath = fileURLToPath(new URL('../data/database.json', import.meta.url));
let writeQueue = Promise.resolve();
let initialization;

function initialData() {
  return {
    vendors,
    quoteRequests: [],
    handoffs: [],
    users: [
      { id: 'u001', name: 'Chioma Adebayo', email: 'chioma@example.com', role: 'customer' },
      { id: 'vendor-v001', name: 'Grand Monarch Team', email: 'hello@grandmonarch.example', role: 'vendor', vendorId: 'v001' },
      { id: 'admin-001', name: 'Ceremoni Support', email: 'support@ceremoni.ng', role: 'admin' },
    ],
  };
}

async function ensureDatabase() {
  if (!initialization) {
    initialization = (async () => {
      await mkdir(dirname(databasePath), { recursive: true });
      try {
        await readFile(databasePath, 'utf8');
      } catch (error) {
        if (error.code !== 'ENOENT') throw error;
        await writeFile(databasePath, JSON.stringify(initialData(), null, 2), 'utf8');
      }
    })();
  }
  return initialization;
}

export async function readDatabase() {
  await ensureDatabase();
  return JSON.parse(await readFile(databasePath, 'utf8'));
}

export function updateDatabase(mutator) {
  const operation = writeQueue.then(async () => {
    const database = await readDatabase();
    const result = await mutator(database);
    const temporaryPath = `${databasePath}.tmp`;
    await writeFile(temporaryPath, JSON.stringify(database, null, 2), 'utf8');
    await rename(temporaryPath, databasePath);
    return result;
  });
  // Keep the queue usable after a failed mutation while preserving the error for its caller.
  writeQueue = operation.catch(() => undefined);
  return operation;
}
