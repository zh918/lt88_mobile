import Vue from 'vue'
import Router from 'vue-router'
import info from './map/info'
import success from './map/success'

import game from './map/game'

export default new Router({
	mode:'hash',
	routes:[
		info,
		success,

		game
	]
})
