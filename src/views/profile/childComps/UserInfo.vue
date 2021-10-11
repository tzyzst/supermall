<template>
   <div id="user-info">
    <a href="#" class="info-bar">
      <div class="icon-info">
        <div name="user-icon">
          <div class="user-icon">
            <img src="~assets/img/profile/user.svg" alt="" >
          </div>
        </div>
        <div class="login-info">
          <div name="user-nickname">
            <div>登录/注册</div>
          </div>
          <div class="phone">
            <span>
              <img src="~assets/img/profile/phone.svg" alt="">
            </span>
            <div name="user-phone" class="phonenum">暂无绑定手机号</div>
          </div>
        </div>
      </div>
      <div class="gt"></div>
    </a>
  </div>
</template>

<script>
   export default {
     name: 'UserInfo'
   }
</script>

<style scoped>
  #user-info {
    background-color: rgb(253, 171, 178);
    /* background-color: var(--color-tint); */
    padding: 15px;
    margin-top: -5px;
  }
  .info-bar{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .user-icon {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  .user-icon img {
    position: absolute;
    width: 60px;
    height: 60px;
    left: 20px;
    top: 60px;
  }
  .icon-info {
    display: flex;
    align-items: center;
  }
  #user-info .arrow-svg {
    width: 11px;
    height: 22px;
    margin-top: 18px;
  }
  #user-info .login-info {
    font-size: 1.1rem;
    margin: 10px 0 0 10px;
  }
  #user-info .login-info .phone {
    position: relative;
    font-size: 1rem;
    margin-top: 5px;
    margin-left: 15px;
    font-weight: 300;
  }
  #user-info .login-info .phone img {
    position: absolute;
    width: 21px;
    height: 21px;
    left: -20px;
    top: -2px;
  }
  .login-info {
    color: #fff;
  }
  .gt {
     width: 12px;
     height: 12px;
     border-top: 2px solid #ffffff;
     border-right: 2px solid #ffffff;
     transform: rotate(45deg);
  }
  .phonenum {
    font-size: 16px;
  }
</style>