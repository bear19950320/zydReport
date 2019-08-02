<template>
  <div class="pageLayout">
    <div class="main">
      <router-view v-wechat-title="$route.meta.title= (activeTitle) ? activeTitle : $route.meta.title "></router-view>
    </div>
  </div>
</template>

<script>
import { InitOpenidController } from '@/https/api'
import { mapGetters, mapMutations , mapState } from 'vuex'
export default {
  data () {
    return { }
  },
  computed: {
    ...mapGetters({
      userInfo: 'user/userInfoGetter',
      activeIndex: 'system/activeMenuGetter',
      activeTitle: 'system/activeTitleGetter'
    }),
  },
  watch:{
    activeTitle (val){
      console.log(val,'activeTitle',this.$route.meta.title)
    }
  },
  components: {

  },
  mounted () {
    this.getWechat();
  },
  methods: {
    ...mapMutations({
      setUserInfo: 'user/userMutation',
      setActive: 'system/activeBaseMutation'
    }),
    // 获取微信id
    async getWechat(){
      //  获取路径code为 openId 
      let weChatCode=   '061hbop20Q2S0K1nlzm20wx4p20hbopn'//this.request('code')
      if ( !weChatCode ) {
        this.getWeixinCode();
      } else {
        
        if(!this.activeIndex){
          this.$router.push({ path: '/inquiry' })
        }else{
          this.$router.push({ path: this.activeIndex })
        }
        

        //  暂时先不请求拿去 openId 的 方法 直接 现在跳转到下一个页面操作
        // this.getDetailData(this.userInfo.userId)
      }
    },
    async getDetailData (weixinCode) {
      const [data, success] = await InitOpenidController({ code: weixinCode})
      if (success) {
        console.log(data)
      }
    },
    getWeixinCode() { //	判断weChat
        var appid = "wxa9f1f1203ab8ace4";
        //http://www.zhiyunduan.cn/zydWeb/zydReport/index.html
        var redirect_uri = encodeURIComponent("http://www.zhiyunduan.cn/zydWeb/zydReportTest2/index.html");
        // var redirect_uri = encodeURIComponent("http://www.zhiyunduan.cn/zydWeb/zydReportTest2/index.html");
        location="https://open.weixin.qq.com/connect/oauth2/authorize?appid="
        + appid + "&redirect_uri=" + redirect_uri
        + "&response_type=code&scope=snsapi_base&state=123&connect_redirect=1#wechat_redirect";
    },
    request(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = location.search.substr(1).match(reg);
      if (r != null) return unescape(decodeURI(r[2])); return null;
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/plugins/themes/themes.scss";
.pageLayout {
  .container {
    position: absolute;
    top: 60px;
    right: 0;
    bottom: 0;
    left: 0;
    background: $container-bg-color;
    overflow: hidden;
     .main {
       width: calc( 100vw - 135px );
       height: calc( 100vh - 60px );
        flex: 1;
        padding-left: 8px;
      }
  }
}
</style>
