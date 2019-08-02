<template>
  <div class="inquiry autoHeight">
    <div class="inquiry-list">
      <div class="inquiry-item" v-for=" (item , index) in reportList" @click="itemClick(item)">
        <div class="inquiry-itemCheck">
          <i
            class="iconfont"
            :class="{ 'icon-ziyuan': item.check , 'icon-danxuan-weixuan': !item.check} "
            @click.stop="radioClick(item)"
          ></i>
        </div>
        <div class="inquiry-itemView">
          <div class="inquiry-itemLogo"></div>
          <div class="inquiry-itemInfo">
            <div class="inquiry-itemTitle">
              <div class="inquiry-item__title">{{item.treateName}}</div>
              <div class="inquiry-item__money"><i class="iconfont icon-fl-renminbi"></i>5.00</div>
            </div>
            <div class="inquiry-itemPatient">
              <div class="itemPatient">{{item.patientName}}</div>
              <div
                class="itemDepartment"
                :class="{'itemFSK': item.deptCode === 'FSK', 'itemJYK': item.deptCode === 'JYK', 'itemCSK': item.deptCode === 'CSK'}"
              >{{item.deptName}}</div>
              <div class="itemPermission" v-if="item.viewPermission === '0'">未付费</div>
            </div>
            <div class="inquiry-itemDottom">
              <div class="itemHospital">{{item.hospitalName}}</div>
              <!-- 日期转换 -->
              <div class="itemDate">{{moment(item.treateDate).format('YYYY年MM月DD日')}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部按钮 -->
    <div class="bottom-style">
      <div class="bottom-body">
        <div class="bottom-left">
          <i
            class="iconfont"
            :class="{ 'icon-ziyuan': allRadio , 'icon-danxuan-weixuan': !allRadio}"
            @click="allRadioClick"
          ></i>
          <span class="allCheck">全选</span>
          <span class="reportNum">
            报告数量:
            <b v-text="orderLength"></b>份
          </span>
        </div>
        <el-button type="primary" @click="nextOrder" class="bottom-right bottom-btn">下一步</el-button>
      </div>
    </div>
    <!-- 确认选择订单时候的弹框 -->
    <el-dialog title="确认支付" :visible.sync="dialogOrder">
      <div class="dialog-title">支付金额：20元</div>
      <div class="dialog-body">
        <div class="dialog-top">
          <p class="dialog-view">医院：&nbsp;&nbsp;{{noPermissionData.hospitalName}}</p>
          <p class="dialog-view">科室：&nbsp;&nbsp;{{noPermissionData.deptName}}</p>
          <p class="dialog-view">项目名称：&nbsp;&nbsp;{{noPermissionData.treateName}}</p>
          <p class="dialog-view">检查时间：&nbsp;&nbsp;{{noPermissionData.treateDate}}</p>
        </div>
        <div class="dialog-bottom">
          <p class="dialog-tips">说明：一次支付20元保存15年</p>
          <el-button class="dialog-button" @click="payReport">立即支付</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { GetReportList } from "@/https/api";
import { mapGetters, mapMutations, mapState } from "vuex";
// moment定义组件
export default {
  data() {
    return {
      moment: require("moment"),
      dialogOrder: false,
      allRadio: false,
      reportList: [
        {
          hospitalCode: "51070101",
          hospitalName: "绵阳市中心医院",
          deptCode: "FSK",
          deptName: "放射科",
          patientName: "周明灿1",
          age: "78 岁",
          sex: "男",
          cardNumber: "600256987",
          treateDate: "2019-02-01 12:00:00",
          treateName: "胸部 CT 平扫阿达萨达所多撒多多大阿斯顿as大萨达阿斯顿as都",
          primaryKey:
            "JYK|319031604699|肝 2 肾 2 血脂 2|600673645|201903231053",
          viewPermission: "1",
          check: false
        },
        {
          hospitalCode: "51070101",
          hospitalName: "绵阳市中心医院",
          deptCode: "CSK",
          deptName: "超声科",
          patientName: "周明灿2",
          age: "78 岁",
          sex: "男",
          cardNumber: "600256987",
          treateDate: "2019-02-04 12:00:00",
          treateName: "胸部 CT 平扫",
          primaryKey:
            "JYK|319031604699|肝 2 肾 2 血脂 2|600673645|201903231053",
          viewPermission: "1",
          check: false
        },
        {
          hospitalCode: "51070101",
          hospitalName: "绵阳市中心一号医院",
          deptCode: "JYK",
          deptName: "检验科",
          patientName: "周明灿2",
          age: "78 岁",
          sex: "男",
          cardNumber: "600256987",
          treateDate: "2019-02-04 12:00:00",
          treateName: "胸部 CT 平扫",
          primaryKey:
            "JYK|319031604699|肝 2 肾 2 血脂 2|600673645|201903231053",
          viewPermission: "1",
          check: false
        },
        {
          hospitalCode: "51070101",
          hospitalName: "绵阳市中心一号医院",
          deptCode: "JYK",
          deptName: "检验科",
          patientName: "周明灿2",
          age: "78 岁",
          sex: "男",
          cardNumber: "600256987",
          treateDate: "2019-02-04 12:00:00",
          treateName: "胸部 CT 平扫",
          primaryKey:
            "JYK|319031604699|肝 2 肾 2 血脂 2|600673645|201903231053",
          viewPermission: "0",
          check: false
        }
      ],
      noPermissionData: {},
      orderLength: 0
    };
  },
  computed: {
    ...mapGetters({
      userInfo: "user/userInfoGetter",
      activeIndex: "system/activeMenuGetter",
      primaryKey: "commitOrder/myReportprimaryKeyGetter",
      primaryKeyList: "commitOrder/primaryKeyListGetter",
      getReportListData:  "selectReport/reportListGetter",
    })
  },
  created () { 
    
    if(this.getReportListData.length > 0){
      this.reportList = this.getReportListData
    }
  },
  components: {},
  watch: {
    reportList: {
      // 深度监听
      handler: function(newVal) {
        var orderArray = [];
        // 获得所有有权限的报告的聚合
        let election = [];
        for (var i in newVal) {
          // //  每次变化判断是否有权限 放置其 election
          // if (newVal[i].viewPermission !== "0") {
          //   election.push(newVal[i]);
          // }
          //  点击为 '勾' 时 添加到订单数组里面
          if (newVal[i].check) {
            orderArray.push(newVal[i].title);
          }
        }
        this.orderLength = orderArray.length;
        //  对比长度相等 是不是被全部勾选
        if (this.orderLength == newVal.length) {
          this.allRadio = true;
        } else {
          this.allRadio = false;
        }
        // if (this.orderLength == election.length) {
        //   this.allRadio = true;
        // } else {
        //   this.allRadio = false;
        // }
      },
      deep: true //深度监听
    }
  },
  mounted() {
    this.setActive("/selectReport");
    this.$router.push({ path: this.activeIndex });
    this.getReportList();
  },
  methods: {
    ...mapMutations({
      setUserInfo: "user/userMutation",
      setActive: "system/activeBaseMutation",
      setOrder: "orderStore/orderStoreMutation",
      setPrimaryKey: "commitOrder/myReportprimaryKeyMutation",
      setPrimaryKeyList: "commitOrder/primaryKeyListMutation",
      setreportList: 'selectReport/reportListMutation'
    }),
    async getReportList() {
      let param = {
        productId: "51070101JYK201907230912019055yj",
        hospitalName: "绵阳市中心医院"
      };
      const [data, success] = await GetReportList(param);
      if (success) {
        this.reportList = res[0].respData;
      }
    },
    itemClick(data) {
      if (data.viewPermission !== "0") {
        this.setPrimaryKey(data.primaryKey);
        this.setreportList( this.reportList )
        this.$router.push({ path: "/myReport" });
      } else {
        //  给无权限的对象赋值 展示支付弹窗

        this.noPermissionData = data;

        this.dialogOrder = !this.dialogOrder;
      }
    },
    payReport() {
      console.log("支付订单");
    },
    //  单个点击
    radioClick(data) {
      //  有权查看 勾选可以改变
      data.check = !data.check;
    },
    //  全选
    allRadioClick() {
      this.allRadio = !this.allRadio;
      if (this.allRadio) {
        for (var i in this.reportList) {
          // if (this.reportList[i].viewPermission !== "0") {
            this.reportList[i].check = true;
          // }
        }
      } else {
        for (var i in this.reportList) {
          // if (this.reportList[i].viewPermission !== "0") {
            this.reportList[i].check = false;
          // }
        }
      }
    },
    //  下一步进入订单创建
    nextOrder() {
      if (this.orderLength > 0) {
        let hospitalNameArray = [];
        let primaryKeyArray = [];
        this.reportList.forEach((item, index) => {
          if (item.check) {
            hospitalNameArray.push(item.hospitalName);
            primaryKeyArray.push(item.primaryKey);
          }
        });
        let lang = new Set(hospitalNameArray).size;
        if (lang > 1) {
          this.$message({
            message: "请选择同一家医院",
            type: "error"
          });
          return false;
        }

        //  写入订单的list 进入提交订单使用
        this.setPrimaryKeyList(primaryKeyArray.join("KNOT"));

        this.setOrder("newOrder");
        
        this.$router.push({ path: "/orderDetails" });
      } else {
        this.$message({
          showClose: true,
          message: "请选择报告",
          type: "warning"
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.inquiry {
  background: #fff;
  padding-bottom: 60px;
  width: 100%;
  .inquiry-list {
    background: #fff;
    padding: 0 12px;
    padding-bottom: 65px;
    width: calc(100% - 24px);
    .inquiry-item {
      display: flex;
      border-bottom: 1px solid #f3f3f3;
      padding: 18px 0;
      width: 100%;
      .inquiry-itemCheck {
        width: 30px;
        line-height: 64px;
        .icon-disabled {
          background: #151414;
          border-color: #151414;
          border-radius: 50%;
        }
      }
      .inquiry-itemView {
        flex: 1;
        display: flex;
        width: calc(100% - 30px);
        .inquiry-itemLogo {
          width: 68px;
          height: 68px;
          border-radius: 50%;
          margin-right: 15px;
          background: #2d2d2d;
        }
        .inquiry-itemInfo {
          flex: 1;
          width: calc(100% - 83px);
          .inquiry-itemTitle {
            font-size: 17px;
            color: #202020;
            line-height: 25px;
            display: flex;
            .inquiry-item__title{
              font-size: 17px;
              flex: 1;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
            }
            .inquiry-item__money{
              margin-left: 12px;
              i.iconfont{
                font-size: 12px;
              }
            }
          }
          .inquiry-itemPatient {
            font-size: 14px;
            line-height: 23px;
            display: flex;
            .itemPatient {
              color: #333333;
              margin-right: 10px;
            }
            .itemDepartment {
              border: 1px solid #0a8dd2;
              border-radius: 2px;
              font-size: 12px;
              height: 15px;
              line-height: 15px;
              margin-top: 4px;
              color: #0a8dd2;
              padding: 0 5px;
            }
            .itemDepartment.itemFSK {
              border: 1px solid #0a8dd2;
              color: #0a8dd2;
            }
            .itemDepartment.itemCSK {
              border: 1px solid #d58f3a;
              color: #d58f3a;
            }
            .itemDepartment.itemJYK {
              border: 1px solid #36a37c;
              color: #36a37c;
            }
            // 无权查看的样式
            .itemPermission {
              color: #6f6f6f;
              flex: 1;
              font-size: 12px;
              text-align: right;
            }
          }
          .inquiry-itemDottom {
            font-size: 12px;
            line-height: 20px;
            display: flex;
            .itemHospital {
              flex: 1;
              color: #414141;
            }
            .itemDate {
              text-align: right;
              flex: 1;
              color: #858585;
            }
          }
        }
      }
    }
  }
  //@at-root 最下面底部样式
  /deep/ .bottom-body {
    display: flex;
    padding: 10px 12px 9px 12px;
    height: 35px;
    .bottom-left {
      flex: 1;
      height: 100%;
      line-height: 35px;
      .allCheck {
        padding: 0 14px;
        font-size: 18px;
        color: #2d2d2d;
      }
      .reportNum {
        font-size: 14px;
        color: #2d2d2d;
      }
    }
    .bottom-right {
      height: 35px;
      width: 126px;
      border-radius: 22px;
    }
  }
  /deep/ .iconfont {
    font-size: 20px;
  }
  .iconfont.icon-danxuan-weixuan {
    border-color: #b5b5b5;
    opacity: 0.6;
  }
  .iconfont.icon-ziyuan {
    color: #37b4f5;
    border-color: #37b4f5;
  }
  //  弹框
  /deep/ .el-dialog {
    width: calc(100% - 84px);
    padding: 0 12px;
    .el-dialog__header {
      padding: 14px 0;
      border-bottom: 1px solid #e6e6e6;
      .el-dialog__title {
        color: #6f6f6f;
        font-size: 15px;
        line-height: 16px;
      }
      .el-dialog__headerbtn {
        font-size: 18px;
        color: #6f6f6f;
        font-weight: 600;
        .el-icon {
          font-size: 18px;
          color: #6f6f6f;
          font-weight: 600;
        }
      }
    }
    .el-dialog__body {
      padding: 24px 0 32px 0;
      .dialog-title {
        font-size: 18px;
        line-height: 18px;
        text-align: center;
        color: #252525;
        padding-bottom: 30px;
      }
      .dialog-body {
        background: #f5f5fa;
        .dialog-top {
          background: #fff;
          padding-bottom: 10px;
          .dialog-view {
            padding-bottom: 20px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }
        }
        .dialog-bottom {
          margin-top: 6px;
          padding-top: 15px;
          background: #fff;
          .dialog-tips {
            color: #6f6f6f;
            font-size: 15px;
            line-height: 18px;
          }
          .dialog-button {
            margin-top: 48px;
            width: 214px;
            background-image: linear-gradient(90deg, #1dd8f8 0%, #05a1f3 100%);
            height: 35px;
            line-height: 35px;
            color: #ffffff;
            padding: 0;
            margin-left: calc(50% - 107px);
            border-radius: 18px;
          }
        }
      }
    }
  }
}
</style>
