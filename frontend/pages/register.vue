<template>
  <div>
    <div class="uk-child-width-1-2@m uk-grid">
      <div>
        <div class="uk-card uk-card-default uk-card-small uk-card-body">
          <img src="https://assets-ouch.icons8.com/preview/294/e25a0374-0657-45d5-98d9-2408473a744c.png" height="500" width="500" class="uk-align-center" alt="">
        </div>
      </div>

      <div>
        <div class="uk-card uk-card-default uk-card-large uk-card-body">
          <div v-show="error !== ''" class="uk-alert-danger" uk-alert>
            <p>{{ error }}</p>
          </div>
          <form @submit.stop.prevent="handleSubmit">
            <fieldset class="uk-fieldset">
              <legend class="uk-legend">
                Register
              </legend>

              <div class="uk-margin">
                <label class="uk-form-label">Username</label>
                <input v-model="username" class="uk-input" type="text" placeholder="pbocuse">
              </div>

              <div class="uk-margin">
                <label class="uk-form-label" for="form-stacked-text">Email</label>
                <input v-model="email" class="uk-input" type="email" placeholder="paul.bocuse@gmail.com">
              </div>

              <div class="uk-margin">
                <label class="uk-form-label" for="form-stacked-text">Password</label>
                <input v-model="password" class="uk-input" type="password">
              </div>

              <div class="uk-margin">
                <button class="uk-button uk-button-primary uk-width-1-1" :disabled="loading" type="submit">
                  Submit
                </button>
              </div>

              <div class="uk-margin">
                <p>
                  Already have an account?
                  <router-link :to="{ name: 'signin'}">
                    Login
                  </router-link>
                </p>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'guest',
  data () {
    return {
      error: '',
      email: '',
      password: '',
      username: '',
      loading: false
    }
  },
  methods: {
    async handleSubmit () {
      try {
        this.loading = true
        const newUser = await this.$strapi.register({
          username: this.username,
          email: this.email,
          password: this.password
        })
        this.loading = false

        if (newUser !== null) {
          this.error = ''
          this.$router.push('/')
        }
      } catch (error) {
        this.loading = false
        this.error = error.mesage
      }
    }
  }
}
</script>
