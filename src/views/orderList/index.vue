<template>
  <div class="inquiry autoHeight" >
    <el-tabs v-model="activeOrder" ><!-- @tab-click="handleClick" -->
      <el-tab-pane label="全部" name="0">
        <div class="inquiry-list">
          <div class="inquiry-item autoHeight" v-for=" (item , index) in reportList " :key="index">
            <div class="inquiry-itemView" @click="orderInfo(item)">
              <div class="inquiry-itemView-top">
                <div class="inquiry-itemLogo"></div>
                  <div class="inquiry-itemInfo">
                    <div class="inquiry-itemTitle">
                      <div class="itemPatient">{{item.patient}}</div>
                      <div class="itemSex">女</div>
                      <div class="itemAge">23岁</div>
                      <div class="itemPrice">
                        <i class="iconfont icon-fl-renminbi"></i>5.00
                      </div>
                    </div>
                    <div class="inquiry-itemPatient">
                      <div class="itemTitle">{{item.title}}</div>
                      <div class="itemState" :class="item.status == 0 ? 'itemUnpaid' : item.status == 1 ? 'itemDecode' : 'itemDone'">{{item.status == 0 ? '未付款' : item.status == 1 ? '解读中' : '已完成'}}</div>
                    </div>
                    <div class="inquiry-itemDottom">
                      <div class="itemOpinion">{{item.opinionDepart}}</div>
                      <!-- <div class="itemDate">{{item.date}}</div> -->
                    </div>
                  </div>
              </div>
              <div class="inquiry-order">
                <div class="inquiry-orderCode">
                  订单号:{{item.orderCode}}
                </div>
                <div class="inquiry-orderDate">
                  {{item.date}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="待支付" name="1">
        <div class="inquiry-list">
          <div class="inquiry-item autoHeight" v-for=" (item , index) in reportList " v-if="item.status == 0 " :key="index">
            <div class="inquiry-itemView" @click="orderInfo(item)">
              <div class="inquiry-itemView-top">
                <div class="inquiry-itemLogo"></div>
                  <div class="inquiry-itemInfo">
                    <div class="inquiry-itemTitle">
                      <div class="itemPatient">{{item.patient}}</div>
                      <div class="itemSex">女</div>
                      <div class="itemAge">23岁</div>
                      <div class="itemPrice">
                        <i class="iconfont icon-fl-renminbi"></i>5.00
                      </div>
                    </div>
                    <div class="inquiry-itemPatient">
                      <div class="itemTitle">{{item.title}}</div>
                      <div class="itemState" :class="item.status == 0 ? 'itemUnpaid' : item.status == 1 ? 'itemDecode' : 'itemDone'">{{item.status == 0 ? '未付款' : item.status == 1 ? '解读中' : '已完成'}}</div>
                    </div>
                    <div class="inquiry-itemDottom">
                      <div class="itemOpinion">{{item.opinionDepart}}</div>
                      <!-- <div class="itemDate">{{item.date}}</div> -->
                    </div>
                  </div>
              </div>
              <div class="inquiry-order">
                <div class="inquiry-orderCode">
                  订单号:{{item.orderCode}}
                </div>
                <div class="inquiry-orderDate">
                  {{item.date}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="解读中" name="2">
         <div class="inquiry-list">
          <div class="inquiry-item autoHeight" v-for=" (item , index) in reportList " v-if="item.status == 1 " :key="index">
            <div class="inquiry-itemView" @click="orderInfo(item)">
              <div class="inquiry-itemView-top">
                <div class="inquiry-itemLogo"></div>
                  <div class="inquiry-itemInfo">
                    <div class="inquiry-itemTitle">
                      <div class="itemPatient">{{item.patient}}</div>
                      <div class="itemSex">女</div>
                      <div class="itemAge">23岁</div>
                      <div class="itemPrice">
                        <i class="iconfont icon-fl-renminbi"></i>5.00
                      </div>
                    </div>
                    <div class="inquiry-itemPatient">
                      <div class="itemTitle">{{item.title}}</div>
                      <div class="itemState" :class="item.status == 0 ? 'itemUnpaid' : item.status == 1 ? 'itemDecode' : 'itemDone'">{{item.status == 0 ? '未付款' : item.status == 1 ? '解读中' : '已完成'}}</div>
                    </div>
                    <div class="inquiry-itemDottom">
                      <div class="itemOpinion">{{item.opinionDepart}}</div>
                      <!-- <div class="itemDate">{{item.date}}</div> -->
                    </div>
                  </div>
              </div>
              <div class="inquiry-order">
                <div class="inquiry-orderCode">
                  订单号:{{item.orderCode}}
                </div>
                <div class="inquiry-orderDate">
                  {{item.date}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="已完成" name="3">
         <div class="inquiry-list">
          <div class="inquiry-item autoHeight" v-for=" (item , index) in reportList " v-if="item.status == 2 " :key="index">
            <div class="inquiry-itemView" @click="orderInfo(item)">
              <div class="inquiry-itemView-top">
                <div class="inquiry-itemLogo"></div>
                  <div class="inquiry-itemInfo">
                    <div class="inquiry-itemTitle">
                      <div class="itemPatient">{{item.patient}}</div>
                      <div class="itemSex">女</div>
                      <div class="itemAge">23岁</div>
                      <div class="itemPrice">
                        <i class="iconfont icon-fl-renminbi"></i>5.00
                      </div>
                    </div>
                    <div class="inquiry-itemPatient">
                      <div class="itemTitle">{{item.title}}</div>
                      <div class="itemState" :class="item.status == 0 ? 'itemUnpaid' : item.status == 1 ? 'itemDecode' : 'itemDone'">{{item.status == 0 ? '未付款' : item.status == 1 ? '解读中' : '已完成'}}</div>
                    </div>
                    <div class="inquiry-itemDottom">
                      <div class="itemOpinion">{{item.opinionDepart}}</div>
                      <!-- <div class="itemDate">{{item.date}}</div> -->
                    </div>
                  </div>
              </div>
              <div class="inquiry-order">
                <div class="inquiry-orderCode">
                  订单号:{{item.orderCode}}
                </div>
                <div class="inquiry-orderDate">
                  {{item.date}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import SlipDel from 'vue-slip-delete'
import { mapGetters, mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      activeOrder: '0',
      reportList: [
        {
          title: "胸部CT平扫平扫平扫",
          patient: "周明灿",
          department: "放射科",
          hospital: "绵阳市中心医院",
          date: "2019年5月14日",
          status: 0,
          opinionDepart: '吴文韬医生集团会诊意见',
          orderCode: '12345689999655'
        },
        {
          title: "胸部CT平扫平扫平扫",
          patient: "周明灿",
          department: "放射科",
          hospital: "绵阳市中心医院",
          date: "2019年5月14日",
          status: 1,
          opinionDepart: '吴文韬医生集团会诊意见',
          orderCode: '12345689999655'
        },
        {
          title: "胸部CT平扫平扫平扫",
          patient: "周明灿",
          department: "放射科",
          hospital: "绵阳市中心医院",
          date: "2019年5月14日",
          status: 0,
          opinionDepart: '吴文韬医生集团会诊意见',
          orderCode: '12345689999655'
        },
        {
          title: "胸部CT平扫平扫平扫",
          patient: "周明灿",
          department: "放射科",
          hospital: "绵阳市中心医院",
          date: "2019年5月14日",
          status: 2,
          opinionDepart: '吴文韬医生集团会诊意见',
          orderCode: '12345689999655'
        },
        {
          title: "胸部CT平扫平扫平扫",
          patient: "周明灿",
          department: "放射科",
          hospital: "绵阳市中心医院",
          date: "2019年5月14日",
          status: 0,
          opinionDepart: '吴文韬医生集团会诊意见',
          orderCode: '12345689999655'
        },
        {
          title: "胸部CT平扫平扫平扫",
          patient: "周明灿",
          department: "放射科",
          hospital: "绵阳市中心医院",
          date: "2019年5月14日",
          status: 2,
          opinionDepart: '吴文韬医生集团会诊意见',
          orderCode: '12345689999655'
        },
        {
          title: "胸部CT平扫平扫平扫",
          patient: "周明灿",
          department: "放射科",
          hospital: "绵阳市中心医院",
          date: "2019年5月14日",
          status: 1,
          opinionDepart: '吴文韬医生集团会诊意见',
          orderCode: '12345689999655'
        },
        {
          title: "胸部CT平扫平扫平扫",
          patient: "周明灿",
          department: "放射科",
          hospital: "绵阳市中心医院",
          date: "2019年5月14日",
          status: 2,
          opinionDepart: '吴文韬医生集团会诊意见',
          orderCode: '12345689999655'
        },
        {
          title: "胸部CT平扫平扫平扫",
          patient: "周明灿",
          department: "放射科",
          hospital: "绵阳市中心医院",
          date: "2019年5月14日",
          status: 0,
          opinionDepart: '吴文韬医生集团会诊意见',
          orderCode: '12345689999655'
        }
      ],
    };
  },
  computed: {
    ...mapGetters({
      userInfo: "user/userInfoGetter",
      activeIndex: "system/activeMenuGetter",
      orderStore: 'orderStore/orderStoreGetter'
    })
  },
  components: {
    SlipDel
  },
  watch: {
    
  },
  mounted() {
    this.setActive("/orderList");
    this.$router.push({ path: this.activeIndex });
  },
  methods: {
    ...mapMutations({
      setUserInfo: "user/userMutation",
      setActive: "system/activeBaseMutation",
      setOrder: 'orderStore/orderStoreMutation'
    }),
    orderInfo (data){
      if (data.status === 0) {
        this.setOrder('history')
        this.$router.push({ path: '/orderDetails' });
      } else if (data.status === 1) {
        this.$router.push({ path: '/reportExplain' });
      } else{
        this.$router.push({ path: '/detailsReport' });
      } 
        
    }
  }
};
</script>

<style lang="scss" scoped>
.inquiry {
  background: #f6f6f6;
  padding-bottom: 60px;
  /deep/ .el-tabs__header{
    position: fixed;
    top: 0;
    left: 0;
    background: #ffffff;
    margin-bottom: 10px;
    z-index: 999;
    width: 100%;
    .el-tabs__nav{
      width: 280px;
      margin-left: calc(50% - 140px);
    } 
  }
  /deep/ .el-tabs__content{
    padding-top: 49px;
  }
  .inquiry-list {
    //@at-root 滑动删除 删除的样式
    /deep/ .m-slide .m-slide__del{
        height: 68px;
        top: 18px;
        span{
            width: 100%;
            font-size: 12px;
        }
    }
    .inquiry-item {
      background: #fff;
      display: flex;
      border-bottom: 1px solid #f3f3f3;
      padding: 12px 12px 0 12px;
      margin-bottom: 10px;
      .inquiry-itemView {
        width: 100%;
        .inquiry-itemView-top{
          display: flex;
          padding-bottom: 12px;
          .inquiry-itemLogo {
            width: 58px;
            height: 58px;
            border-radius: 50%;
            margin-right: 15px;
            background: #2d2d2d;
          }
          .inquiry-itemInfo {
            flex: 1;
            .inquiry-itemTitle {
              display: flex;

              .itemPatient{
                font-family: PingFang-SC-Medium;
                font-size: 16px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #323232;
                margin-right: 12px;
              }
              .itemSex, .itemAge{
                display:table-cell; 
                vertical-align:bottom;
                font-family: PingFang-SC-Regular;
                font-size: 12px;
                letter-spacing: 0px;
                color: #5e5e5e;
                margin-right: 6px;
                height: 12px;
                line-height: 12px;
                position: relative;
                bottom: -5px;
              }
              .itemPrice{
                flex: 1;
                text-align: right;
                font-size: 15px;
                font-weight: 600;
                i{
                  font-size: 12px;
                  line-height: 12px;
                  height: 12px;
                  font-weight: 100;
                }
              }
            }
            .inquiry-itemPatient {
              font-size: 14px;
              line-height: 25px;
              display: flex;
              .itemTitle {
                flex:1;
                font-family: PingFang-SC-Regular;
                font-size: 13px;
                font-weight: bold;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #05a1f3;
              }
              .itemState{
                flex:1;
                text-align: right;
                font-family: PingFang-SC-Medium;
                font-size: 14px;
                font-weight: normal;
                font-stretch: normal;
                line-height: 25px;
                letter-spacing: 0px;
              }
              .itemUnpaid{
                color: #fb9c26;
              }
              .itemDecode{
                color: #06b75a;
              } 
              .itemDone{
                color: #8c8c8c;
              }
            }
            .inquiry-itemDottom {
              font-size: 12px;
              display: flex;
              .itemOpinion{
                font-family: PingFang-SC-Regular;
                font-size: 12px;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #636363;
              }
            }
          }
        }
        .inquiry-order{
          padding: 12px 0 10px 0;
          border-top: 1px solid #EDEDED;
          display: flex;
          .inquiry-orderCode{
            flex: 1;
            font-family: PingFang-SC-Medium;
            font-size: 14px;
            letter-spacing: 0px;
            color: #858585;
          }
          .inquiry-orderDate{
            flex: 1;
            font-family: PingFang-SC-Medium;
            font-size: 12px;
            letter-spacing: 0px;
            color: #858585;
            text-align: right;
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
}
</style>
