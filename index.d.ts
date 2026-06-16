 
 
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  
  // 定义组件的基本类型
  const component: DefineComponent<{}, {}, any>;
  
  export default component;
}

 declare module '@vue-flow/core/dist/style.css';
declare module '@vue-flow/core/dist/theme-default.css';
 

declare module "*.css";
declare module "*.scss";
declare module "*.sass";
declare module "*.less";

 