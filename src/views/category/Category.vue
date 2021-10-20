<template>
  <div class="wrapper">

    <nav-bar class="nav-bar">
      <div slot="center">分类</div>
    </nav-bar>

    <div class="leftRight">
      <category-left :titles="categoryLists" @tabClickLeft="tabClickLeft"/>
      <category-right :products="showUpGoods" :showGoods="showBottomGoods" @IfType="IfType"/>
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
      showBottomGoods: [],
      BottomGoods: [],
      currentTypeNext: 'pop',
      indexLeft: 0,
    }
  },
  components: {
    NavBar,CategoryLeft,CategoryRight,Scroll
  },
  created() {
    //  组件创建后，可以发送网络请求
    // 具体请求写在methods里，用方法封装,调用getCategory方法
    this.getCategory();
  },
  methods: {
    getCategory() {
      getCategory().then(res => {
        // 1.分类页面左侧的标题数据、网络请求所需全部的参数
        this.categoryLists.push(...res.data.category.list) ;
        // // 获取网络请求所需要的参数
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
        //  将带有 [__ob__:observe] 的数据解析成可以遍历的数据，否则在其他函数里不能遍历
          // JSON.parse(JSON.stringify(this.miniWallkeyArray))
      })
    },

    // 点击上下切换
    tabClickLeft(index) {
      this.showUpGoods = this.goodsDataUp[index];
      if (this.currentTypeNext !== 'pop') {
            getCategoryDetail(this.miniWallkeyArray[index],this.currentTypeNext).then(res => {
              // console.log(res);
              this.showBottomGoods = res;
            })
        }
      
      this.showBottomGoods = this.goodsDatasBottomDetail[index];
      // 将index传入到IfType中
      this.indexLeft = index;
    },

  // 左右类型切换
    IfType(currentType) {
      console.log(currentType);
      this.currentTypeNext = currentType;
      getCategoryDetail(this.miniWallkeyArray[this.indexLeft],this.currentTypeNext).then(res => {
        // console.log(res);
        this.showBottomGoods = res;
      })
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
