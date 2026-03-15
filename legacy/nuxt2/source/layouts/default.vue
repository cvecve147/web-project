<template>
  <v-app id="inspire" itemscope itemtype="http://schema.org/Product">
    <v-app-bar app color="indigo" dark>
      <div class="d-flex justify-space-around w-100">
        <v-toolbar-title itemprop="name"> 芳嚮桿手作坊</v-toolbar-title>
        <div class="cursor">
          <div v-if="todos.length" @click="dialog3 = true">
            <v-badge color="red" :content="todos.length"
              ><v-icon>shopping_cart</v-icon></v-badge
            >
          </div>
          <div v-else @click="dialog3 = true">
            <v-icon>shopping_cart</v-icon>
          </div>
        </div>
      </div>
      <v-dialog v-model="dialog3" max-width="500px">
        <v-card v-if="todos.length > 0">
          <v-card-title>
            <span>購物車</span>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-card-text>
            <span
              v-for="item in todos"
              :key="item.name"
              class="text--primary d-flex align-center justify-space-around"
            >
              <span class="subtitle-1 font-weight-bold">商品名稱：</span>
              <span>{{ item.name }}</span>
              <button class="title font-weight-black" @click="item.number += 1">
                +
              </button>
              <input
                type="text"
                v-model="item.number"
                class="text-center"
                style="border-bottom:#e2e2e2 solid 1px;width:30px;"
              />
              <button
                class="title font-weight-black"
                @click="item.number > 0 ? (item.number -= 1) : item.number"
              >
                -
              </button>
              <span text class="red--text cursor" @click="remove(item.name)"
                >移除</span
              >
            </span>
          </v-card-text>
          <v-card-title>
            <span>購買列表</span>
            <p class="overline">
              按下下方購買按鈕即可複製，按下後請到FB或是Line
              貼上並填寫相關訊息後送出
            </p>
            <v-spacer></v-spacer>
          </v-card-title>
          <div id="copy">
            <ul>
              <li>姓名：</li>
              <li>
                品名：<span v-for="(item, index) in todos" :key="item.name">
                  {{ item.name }} * {{ item.number }}
                  {{ index == todos.length - 1 ? '' : '、' }}
                </span>
              </li>
              <li>連絡電話：</li>
              <li>交貨日期：</li>
              <li>面交地點：</li>
            </ul>
          </div>
          <v-card-actions class="d-flex justify-space-between ">
            <div class="ma-2">
              <v-btn color="primary" text @click="buy()">
                複製商品與格式
              </v-btn>
            </div>
            <div class="ma-2">
              <a
                class="mx-2"
                target="_block"
                href="https://www.facebook.com/%E8%8A%B3%E5%9A%AE%E6%A1%BF%E6%89%8B%E4%BD%9C%E5%9D%8A-113563920277515"
                >FB連結</a
              >
              <a
                href="https://www.instagram.com/handmade_0319/?hl=zh-tw"
                target="_block"
                class="mx-2"
                >IG連結</a
              >
              <span>Line:dt0319</span>
            </div>
          </v-card-actions>
        </v-card>
        <v-card v-else>
          <v-card-title>
            <span>購物車</span>
            <v-spacer></v-spacer>
          </v-card-title>
          <v-card-text>空空如也，快帶一些商品回家吧</v-card-text>
        </v-card>
      </v-dialog>
    </v-app-bar>

    <v-content>
      <nuxt-child />
    </v-content>
    <v-footer color="indigo" app class="d-flex justify-end">
      <span class="white--text"
        >Power by
        <a href="https://github.com/cvecve147" class="white--text">cvecve147</a>
        &copy; 2020</span
      >
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      dialog3: false
    }
  },
  methods: {
    copyText(element) {
      var range, selection, worked

      if (document.body.createTextRange) {
        range = document.body.createTextRange()
        range.moveToElementText(element)
        range.select()
      } else if (window.getSelection) {
        selection = window.getSelection()
        range = document.createRange()
        range.selectNodeContents(element)
        selection.removeAllRanges()
        selection.addRange(range)
      }

      try {
        document.execCommand('copy')
      } catch (err) {
        alert('系統異常 請重新整理後再次嘗試')
      }
    },
    buy() {
      var copyText = document.getElementById('copy')
      this.copyText(copyText)
      document.execCommand('copy')
      alert('已將您購物車裡的商品複製，傳至line、fb或是Ig 即可購買')
    },
    remove(val) {
      this.$store.commit('todos/remove', val)
    }
  },
  computed: {
    todos() {
      return this.$store.state.todos.list
    }
  }
}
</script>
<style>
* {
  font-family: 'Noto Sans TC', sans-serif, '微軟正黑體';
}
.w-100 {
  width: 100%;
}
.cursor {
  cursor: pointer;
}
</style>
