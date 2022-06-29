<script setup lang="ts">
import { ref } from 'vue';
import { proxy } from '@/api/proxy';

interface IEnv extends ImportMetaEnv {
  VITE_NODE_ENV: string;
  VITE_OWNER: string;
  VITE_POSITION: string;
}
const viteEnv: IEnv = import.meta.env;

console.log(
  `配置项  ===> envDir: ${viteEnv.VITE_OWNER === 'Inner' ? './viteEnv' : './'}\n`,
  viteEnv
);
</script>

<template>
  <div class="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <section class="main">
      <div class="card">
        <h3>①通过环境文件传入的参数</h3>
        <div class="tips">说明：只包含"VITE_"开头参数</div>
        <div>项目owner：{{ viteEnv.VITE_OWNER }}</div>
        <div>owner位置：{{ viteEnv.VITE_POSITION }}</div>
        <div>项目mode：{{ viteEnv.VITE_NODE_ENV }}</div>
      </div>
      <div class="card">
        <h3>②环境插件传递的参数</h3>
        <div class="tips">
          说明：通过vite-plugin-environment插件传递过来，一般为二次计算后的参数。假如是静态参数值则直接通过方案①传回来即可。
        </div>
        <p>服务请求域：{{ proxy }}</p>
      </div>
      <div class="card">
        <h3>③Vite环境自带参数</h3>
        <div class="tips">
          说明：Vite默认参数，参考
          <a href="https://cn.vitejs.dev/guide/env-and-mode.html#env-variables"
            >Vite环境变量</a
          >
        </div>
        <p>是否为SSR模式：{{ viteEnv.SSR }}</p>
        <p>是否为本地开发模式：{{ viteEnv.DEV }}</p>
        <p>是否为构建模式：{{ viteEnv.PROD }}</p>
        <p>当前启动命令读取的mode为：{{ viteEnv.MODE }}</p>
        <p>部署应用时的基本 URL：{{ viteEnv.BASE_URL }}</p>
      </div>
    </section>
  </div>
</template>

<style lang="less" scoped>
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #f8f8f8;
  margin-top: 60px;
}
.main {
  display: flex;
  .card {
    margin: 10px;
    padding: 10px;
    width: 300px;
    text-align: left;
    background-color: #dbf1e7;
    font-size: 14px;
    h3 {
      margin-bottom: 0;
    }
    .tips {
      margin-bottom: 10px;
      font-size: 12px;
      color: #898989;
    }
  }
}
</style>
