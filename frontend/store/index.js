export const actions = {
  nuxtServerInit ({ commit }, { $cookies }) {
    let cart = []

    if ($cookies) {
      cart = ($cookies.get('cart')) || []
    }

    commit('cart/setItems', cart)
  }
}
