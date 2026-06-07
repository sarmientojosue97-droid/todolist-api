import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    server: {

        https: { key: fs.readFileSync(path.resolve(__dirname, 'llave.pem')), cert: fs.readFileSync(path.resolve(__dirname, 'certificado.pem')),},
        proxy: { '/api': { target: 'https://localhost:4000', changeOrigin: true, secure: false,},},

    },
});
