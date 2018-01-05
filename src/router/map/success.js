// 首页
import layout from '../../components/common/layout/layout'
const success = r => require.ensure([], () => r(require('../../page/info/success.vue')), 'success')
 
export default {
	name:'成功',
	path:'/',
	component:layout,
	children:[
		{
            name:'报价成功',
            path:'/success',
            component:success
        },


	]
}
