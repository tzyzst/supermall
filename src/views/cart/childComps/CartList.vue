<template>
   <div class="cart-list">
     <scroll class="content" ref="scroll">
       <cart-list-item v-for="(item, index) in cartListItem" :key="index" :item-info="item">
       </cart-list-item>
       <!-- <ul>
         <li v-for="(item, index) in cartListItem" :key="index">{{item}}</li>
       </ul> -->
     </scroll>
   </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'
  import CartListItem from './CartListItem';
   export default {
     name: 'CartList',
     components: {
       Scroll,CartListItem
     },
      computed: {
        cartListItem() {
          return this.$store.state.cartList
        }
      },
      activated() {
        this.$refs.scroll.refresh()
      }
   }
</script>

<style scoped>
  .cart-list {
    position: relative;
  }
  .content {
    height: calc(100vh - 44px -58px -40px);
    overflow: hidden;
  }
</style>