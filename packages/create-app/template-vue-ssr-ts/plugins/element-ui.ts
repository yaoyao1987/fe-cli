import Vue from 'vue'
import { Button, Notification, Message } from 'element-ui'

Vue.use(Button)

Vue.prototype.$message = Message
Vue.prototype.$notify = Notification
