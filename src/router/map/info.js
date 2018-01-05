// 首页
import layout from '../../components/common/layout/layout'
const info = r => require.ensure([], () => r(require('../../page/info/info.vue')), 'info')
const supplement = r => require.ensure([], () => r(require('../../page/info/supplement.vue')), 'supplement')
 
export default {
	name:'首页',
	path:'/',
	component:layout,
	children:[
		{
            name:'车险报价',
            path:'/info',
            component:info
        },
        {
            name:'资料补录',
            path:'/supplement',
            component:supplement
        },

	]
}
