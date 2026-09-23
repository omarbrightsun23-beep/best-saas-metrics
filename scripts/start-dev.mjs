import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const rawArgs = process.argv.slice(2);
const nextArgs = ['dev'];
let hasPort = false;
let hasHost = false;

for (let i = 0; i < rawArgs.length; i++) {
  const arg = rawArgs[i];
  if (arg === '--host' || arg === '-H') {
    hasHost = true;
    nextArgs.push('-H', rawArgs[++i] || '0.0.0.0');
  } else if (arg.startsWith('--host=')) {
    hasHost = true;
    nextArgs.push('-H', arg.slice(7));
  } else if (arg === '--port' || arg === '-p') {
    hasPort = true;
    nextArgs.push('-p', rawArgs[++i] || '3000');
  } else if (arg.startsWith('--port=')) {
    hasPort = true;
    nextArgs.push('-p', arg.slice(7));
  } else {
    nextArgs.push(arg);
  }
}

if (!hasPort) nextArgs.push('-p', '3000');
if (!hasHost) nextArgs.push('-H', '0.0.0.0');

const nodeBinDir = path.join(process.cwd(), 'node_modules', '.bin');
const nextBin = path.join(nodeBinDir, 'next');
const cmd = fs.existsSync(nextBin) ? nextBin : 'npx';
const args = fs.existsSync(nextBin) ? nextArgs : ['next', ...nextArgs];

const child = spawn(cmd, args, {
  stdio: 'inherit',
  env: {
    ...process.env,
    PATH: `${nodeBinDir}:${process.env.PATH || ''}`,
  },
});

child.on('exit', (code) => {
  process.exit(code ?? 0);
});
