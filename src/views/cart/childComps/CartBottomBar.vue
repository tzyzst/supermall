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
      合计¥:{{totalprice}}
    </div>
    <div class="calc">去计算:{{checkLength}}</div>
</div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";
export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  data(){
    return{
    check: false
    }
  },
  // methods: {
  //   checkClick(){
  //     if (this.isSelectAll){
  //       this.$store.getters.cartList.forEach(item => item.isChecked = false)
  //     }else {
  //       this.$store.getters.cartList.forEach(item => item.isChecked = true)
  //     }
  //     this.$toast.methods.isShow
  //   }
  // },
  computed: {
    cartLength() {
      return this.$store.state.cartList.length
    },
  //  totalprice(){
  //     return   this.$store.getters.cartList.filter(item => item.isChecked
  //     ).reduce((previousValue,item) => {
  //       return previousValue + item.count * item.price
  //     },0)
  //  },
    checkLength(){
      return this.$store.state.cartList.filter(item => item.isChecked).reduce((previousValue,item) => {
        return previousValue + item.count
      },0)
    // },
  //   isSelectAll(){
  //     if (this.$store.state.cartList.length === 0) {
  //       return false
  //     }else {
  //       return !(this.$store.state.cartList.filter(item => !item.isChecked).length)
  //       }
      // return !(this.$store.state.cartList.filter(item => !item.isChecked).length)
      // return !this.cartList.find(item => !item.isChecked)
      // let isChecked = false;
      // for (let item of this.cartList){
      //   if (!item.isChecked){
      //     isChecked = false
      //     return isChecked
      //   }
      // }

    }
  },
 }
</script>

<style scoped>
.bottom-bar{
  background-color: #dbe5ec;
  position: absolute;
  bottom: 50px;
  display: flex;
  height: 40px;
  line-height: 40px;
}
.check-button{
  width: 20px;
  height: 20px;
   line-height: 20px;
  margin-right: 10px;
}
.check-content{
  display: flex;
  align-items: center;
  font-size: 13px;
  margin-left: 10px;
  width: 60px;
}
.count{
  color: #ff5777;
  padding-left: 50px;
  flex: 1;
  font-size: 13px;
}
.calc{
 width: 90px;
  color: white;
  text-align: center;
  background-color: #ff8198;
  font-size: 14px;
}
</style>
