<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ cartLength }})</div>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list />
    <!-- 汇总 -->
    <cart-bottom-bar style="position: fixed; bottom: 48px; left: 0; right: 0" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from "./childComps/CartList";
import CartBottomBar from "./childComps/CartBottomBar";
export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar,
  },
  computed: {
    cartLength() {
      return this.$store.state.cartList.length;
    },
  },
};
</script>

<style scoped>
.cart {
  height: 100vh;
}
.nav-bar {
  color: #fff;
  background-color: var(--color-tint);
}
</style>