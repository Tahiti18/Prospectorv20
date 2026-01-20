
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  // Comment: Casting process to any to fix "Property 'cwd' does not exist on type 'Process'" in some environments
  const projectRoot = (process as any).cwd();
  const env = loadEnv(mode, projectRoot, '');
  
  return {
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY || env.API_KEY),
    },
    resolve: {
      alias: {
        // Comment: Replaced __dirname with projectRoot from process.cwd() to fix ESM availability issues
        '@': path.resolve(projectRoot, './'),
      },
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
    }
  };
});
