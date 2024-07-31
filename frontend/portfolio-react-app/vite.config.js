import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
    ],
    build: {
        outDir: '../../backend/portfolio/static/portfolio',
        assetsDir: '../../backend/portfolio/static/portfolio/assets',
        emptyOutDir: true,
        rollupOptions: {
            output: {
                chunkFileNames: 'assets/js/[name]-[hash].js',
                entryFileNames: 'assets/js/[name]-[hash].js',
                assetFileNames: ({name}) => {
                    if (/\.(gif|jpe?g|png|svg|webp|avif)$/.test(name ?? '')) {
                        return 'assets/img/[name]-[hash][extname]';
                    }
                    if (/\.(css|scss)$/.test(name ?? '')) {
                        return 'assets/css/[name]-[hash][extname]';
                    }
                    if (/\.(woff|woff2|ttf|otf)$/.test(name ?? '')) {
                        return 'assets/fonts/[name]-[hash][extname]';
                    }
                    return 'assets/[name]-[hash][extname]';
                },
            },
        },
    },
});