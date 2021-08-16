<template>
   <div id="detail">
     <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
     <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
       <detail-swiper :top-images="topImages"/>
       <detail-base-info :goods="goods"/>
       <detail-shop-info :shop="shop"/>
       <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
       <detail-param-info ref="params" :paramInfo="paramInfo"/>
       <detail-comment-info ref="comment" :comment-info="commentInfo"/>
       <goods-list ref="recommend" :goods="recommends"/>
     </scroll>
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

import Scroll from 'components/common/scroll/Scroll';
import GoodsList from 'components/content/goods/GoodsList';

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
       GoodsList,
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
         currentIndex: 0
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
        // }, 100)
     },
      updated() {
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        // console.log(this.themeTopYs);
      },
     methods: {
       imageLoad() {
         this.$refs.scroll.refresh();
        //  this.getThemTopY();
       },
       titleClick(index) {
         this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100);
       },
       contentScroll(position) {
        //  console.log(position);
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
    height: calc(100vh - 44px);
  }
</style>