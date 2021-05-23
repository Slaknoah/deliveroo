<template>
  <div>
    <a class="uk-button uk-button-primary uk-margin" @click="$router.go(-1)"><span uk-icon="arrow-left" /> go back</a>

    <client-only>
      <div v-if="restaurant" uk-grid>
        <div class="uk-width-1-3@m">
          <div v-for="dish in restaurant.dishes" :key="dish.id" class="uk-margin">
            <div class="uk-card uk-card-default">
              <div class="uk-card-media-top">
                <img :src="'http://localhost:1337' + dish.image.url" alt="">
              </div>
              <div class="uk-card-body">
                <h3 class="uk-card-title">
                  {{ dish.name }} <span class="uk-badge">{{ dish.price }}€</span>
                </h3>
                <p>{{ dish.description }}</p>
              </div>
              <div class="uk-card-footer">
                <button class="uk-button uk-button-primary" @click="addToCart(dish)">
                  Add to cart
                </button>
              </div>
            </div>
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
import { mapMutations } from 'vuex'
import restaurantQuery from '~/apollo/queries/restaurant/restaurant'

export default {
  data () {
    return {
      restaurants: Array
    }
  },
  computed: {
    restaurant () {
      return this.restaurants[0]
    }
  },
  apollo: {
    restaurants: {
      prefetch: true,
      query: restaurantQuery,
      variables () {
        return { slug: this.$route.params.slug }
      }
    }
  },
  methods: {
    ...mapMutations({
      addToCart: 'cart/add',
      removeFromCart: 'cart/remove'
    })
  }
}
</script>
