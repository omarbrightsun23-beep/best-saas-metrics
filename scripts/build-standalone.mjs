import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// If running in Vercel or standard CI, run next build directly
try {
  execSync('next build', {
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production' }
  });
} catch (err) {
  process.exit(1);
}

// Only copy standalone files if .next/standalone was created
const standaloneDir = path.join(process.cwd(), '.next', 'standalone');
if (fs.existsSync(standaloneDir)) {
  const staticSrc = path.join(process.cwd(), '.next', 'static');
  const staticDest = path.join(standaloneDir, '.next', 'static');
  if (fs.existsSync(staticSrc)) {
    fs.cpSync(staticSrc, staticDest, { recursive: true, force: true });
  }

  const publicSrc = path.join(process.cwd(), 'public');
  const publicDest = path.join(standaloneDir, 'public');
  if (fs.existsSync(publicSrc)) {
    fs.cpSync(publicSrc, publicDest, { recursive: true, force: true });
  }
}
