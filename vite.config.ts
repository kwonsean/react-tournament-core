import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      include: ['src/lib'], // lib 폴더 안의 코드만 타입 파일로 만듭니다.
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/lib/index.ts'),
      name: 'ReactTournamentCore',
      formats: ['es', 'cjs'], // 모던(ESM) 환경과 레거시(CJS) 환경 모두 지원
      fileName: format => `index.${format}.js`,
    },
    rollupOptions: {
      // 🔥 사용자의 React와 충돌하지 않도록 빌드 결과물에서 React 제외
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
