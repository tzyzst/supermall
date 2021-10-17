<template>
  <scroll class="content">
    <div id="CategoryRight">

      <div class="goods" v-for="(item, index) in products" :key="index">
        <div class="picture">
          <a :href="item.link">
            <img :src="item.image" alt="" />
            {{ item.title }}
          </a>
        </div>
      </div>

      <div class="goodsBottom">
        <tab-control :titles="['综合', '新品', '销量']" />

        <goods-list :goods="showGoods" style="width:100%"/>
      </div>
      
      
    </div>
  </scroll>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
import TabControl from "components/content/tabControl/TabControl";

export default {
  name: "CategoryRight",
  components: {
    Scroll,
    GoodsList,
    TabControl,
  },
  props: {
    products: {
      type: Array,
      default() {
        return [];
      },
    },
    showGoods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {},
};
</script>

<style scoped>
.content {
  height: calc(100vh - 93px);
  overflow: hidden;
}
#CategoryRight {
  flex: 1;
  width: 100vw;
  padding-right: 80px;
  display: flex;
  flex-wrap: wrap;
}
#CategoryRight img {
  display: block;
  width: 75%;
  margin: 5px auto;
}
.goods {
  width: 50%;
}
.goodsBottom {
  width: 100%;
}
.picture {
  font-size: 13px;
  text-align: center;
}
</style>