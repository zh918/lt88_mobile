import Vue from 'vue'
import DispatchRouter from './dispatchRouter'
import resetRootFontSize from './common/rem'
import App from './App'

export default class Bootstrap {
    constructor() {
        this.dispatchRouter = new DispatchRouter();
    }

    run(router, store) {
        let _this = this;
        log('bootstrap run 正式环境：', $isOnLine);
        _this.appListener(function() {
            _this.initVue(router, store).then(result => {
                _this.dispatchRouter.dispatch();
            });
        });
    }

    // 先发起请求，后加载vue
    initVue(router, store) {
        return import('./App').then((App) => {
            window.globalVue = new Vue({
                router,
                store,
                template: '<App />',
                components: {
                    App
                }
            }).$mount('#app');
            log("vue 初始化完成");
        });
    }

    appListener(cb) {
      // 方式一
      // document.addEventListener('RNJSBridgeReady',()=>{
      //   alert('RNJSBridgeReady 触发,将注入全局$App对象，用于控制RN;注意这种方式是通过webview指定injectJavascript的方式来触发，而非native注入.');
      //   $jsc.back(12341234);  // native 注入脚本执行
      //   cb();
      // },false);

      // 方式二
      // $jsc.bootstrap(()=>{
      //   alert('RN脚本环境初始化完成');
      //   $jsc.back(888);
      //   $jsc.on("onCreated",function(info) {
      //     let infoStr = JSON.stringify(info);
      //     alert(infoStr);
      //   });
      //
      //   // let str = "";
      //   // $jsc._events.forEach((ev)=>{
      //   //   str += ev.cb;
      //   // })
      //   // alert(str);
      //
      //   cb();
      // })

     
      // 第三种方式
      document.addEventListener('RNJSBridgeReady',()=>{

        $jsc.on("onCreate",(info)=>{
          alert(info);
        });

        $jsc.on("onResume",(info)=>{
          alert(info);
        });

        cb();
      });
    }

}
