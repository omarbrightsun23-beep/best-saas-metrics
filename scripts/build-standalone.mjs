import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// 1. Ensure node_modules/.bin is in PATH and resolve next executable
const nodeBinDir = path.join(process.cwd(), 'node_modules', '.bin');
const nextBin = path.join(nodeBinDir, 'next');
const buildCmd = fs.existsSync(nextBin) ? `"${nextBin}" build` : 'npx next build';

// 2. Run Next.js production build
execSync(buildCmd, {
  stdio: 'inherit',
  env: {
    ...process.env,
    PATH: `${nodeBinDir}:${process.env.PATH || ''}`,
    NODE_ENV: 'production',
  },
});

// 3. Ensure standalone artifacts include static assets and public directory
const standaloneDir = path.join(process.cwd(), '.next', 'standalone');
if (fs.existsSync(standaloneDir)) {
  const standaloneNextDir = path.join(standaloneDir, '.next');
  const staticSrc = path.join(process.cwd(), '.next', 'static');
  const staticDest = path.join(standaloneNextDir, 'static');
  if (fs.existsSync(staticSrc)) {
    fs.cpSync(staticSrc, staticDest, { recursive: true, force: true });
  }

  const publicSrc = path.join(process.cwd(), 'public');
  const publicDest = path.join(standaloneDir, 'public');
  if (fs.existsSync(publicSrc)) {
    fs.cpSync(publicSrc, publicDest, { recursive: true, force: true });
  }
}
