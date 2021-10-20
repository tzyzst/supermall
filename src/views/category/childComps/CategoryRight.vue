<template>
  <scroll class="content" :probe-type="3" @scroll="contentScroll">
    <div id="CategoryRight">

      <tab-control class="goodsBottom Fixed" v-show="isTabFixed" :titles="['综合', '新品', '销量']" @tabClick="tabClickRight" ref="tabTop"/>

      <div class="goods" v-for="(item, index) in products" :key="index">
        <div class="picture">
          <a :href="item.link">
            <img :src="item.image" alt="" @load="upImageLoad"/>
            {{ item.title }}
          </a>
        </div>
      </div>

      <tab-control class="goodsBottom" :titles="['综合', '新品', '销量']" @tabClick="tabClickRight" ref="tabTop"/>

      <goods-list :goods="showGoods" style="width:100%"/>
    
      
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
  data() {
    return {
      currentType: 'pop',
      tabOffsetTop: 0,
      isTabFixed: false
    }
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
  methods: {
    tabClickRight(index) {
      // console.log(index);
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$emit('IfType', this.currentType)
    },

    // 1. 等待图片加载完成，取到真实的距离
    upImageLoad() {
      // console.log(this.$refs.tabTop.$el.offsetTop);
      this.tabOffsetTop = this.$refs.tabTop.$el.offsetTop;
    },

    // 2.判断 返回顶部 要隐藏的距离
    // 记得侦测scroll的 :probe-type="3"
    contentScroll(position) {
      // console.log(position);
      // 决定tabControl是否吸顶(position: fixed)
      this.isTabFixed = (-position.y) > this.tabOffsetTop;
    }
  }
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
  margin: 8px auto;
}
.Fixed {
  background-color: pink;
  position: fixed;
  top: 0;
  left: 0;
}
.goods {
  width: 33%;
}
.goodsBottom {
  width: 100%;
}
.picture {
  font-size: 13px;
  text-align: center;
}
</style>