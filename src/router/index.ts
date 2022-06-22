import { createRouter , createWebHashHistory, RouteRecordRaw} from "vue-router"
import App from '../App.vue'
import Easy from '../components/Easy.vue'
import Medium from '../components/Medium.vue'
import Hard from '../components/Hard.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/easy',
        name: 'Easy',
        component: Easy
    },
    {
        path: '/medium',
        name: 'Medium',
        component: Medium
    },
    {
        path: '/hard',
        name: 'Hard',
        component: Hard
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router