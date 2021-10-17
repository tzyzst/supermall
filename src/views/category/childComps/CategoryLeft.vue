<template>
   <scroll class="content">
      <div class="CategoryLeft">

          <div class="tabcontorl" v-for="(item,index) in titles" :key="index"  @click="itemClick(index)">
            <div :class="{active: index === currentIndex}">
            {{item.title}}
            </div>
          </div>

      </div>
   </scroll>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll';

   export default {
     name: 'CategoryLeft',
     components: {
       Scroll
     },
     data() {
       return {
         currentIndex: 0
       }
     },
     props: {
       titles: {
         type: Array,
         default() {
           return []
         }
       }
     },
     methods:{
       itemClick(index) {
        this.currentIndex = index;
        // console.log(this.currentIndex);
        this.$emit('tabClick', index)
      }
     }
   }
</script>

<style scoped>
  .content {
    height: calc(100vh - 93px);
    overflow: hidden;
  }
  .CategoryLeft {
    display: flex;
    flex-direction: column;
    background-color: rgb(246, 246, 246);
    width: 100px;
    height: 100vh;
  }
  .tabcontorl {
    flex: 1;
    font-size: 15px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    padding: 8px 0;
    padding-right: 15px;
  }
  .active {
    color: var(--color-high-text);
    border-left: 3px solid var(--color-tint);
    background-color: #fff;
  }
</style>