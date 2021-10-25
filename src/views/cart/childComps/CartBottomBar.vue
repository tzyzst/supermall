<template>
<div class="bottom-bar">
    <div class="check-content">
      <check-button
        class="check-button"
        :is-checked="isSelectAll"
      @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>
    <div class="count">
      合计 ¥: {{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">去计算 : ({{checkLength}})</div>
</div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";
export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  // data(){
  //   return{
  //   check: false
  //   }
  // },
  methods: {
    checkClick(){
      if (this.isSelectAll){  //全部选中
        this.$store.state.cartList.forEach(item => item.checked = false)
      } else {
        this.$store.state.cartList.forEach(item => item.checked = true)
      }
      // this.$toast.methods.isShow
    },
    calcClick() {
      if (!this.isSelectAll) {
        
      }
    }
  },
  computed: {
    cartLength() {
      return this.$store.state.cartList.length;
    },
   totalPrice() {
      return this.$store.state.cartList.filter(item => item.checked).reduce((previousValue,item) => {
        return previousValue + item.price * item.count
      },0).toFixed(2)
   },
    checkLength() {
      return this.$store.state.cartList.filter(item => item.checked).reduce((previousValue,item) => {
        return previousValue + item.count
      },0)
    },
  //  是否全部选中
    isSelectAll() {
    // 法1 filter
    // if (this.$store.state.cartList.length === 0) return false
    // return !(this.$store.state.cartList.filter(item => !item.checked).length)
    
    // 法2 find (此法的性能高一点)
    if (this.$store.state.cartList.length === 0) return false
    return !this.$store.state.cartList.find(item => !item.checked)

    // 法3 普通遍历
    // if (this.$store.state.cartList.length === 0) return false
    // for (let item of this.cartList){
    //   if (!item.checked){
    //     return isChecked
    //   }
    // }
    // return true

  }
  }
 }
</script>

<style scoped>
.bottom-bar {
  position: relative;
  background-color: #eee;
  /* bottom: 50px; */
  /* top: 50px; */
  display: flex;
  height: 40px;
  line-height: 40px;
}
.check-button {
  width: 20px;
  height: 20px;
   line-height: 20px;
  margin-right: 10px;
}
.check-content {
  display: flex;
  align-items: center;
  font-size: 13px;
  margin-left: 10px;
  width: 60px;
}
.count {
  color: #ff5777;
  padding-left: 50px;
  margin: 0 30px;
  flex: 1;
  font-size: 13px;
}
.calculate {
  width: 90px;
  color: white;
  text-align: center;
  background-color: #ff8198;
  font-size: 14px;
}
</style>
