import Vue from 'vue'
import VueRouter from 'vue-router' 
import App from '../../App'
import YmtUI from '../../../ref/ymt-ui'
import '../../common/inject'
import router from '../../router'
import store from '../../store'
import filters from '../../filters/index.js' 
  
import bs from '../../bootstrap' 
 

import '../../../static/iconfont/iconfont.css'
import '../../../ref/ymt-ui/style.css' 
import 'normalize.css'
import '../../style/default/root.less'

Vue.use(VueRouter);
Vue.use(YmtUI);  

new bs().run(router,store);  
