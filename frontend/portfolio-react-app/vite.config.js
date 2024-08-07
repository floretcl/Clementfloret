import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
    ],
    build: {
        outDir: '../../backend/portfolio/static',
        assetsDir: '',
        emptyOutDir: true,
        rollupOptions: {
            output: {
                chunkFileNames: 'js/[name]-[hash].js',
                entryFileNames: 'js/[name]-[hash].js',
                assetFileNames: ({name}) => {
                    if (/\.(gif|jpe?g|png|svg|webp|avif)$/.test(name ?? '')) {
                        return 'img/[name]-[hash][extname]';
                    }
                    if (/\.(css|scss)$/.test(name ?? '')) {
                        return 'css/[name]-[hash][extname]';
                    }
                    if (/\.(woff|woff2|ttf|otf)$/.test(name ?? '')) {
                        return 'fonts/[name]-[hash][extname]';
                    }
                    return '[name]-[hash][extname]';
                },
            },
        },
    },
});