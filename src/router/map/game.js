// 游戏
import layout from '../../components/common/layout/layout'
const cqssc = r => require.ensure([], () => r(require('../../page/game/ssc/cqssc.vue')), 'game')
const pk10 = r => require.ensure([], () => r(require('../../page/game/pk/pk10.vue')), 'game')

export default {
	name:'娱乐中心',
	path:'/',
	component:layout,
	children:[
		{
            name:'cqssc',
            path:'/game/ssc/cqssc',
            component:cqssc
        },
        {
            name:'pk10',
            path:'/game/pk/pk10',
            component:pk10
        },

	]
}
