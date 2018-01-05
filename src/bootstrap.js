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
        cb();  
    }  

}