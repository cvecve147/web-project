<template>
  <div>
    <div
      class="head"
      :style="{ backgroundImage: 'url(' + cover[0].gsx$imgsrc.$t + ')' }"
    >
      <div
        class="coverPhoto d-flex justify-center align-center white--text pa-5  display-2 font-weight-black"
        itemprop="description"
      >
        {{ cover[0].gsx$標題.$t }}
      </div>
    </div>
    <div>
      <v-container>
        <v-row>
          <h2 class="px-3">限時商品</h2>
        </v-row>
        <card :allproduct="time"></card>
      </v-container>
    </div>
    <div>
      <v-container>
        <v-row>
          <h2 class="pa-3">全部商品</h2>
        </v-row>
        <card :allproduct="allproduct"></card>
      </v-container>
    </div>
    <div class="chat" alt="與我聯繫">
      <a
        href="https://www.facebook.com/%E8%8A%B3%E5%9A%AE%E6%A1%BF%E6%89%8B%E4%BD%9C%E5%9D%8A-113563920277515"
        ><v-icon large color="blue darken-2">insert_comment</v-icon>
      </a>
    </div>
  </div>
</template>
<script>
import card from '~/components/card.vue'
export default {
  components: {
    card
  },
  async asyncData({ $axios }) {
    const res = await $axios.get(
      'https://spreadsheets.google.com/feeds/list/1nRVjr9OM6vfDwXAu6yiky1D3sJrceREtYoui74-X3ZY/3/public/values?alt=json'
    )
    const cover = res.data.feed.entry
    const res2 = await $axios.get(
      'https://spreadsheets.google.com/feeds/list/1nRVjr9OM6vfDwXAu6yiky1D3sJrceREtYoui74-X3ZY/2/public/values?alt=json'
    )

    const time = res2.data.feed.entry

    const res3 = await $axios.get(
      'https://spreadsheets.google.com/feeds/list/1nRVjr9OM6vfDwXAu6yiky1D3sJrceREtYoui74-X3ZY/1/public/values?alt=json'
    )
    const allproduct = res3.data.feed.entry
    return {
      cover,
      time,
      allproduct
    }
  }
}
</script>
<style>
a {
  text-decoration: none;
}
.head {
  width: 100vw;
  height: 50vh;
  background-size: cover;
  background-color: rgba(0, 0, 0, 0.3);
  background-position: center center;
}
.coverPhoto {
  width: 100%;
  height: 100%;
  transition: 0.5s;
  background-color: rgba(0, 0, 0, 0.6);
}
.cover {
  width: 100%;
  height: 100%;
  transition: 0.5s;
  background-color: rgba(0, 0, 0, 0.6);
}
.cover:hover {
  background-color: rgba(0, 0, 0, 0);
}
.chat {
  position: fixed;
  bottom: 100px;
  right: 15px;
  text-decoration: none;
  background-color: rgba(240, 240, 240, 0.5);
  padding: 0.5em;
  border-radius: 50%;
}
</style>
