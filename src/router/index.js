import Vue from 'vue'
import Router from 'vue-router'
import Chat from '@/components/Chat'
import Report from '@/components/Report'
import Intro from '@/components/Intro'
import AIDefinition from '@/components/AIDefinition'
import ChooseTheme from '@/components/ChooseTheme'
import HelloWorld from '@/components/ChooseTheme'
Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/chat',
      name: 'Chat',
      component: Chat
    },
    {
      path: '/report',
      name: 'Report',
      component: Report
    },
    {
      path: '/intro',
      name: 'Intro',
      component: Intro,
      alias: '/'
    },
    {
      path: '/ai-definition',
      name: 'AIDefinition',
      component: AIDefinition
    },
    {
      path: '/helloworld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/choosetheme',
      name: 'ChooseTheme',
      component: ChooseTheme
    }
  ]
})
