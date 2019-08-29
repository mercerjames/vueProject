import Vue from 'vue'
import Vuex, { Store } from 'vuex'

Vue.use(Vuex)

export default new Store({
  state: {
    cart: []
  },
  mutations: {
    addCart(state, goodsinfo) {
      // eslint-disable-next-line no-unused-vars
      var flag = false
      state.cart.some(item => {
        if (item.id === goodsinfo) {
          item.count += goodsinfo.count
          flag = true
          return true
        }
      })
      if (!flag) {
        console.log(flag)
        state.cart.push(goodsinfo)
      }
    }
  }
})
