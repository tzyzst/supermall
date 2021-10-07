<template>
  <div id="profile">
    <nav-bar class="nav-bar">
      <div slot="center">用户中心</div>
    </nav-bar>

    <user-info></user-info>

    <section class="account">
      <div class="account-item">
        <div class="number">
          <span class="balance">0.00</span>元
        </div>
        <div class="account-info">余额</div>
      </div>

      <div class="account-item">
        <div class="number">
          <span class="balance">0</span>个
        </div>
        <div class="account-info">优惠</div>
      </div>

      <div class="account-item">
        <div class="number">
          <span class="balance">0</span>分
        </div>
        <div class="account-info">积分</div>
      </div>
    </section>

    <list-view :list-data="orderList" class="order-list"></list-view>
    <list-view :list-data="serviceList" class="service-list"></list-view>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import UserInfo from './childComps/UserInfo';
import ListView from './childComps/ListView';
export default {
  name: 'Profile',
  components: {
    NavBar,UserInfo,ListView
  },
  data: function () {
      return {
        orderList: [
          {src: require('../../assets/img/profile/message.svg'), info: '消息'},
          {src: require('../../assets/img/profile/pointer.svg'), info: '积分商城'},
          {src: require('../../assets/img/profile/vip.svg'), info: '会员卡'},
        ],
        serviceList: [
          {src:require('../../assets/img/profile/shopping.svg'), info: '购物车'},
          {src:require('../../assets/img/profile/shopping.svg'), info: '下载购物APP'},
        ]
      }
    },
}
</script>

<style scoped>
  .nav-bar {
  color: #fff;
  background-color: var(--color-tint);
  }
  .account {
    display: flex;
    border-bottom: solid 1px pink;
    border-top: solid 1px pink;
  }
  .account-item {
    width: 100%;
    background-color: #fff;
    margin-right: 1px;
    text-align: center;
  }
  .account-item:last-of-type {
    margin-right: 0;
  }
  .account-item {
    color: var(--color-high-text);
    font-size: 16px;
    padding: 18px;
  }
  .account-item .balance {
    font-size: 20px;
    font-weight: 700;
    color: black;
  }
  .account-info {
    margin-top: 6px;
  }
  .order-list, .service-list {
    margin-top: 12px;
  }
</style>

