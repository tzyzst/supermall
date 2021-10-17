<template>
  <div class="wrapper">

    <nav-bar class="nav-bar">
      <div slot="center">分类</div>
    </nav-bar>

    <div class="leftRight">
      <category-left :titles="categoryLists" @tabClick="tabClick"/>
      <category-right :products="showUpGoods" :showGoods="showBottomGoods"/>
    </div>
  
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll';
  import NavBar from "components/common/navbar/NavBar";
  import CategoryLeft from "./childComps/CategoryLeft.vue";
  import CategoryRight from "./childComps/CategoryRight.vue"

  import {getCategory, getSubcategory, getCategoryDetail} from "network/category";
export default {
  name: 'Category',
  data() {
    return {
      categoryLists: [],
      maitKeyArray: [],
      miniWallkeyArray: [],
      goodsDataUp: [],
      goodsDatasBottomDetail: [],
      showUpGoods: [],
      showBottomGoods: []
    }
  },
  components: {
    NavBar,CategoryLeft,CategoryRight,Scroll
  },
  created() {
    //  组件创建后，可以发送网络请求
    
    // getCategory().then(res => {
    //     // 1.分类页面的全部数据
    //     this.categoryLists = res.data.category.list;

    //     // 获取网络请求所需要的参数
    //     for (let i = 0; i < this.categoryLists.length; i++) {
    //       this.maitKeyArray[i] = this.categoryLists[i].maitKey;
    //       this.miniWallkeyArray[i] = this.categoryLists[i].miniWallkey;

    //     // 2.获取列表上部商品数据
    //       getSubcategory(this.maitKeyArray[i]).then(res => {
    //         // console.log(res);
    //         this.goodsDataUp[i] = res.data.list;
    //         this.showUpGoods = this.goodsDataUp[0];
    //       })
    //     //3. 获取列表下部商品细节详细数据
    //        getCategoryDetail(this.miniWallkeyArray[i]).then(res => {
    //         //  console.log(res);
    //          this.goodsDatasBottomDetail[i] = res;
    //          this.showBottomGoods = this.goodsDatasBottomDetail[0];
    //       })
    //     }
    //   })

    // 调用getCategory等方法，具体请求写在methods里，用方法封装
    this.getCategory();
  },
  methods: {
    getCategory() {
      getCategory().then(res => {
        // 1.分类页面的全部数据
        this.categoryLists = res.data.category.list;

        // 获取网络请求所需要的参数
        for (let i = 0; i < this.categoryLists.length; i++) {
          this.maitKeyArray[i] = this.categoryLists[i].maitKey;
          this.miniWallkeyArray[i] = this.categoryLists[i].miniWallkey;

        // 2.获取列表上部商品数据
          getSubcategory(this.maitKeyArray[i]).then(res => {
            // console.log(res);
            this.goodsDataUp[i] = res.data.list;
            // 上部的默认显示数据
            this.showUpGoods = this.goodsDataUp[0];
          })
        //3. 获取列表下部商品细节详细数据
           getCategoryDetail(this.miniWallkeyArray[i]).then(res => {
            //  console.log(res);
             this.goodsDatasBottomDetail[i] = res;
            //  下部的默认显示数据
             this.showBottomGoods = this.goodsDatasBottomDetail[0];
          })
        }
      })
    },
    
    // //* 点击上下切换相关*//
    tabClick(index) {
      this.showUpGoods = this.goodsDataUp[index];
      this.showBottomGoods = this.goodsDatasBottomDetail[index];
    }
  }
}
</script>

<style scoped>

  .leftRight {
    display: flex;
  }
  .nav-bar {
  color: #fff;
  background-color: var(--color-tint);
  }

</style>
