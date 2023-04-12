import { createApp } from 'vue'
import App from './App.vue'
import router from './routes/router'
import store from './store/store'
import { library } from '@fortawesome/fontawesome-svg-core'


/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowRight, faBroom, faCirclePlus, faDownload, faEraser, faFont, faPencil } from '@fortawesome/free-solid-svg-icons'
import {
  faCircle,
  faComment,
  faSquare,
} from '@fortawesome/free-regular-svg-icons' 

library.add(faCircle, faCirclePlus, faSquare, faArrowRight, faPencil, faEraser, faBroom, faDownload, faComment,faFont)
const app = createApp(App)

app.use(router)
app.use(store)
app.mount('#app')
app.component('font-awesome-icon', FontAwesomeIcon)
