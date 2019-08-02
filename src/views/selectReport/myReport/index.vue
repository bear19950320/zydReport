<template>
  <div class="inquiry autoHeight">
    
  </div>
</template>
<script>
// 获取图片
import { GetReportOssAddress } from '@/https/api'
import { mapGetters, mapMutations, mapState } from "vuex";
// moment定义组件
export default {
  data() {
    return {
      moment : require('moment'),
    };
  },
  computed: {
    ...mapGetters({
      userInfo: "user/userInfoGetter",
      activeIndex: "system/activeMenuGetter",
      primaryKey: 'commitOrder/myReportprimaryKeyGetter'
    })
  },
  components: {},
  watch: {
    
  },
  mounted() {
    this.setActive("/myReport");
    this.$router.push({ path: this.activeIndex });
  },
  methods: {
    ...mapMutations({
      setUserInfo: "user/userMutation",
      setActive: "system/activeBaseMutation",
      setOrder: "orderStore/orderStoreMutation",
      setPrimaryKey: 'commitOrder/myReportprimaryKeyMutation'
    }),
    async getOssAndImg (){
      let param ={
        primaryKey: this.primaryKey,
      }
      const [data, success] = await GetReportOssAddress(param)
        if (success) {
          this.reportList = res[0].respData;
        }
    },
  }
};
</script>

<style lang="scss" scoped>
.inquiry {
  background: #f6f6f6;
  padding-bottom: 60px;
  
}
</style>
