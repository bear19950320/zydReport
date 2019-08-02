<template>
  <div class="inquiry autoHeight">
    <div class="inquiry-header">
      <div class="header-action__bar">
        <el-button class="header-action__button" :disabled="pageIndex <= 1" round @click="reportPage(0)">
          <i class="el-icon-caret-left"></i>上一份
        </el-button>
        <div class="header-action__pageNum">{{pageIndex}}/{{reportCompltetList.length}}</div>
        <el-button
          class="header-action__button"
          :disabled="pageIndex > 1 && pageIndex <= reportCompltetList.length"
          round @click="reportPage(1)"
        >
          下一份
          <i class="el-icon-caret-right"></i>
        </el-button>
      </div>
    </div>
    <!-- 底部按钮 -->
    <div class="bottom-style">
      <el-button type="primary" class="bottom-btn" @click="selectReport">查看报告单</el-button>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapState } from "vuex";

export default {
  data() {
    return {
      pageIndex: 0,
      reportData: {},
    };
  },
  computed: {
    ...mapGetters({
      activeIndex: "system/activeMenuGetter",
      activeTitle: "system/activeTitleGetter",
      reportCompltetList: "reportCompltet/reportCompltetGetter"
    })
  },
  created() {
    this.setActiveTitle(this.activeTitle);

    for (var i in this.reportCompltetList) {
      // activeTitle
      if (this.reportCompltetList[i].caseAll == this.activeTitle) {
        this.pageIndex = Number(i) + 1;
        break;
      }
    }
  },
  components: {},
  mounted() {
    this.setActive("/reportComplete");

    this.$router.push({ path: this.activeIndex });
  },
  methods: {
    ...mapMutations({
      setActive: "system/activeBaseMutation",
      setActiveTitle: "system/activeTitleMutation"
    }),
    // 获取微信id
    async getWechat() {},
    reportPage(num) {
        let pageflag = num == 0 ? -1 : 1
        for(var i in this.reportCompltetList){

            if (this.reportCompltetList[i].caseAll == this.activeTitle) {

                this.pageIndex = Number(i) + 1 + pageflag;

                this.reportData = this.reportCompltetList[Number(i) + pageflag]
                
                break;
            }

        }
        console.log(this.reportData,'reportData',this.pageIndex)
        this.setActiveTitle(this.reportData.caseAll);
    },
    selectReport() {
        
    }
  },
  destroyed () {//  离开页面钩子函数去掉session title
    this.setActiveTitle('');
  }
};
</script>

<style lang="scss" scoped>
.inquiry {
  background: #f6f6f6;
  padding-bottom: 60px;
  //  头部banner
  .inquiry-header {
    background: #fff;
    padding: 12px;
    .header-action__bar {
      width: 80%;
      margin: 0 auto;
      display: flex;
      .header-action__pageNum {
        width: calc(100% - 180px);
        text-align: center;
        height: 30px;
        font-size: 12px;
        color: #494949;
        line-height: 30px;
      }
      .header-action__button {
        padding: 0;
        height: 30px;
        width: 90px;
        font-size: 12px;
        background: #39abfc;
        color: #fff;
        &.is-disabled {
          color: #707070;
          background: #ffffff;
          border: solid 1px #aaaaaa;
        }
      }
    }
  }

  /deep/ .bottom-btn {
    margin-left: calc(50% - 164px);
    margin-top: 4px;
    height: 45px;
    width: 328px;
    border-radius: 22px;
    background-image: linear-gradient(90deg, #1dd8f8 0%, #05a1f3 100%);
    background-color: #05a1f3;
    border-color: #fff;
  }
}
</style>
