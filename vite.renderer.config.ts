import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    root: './render',
    base: './',
    build: {
        outDir: '../dist/render',
        rollupOptions: {
            input: {
                main: './render/main.html',
                login: './render/login.html'
            },
        }
    },
    resolve: {
        extensions: [
            '.tsx',
            '.js',
            '.jsx'
        ]
    }
});