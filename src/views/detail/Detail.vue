<template>
   <div id="detail">
     <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
     <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
       <!-- <ul>
         <li v-for="(item, index) in $store.state.cartList" :key="index">
           {{item}}
         </li>
       </ul> -->
       <detail-swiper :top-images="topImages"/>
       <detail-base-info :goods="goods"/>
       <detail-shop-info :shop="shop"/>
       <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
       <detail-param-info ref="params" :paramInfo="paramInfo"/>
       <detail-comment-info ref="comment" :comment-info="commentInfo"/>
       <goods-list ref="recommend" :goods="recommends"/>
     </scroll>
     <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    <toast message="哈哈哈" :show="show"/>
   </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar';
import DetailSwiper from './childComps/DetailSwiper';
import DetailBaseInfo from './childComps/DetailBaseInfo';
import DetailShopInfo from './childComps/DetailShopInfo';
import DetailGoodsInfo from './childComps/DetailGoodsInfo';
import DetailParamInfo from './childComps/DetailParamInfo';
import DetailCommentInfo from './childComps/DetailCommentInfo';
import DetailBottomBar from './childComps/DetailBottomBar';
import BackTop from 'components/content/backTop/BackTop';


import Scroll from 'components/common/scroll/Scroll';
import GoodsList from 'components/content/goods/GoodsList';
import Toast from 'components/common/toast/Toast'

import {getDetail, Goods, GoodsParam, Shop, getRecommend} from 'network/detail';
// import {debounce} from 'common/utils';

   export default {
     name: 'Detail',
     components: {
       DetailNavBar,
       DetailSwiper,
       DetailBaseInfo,
       DetailShopInfo,
       DetailGoodsInfo,
       DetailParamInfo,
       DetailCommentInfo,
       DetailBottomBar,
       GoodsList,
       Toast,
       BackTop,
       Scroll
     },
     data() {
       return {
         iid: null,
         topImages: [],
         goods: {},
         shop: {},
         detailInfo: {},
         paramInfo: {},
         commentInfo: {},
         recommends: {},
         themeTopYs: [],
         getThemTopY: null,
         currentIndex: 0,
         isShowBackTop: false,
         message: '',
         show: false
       }
     },
     created() {
      //  1.保存传入的iid
       this.iid = this.$route.params.iid

      //  2.根据iid请求详情数据
       getDetail(this.iid).then(res => {
        //  1.获取顶部轮播图数据
        const data = res.result;

        this.topImages = data.itemInfo.topImages;

        // 2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

        // 3.创建商铺信息对象
        this.shop = new Shop(data.shopInfo);

        // 4.获取商品详细信息
        this.detailInfo = data.detailInfo;

        // 5.保存参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        // 6.取出评论信息
        if(data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }

        // 根据最新数据，对应的DOM是已经被渲染出来
        // 但是图片依然没有加载完，即目前的offsetTop值不包含图片的
        // this.$nextTick(() => {
        //   this.themeTopYs = [];
        //   this.themeTopYs.push(0);
        //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        //   console.log(this.themeTopYs);
        // })
       })
      // 3.请求推荐数据
       getRecommend().then(res => {
        this.recommends = res.data.list
       })
      //  4.getThemTopY赋值
        // this.getThemTopY = debounce(() => {
        //   this.themeTopYs = [];
        //   this.themeTopYs.push(0);
        //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        //   console.log(this.themeTopYs);
        // }, 1000)
     },
      // updated() {
      //   this.themeTopYs = [];
      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      //   console.log(this.themeTopYs);
      // },
     methods: {
       imageLoad() {
         this.$refs.scroll.refresh();
        //  this.getThemTopY();
       },
       titleClick(index) {
         this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500);
          // setTimeout(() => {
          this.themeTopYs = [];
          this.themeTopYs.push(0);
          this.themeTopYs.push(this.$refs.params.$el.offsetTop);
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
          console.log(this.themeTopYs);
        // }, 100)
       },
       contentScroll(position) {
        //  1.获取y值
        const positionY = -position.y;
        // 2.positionY和主题中值进行对比
        let tTlength = this.themeTopYs.length;
        for(let i = 0; i < tTlength ; i++) {
          if (this.currentIndex !== i && ((i < tTlength - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i === tTlength -1 && positionY >= this.themeTopYs[i]))) {
            this.currentIndex = i;
            console.log(this.currentIndex);
            this.$refs.nav.currentIndex = this.currentIndex;
          }
        }
        // 1.判断BackTop是否显示
       this.isShowBackTop = (-position.y) > 1000;
       },
       // 1.滚回顶部
        backClick() {
          this.$refs.scroll.scrollTo(0,0,500);
        },
         //加入购物车
        addToCart() {
          //1.获取数据
          const product = {}
          product.image = this.topImages[0];
          product.title = this.goods.title;
          product.desc = this.goods.desc;
          product.price = this.goods.nowPrice;
          product.iid = this.iid;
          console.log(product);

          // 2.添加购物车
          // this.$store.commit('addCart', product)
          this.$store.dispatch('addCart', product).then(res => {
            this.show = true;
            this.message = res;

            setTimeout(() => {
              this.show = false;
              this.message = '';
            },1500)
            console.log(res);  // 添加购物车成功
          })
         
        }
     }
   }
</script>

<style scoped>
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content {
    height: calc(100vh - 44px );
    overflow: hidden;
  }
</style>