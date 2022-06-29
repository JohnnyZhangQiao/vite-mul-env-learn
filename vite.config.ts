import { defineConfig, ConfigEnv, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import path from 'path';
import EnvironmentPlugin from 'vite-plugin-environment';
import { fetchEnv } from './server/envUitls';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv) => {
  const env = loadEnv(mode, path.resolve(__dirname), ['VITE_', 'MY_', 'YOUR_']);
  console.log('env:', env);

  const { proxy } = fetchEnv(env.VITE_NODE_ENV); // 设置域名和端口

  return {
    // envDir: './viteEnv',
    // or
    envDir: './',
    envPrefix: ['VITE_', 'MY_', 'YOUR_'],
    base: './',
    plugins: [
      vue(),
      // script setup语法糖增强插件
      VueSetupExtend(),
      EnvironmentPlugin({
        PROXY: proxy
      })
    ],
    resolve: {
      alias: [
        {
          find: '@',
          replacement: '/src'
        }
      ]
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            // 将pinia的全局库实例打包进vendor，避免和页面一起打包造成资源重复引入
            if (id.includes(path.resolve(__dirname, '/src/store/index.ts'))) {
              return 'vendor';
            }
          }
        }
      }
    }
  };
});
