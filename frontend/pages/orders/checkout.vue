<template>
  <div>
    <a class="uk-button uk-button-primary uk-margin" @click="$router.go(-1)"><span uk-icon="arrow-left" /> go back</a>

    <client-only placeholder="Chargement...">
      <div uk-grid>
        <div class="uk-width-1-3@m">
          <div class="uk-card uk-card-default uk-card-body uk-width-1-1@m">
            <form @submit.stop.prevent="handleSubmit">
              <fieldset class="uk-fieldset">
                <legend class="uk-legend">
                  Checkout
                </legend>

                <div class="uk-margin">
                  <label class="uk-form-label" for="form-stacked-text">Address</label>
                  <input v-model="address" class="uk-input" type="text" placeholder="13 boulevard francis">
                </div>

                <div class="uk-margin">
                  <label class="uk-form-label" for="form-stacked-text">City</label>
                  <input v-model="city" class="uk-input" type="text" placeholder="San francisco">
                </div>

                <div class="uk-margin">
                  <label class="uk-form-label" for="form-stacked-text">Postal code</label>
                  <input v-model="postalCode" class="uk-input" type="text" placeholder="92000">
                </div>

                <div class="uk-margin">
                  <label for="card">Card</label>
                  <stripe-element-card
                    ref="checkoutRef"
                    :pk="publishableKey"
                    :hide-postal-code="true"
                    @token="tokenCreated"
                  />
                </div>

                <div class="uk-margin">
                  <button v-if="$route.path !== '/orders/checkout'" class="uk-button uk-button-primary" name="button" @click="goToCheckout">
                    Proceed to checkout ({{ price }}€)
                  </button>
                </div>

                <div class="uk-margin">
                  <button class="uk-button uk-button-primary" type="submit">
                    Complete payment
                  </button>
                </div>
              </fieldset>
            </form>
          </div>
        </div>
        <div class="uk-width-expand@m">
          <Cart />
        </div>
      </div>
    </client-only>
  </div>
</template>

<script>
export default {
  data () {
    return {
      publishableKey: process.env.STRIPE_KEY,
      address: '',
      postalCode: '',
      city: '',
      complete: false,
      loading: false,
      token: ''
    }
  },
  methods: {
    emptyCart () {
      this.$store.commit('cart/emptyList')
    },
    async tokenCreated (token) {
      this.token = token.id

      try {
        await this.$strapi.$orders.create({
          amount: this.$store.getters['cart/price'],
          dishes: this.$store.getters['cart/items'],
          address: this.address,
          postalCode: this.postalCode,
          city: this.city,
          token: this.token
        })
        alert('Your order have been successfully submitted.')
        this.emptyCart()
        this.$router.push('/')
      } catch (err) {
        this.loading = false
        alert('An error occurred.')
      }
    },
    handleSubmit () {
      this.$refs.checkoutRef.submit()
    }
  }
}
</script>
