<template>
  <div v-if="$store.state.isUserLoggedIn">
    <div class="page-header page-header-small">
      <parallax
        class="page-header-image"
        style="background-image: url('img/bg6.jpg')"
      >
      </parallax>
      <div class="content-center">
        <div class="container">
          <h1 class="title">Recherchez votre livre</h1>
          <div class="text-center">
            <fg-input
              class="input-lg"
              placeholder="Recherchez votre document par titre,type ou prix..."
            >
            </fg-input>
          </div>
          <h3 class="title">Accédez a du contenu inédit rapidement</h3>
        </div>
      </div>
    </div>
    <div class="section section-about-us">
      <div class="container">
        <div class="col-12 ml-auto  mr-auto">
          <p class="category">
            Résultats trouvés {{ bookFound }} sur {{ bookCount }}
          </p>
          <!-- Nav tabs -->
          <tabs
            slot="raw-content"
            tab-content-classes="tab-content-padding text-center"
            @input="tabChange"
          >
            <tab-pane label="all">
              <template slot="label">
                <i class="now-ui-icons objects_umbrella-13"></i> Tout
              </template>
              <div class="col-md-12 ml-auto mr-auto">
                <div class="row collections">
                  <div class="col-md-3" v-for="book in books" :key="book.id">
                    <card>
                      <template slot="image">
                        <img
                          :src="book.cover"
                          class="img rounded img-raised"
                          alt="Generic placeholder image"
                        />
                      </template>
                      <template slot="raw-content">
                        <div class="text-center p-3">
                          <h6 class="text-muted">
                            {{ book.title }}
                          </h6>
                          <h6 class="category text-danger" v-if="book.price">
                            <i class="now-ui-icons business_money-coins"></i>
                            {{ book.price }} F CFA
                          </h6>
                          <h6 class="category text-warning" v-else>
                            <i class="now-ui-icons business_bulb-63"></i>
                            gratuit
                          </h6>
                        </div>
                      </template>
                    </card>
                  </div>
                </div>
              </div>
            </tab-pane>
            <tab-pane label="free">
              <template slot="label">
                <i class="now-ui-icons shopping_cart-simple"></i> Gratuit
              </template>
              <div class="col-md-12 ml-auto mr-auto">
                <div class="row collections">
                  <div class="col-md-3" v-for="book in bookFree" :key="book.id">
                    <card>
                      <template slot="image">
                        <img
                          :src="book.cover"
                          class="img rounded img-raised"
                          alt="cover"
                        />
                      </template>
                      <template slot="raw-content">
                        <div class="text-center p-3">
                          <h6 class="text-muted">
                            {{ book.title }}
                          </h6>
                          <h6 class="category text-warning">
                            <i class="now-ui-icons business_bulb-63"></i>
                            gratuit
                          </h6>
                        </div>
                      </template>
                    </card>
                  </div>
                </div>
              </div>
            </tab-pane>
            <tab-pane label="nofree">
              <template slot="label">
                <i class="now-ui-icons shopping_shop"></i> Payants
              </template>
              <div class="col-md-12 ml-auto mr-auto">
                <div class="row collections">
                  <div
                    class="col-md-3"
                    v-for="book in bookNoFree"
                    :key="book.id"
                  >
                    <card>
                      <template slot="image">
                        <img
                          :src="book.cover"
                          class="img rounded img-raised"
                          alt="cover"
                        />
                      </template>
                      <template slot="raw-content">
                        <div class="text-center p-3">
                          <h6 class="text-muted">
                            {{ book.title }}
                          </h6>
                          <h6 class="category text-danger">
                            <i class="now-ui-icons business_money-coins"></i>
                            {{ book.price }} F CFA
                          </h6>
                        </div>
                      </template>
                    </card>
                  </div>
                </div>
              </div>
            </tab-pane>
          </tabs>
        </div>
      </div>

      <n-pagination
        class="justify-content-center"
        @input="pagination"
        :page-count="pageCount"
        v-model="defaultPagination"
      >
      </n-pagination>
    </div>
  </div>
</template>
<script>
import {
  Card,
  Tabs,
  TabPane,
  Button,
  FormGroupInput,
  Pagination,
} from '@/components'
import BookServices from '@/services/BookServices'

export default {
  name: 'Book',
  components: {
    Card,
    Tabs,
    TabPane,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput,
    [Pagination.name]: Pagination,
  },
  data() {
    return {
      defaultPagination: 1,
      books: [],
      bookFree: [],
      bookNoFree: [],
      bookFound: 0,
      tabActual: 'all',
      bookCount: 0,
    }
  },
  computed: {
    pageCount() {
      return Math.ceil(this.bookCount / 12)
    },
  },
  methods: {
    async pagination(item) {
      try {
        const offset = (item - 1) * 12
        const response = (await BookServices.index(offset)).data
        this.books = response.books
        this.bookCount = response.count
        this.bookChange()
        this.tabChange()
      } catch (error) {
        console.log(error.response.data)
      }
    },
    bookChange(item) {
      this.bookFree = this.books.filter(book => book.price === 0)
      this.bookNoFree = this.books.filter(book => book.price > 0)
    },
    tabChange(item) {
      var tabs = ['all', 'free', 'nofree']
      item = item ? item : this.tabActual
      this.tabActual = item
      switch (item) {
        case tabs[0]:
          this.bookFound = this.books.length
          break
        case tabs[1]:
          this.bookFound = this.bookFree.length
          break
        case tabs[2]:
          this.bookFound = this.bookNoFree.length
          break
        default:
          break
      }
    },
  },
  async mounted() {
    if (!this.$store.state.isUserLoggedIn) {
      this.$router.push('/')
    }
    try {
      const response = (await BookServices.index()).data
      this.books = response.books
      this.bookCount = response.count
      this.bookFound = this.books.length
      this.bookChange()
    } catch (error) {
      console.log(error.response.data)
    }
  },
}
</script>
<style scoped>
.starter-page {
  min-height: calc(100vh - 95px);
}
img {
  width: 88%;
  height: 150px;
}
</style>
