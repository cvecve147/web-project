<template>
  <v-row>
    <v-col
      cols="12"
      xl="2"
      lg="3"
      md="4"
      sm="6"
      v-for="(item, index) in allproduct"
      :key="index"
      itemscope
      itemtype="http://schema.org/Product"
    >
      <v-card class="mx-auto" max-width="400" 
      v-if="item.gsx$商品名稱.$t!=''">
        <v-lazy
          transition="fade-transition"
          :options="{
            threshold: 0.5
          }"
        >
          <v-img
            class="white--text align-end"
            height="200px"
            itemprop="image"
            :src="item.gsx$商品圖片.$t"
            :alt="item.gsx$商品名稱.$t"
          >
            <div class="cover">
              <v-card-title itemprop="name">{{
                item.gsx$商品名稱.$t
              }}</v-card-title>
            </div>
          </v-img>
        </v-lazy>

        <v-card-text class="text--primary pb-1">
          <div>
            <span itemprop="price" class="title">{{
              item.gsx$商品價格.$t
            }}</span
            >/<span>{{ item.gsx$尺寸.$t }}</span>
          </div>
          <div
            itemprop="description"
            class="grey--text darken-4"
            v-html="item.gsx$商品描述.$t"
          ></div>
        </v-card-text>

        <v-card-actions class="d-flex justify-end">
          <v-btn color="blue" text @click="addTodo(item.gsx$商品名稱.$t)">
            <v-icon>add_shopping_cart</v-icon>加入購物車
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  props: ['allproduct'],
  methods: {
    addTodo(e) {
      this.$store.commit('todos/add', e)
    }
  }
}
</script>
<style>
.w-100 {
  width: 100%;
}
</style>
