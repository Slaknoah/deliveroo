<template>
  <client-only>
    <nav class="uk-navbar-container" uk-navbar>
      <div class="uk-navbar-left">
        <ul class="uk-navbar-nav">
          <li class="uk-active">
            <router-link class="navbar-brand" to="/" exact>
              Deliveroo clone
            </router-link>
          </li>
          <li>
            <router-link class="navbar-brand" to="/restaurants" exact>
              Restaurants
            </router-link>
          </li>
        </ul>
      </div>

      <div class="uk-navbar-right">
        <ul v-if="$strapi.user !== null" class="uk-navbar-nav">
          <li>
            <a href="#" class="uk-link-reset">
              <img src="https://banner2.cleanpng.com/20180420/twe/kisspng-computer-icons-user-profile-symbol-person-vector-5ada64c43ea7b6.8779413315242620842567.jpg" class="uk-border-circle" height="40" width="40" alt="">{{ $strapi.user.username }}
            </a>
          </li>
          <li><a href="#" @click.prevent="logout">Logout</a></li>
        </ul>

        <ul v-if="$strapi.user === null" class="uk-navbar-nav">
          <li>
            <router-link to="/register">
              Signup
            </router-link>
          </li>
          <li>
            <router-link to="/signin">
              Signin
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </client-only>
</template>

<script>
export default {
  methods: {
    async logout () {
      await this.$strapi.logout()
      this.$router.push('/')
    }
  }
}
</script>
