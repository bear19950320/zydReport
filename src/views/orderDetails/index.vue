<template>
  <div class="inquiry autoHeight">
    <!-- 判断是否历史订单 -->
    <div class="min-item">
        <div class="min-item-view">
            <div class="item-label">姓名</div>
            <div class="item-content">{{materialData.name}}</div>
        </div>
        <div class="min-item-view">
            <div class="item-label">手机</div>
            <div class="item-content">{{materialData.phone}}</div>
        </div>
    </div>
    <div class="max-item" v-for='(item , index) in orderList'>
        <div class="max-item-view">
            <div class="item-label">医院</div>
            <div class="item-content"> {{item.hospital}}</div>
        </div>
        <div class="max-item-view">
            <div class="item-label">检查时间</div>
            <div class="item-content">{{item.date}}</div>
        </div>
        <div class="max-item-view">
            <div class="item-label">{{item.caseAll}}</div>
            <div class="item-content"><i class="iconfont icon-fl-renminbi"></i>{{item.caseAllMoney}}</div>
        </div>
        <div class="max-item-view" v-for='( itemList, index ) in item.caseList'>
            <div class="item-label item-label-min">{{itemList.caseName}}</div>
            <div class="item-content"><i class="iconfont icon-fl-renminbi"></i>{{itemList.caseMoney}}</div>
        </div>
    </div>
    <!-- 判断是否历史订单 -->
    <div class="min-item">
        <div class="min-item-view note">
            <div class="item-label">备注</div>
            <div class="item-content">{{materialData.remarks}}</div>
        </div>
    </div>
    <!-- 底部按钮 -->
    <div class="bottom-style">
        <div class="bottom-body">
            <div class="bottom-left">
                <span>合计:</span>
                <span>
                    <i class="iconfont icon-fl-renminbi"></i>
                    <b>{{moneySum.toFixed(2)}}</b>
                </span>
            </div>
            <div class="bottom-right">
                <el-button round>{{orderStore === 'history' ? '取消订单' : '暂不支付' }}</el-button>
                <el-button type="primary" round>{{orderStore === 'history' ? '立即支付' : '立即支付' }}</el-button>
            </div>
        </div>
    </div>

  </div>
</template>
<script>
import { mapGetters, mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      allRadio: false,
      orderList: [
        {
          hospital: "绵阳市中心医院",
          date: "2019-06-45 12:22:23",
          caseAll: '腹部立卧位,胸部正侧位',
          caseAllMoney: '10.00',
          caseList:[{
            caseName: '乳腺钼靶',
            caseMoney: '5.00'
          },{
            caseName: '乳腺钼靶',
            caseMoney: '5.00'
          }]
        },
        {
          hospital: "绵阳市中心医院",
          date: "2019-06-45 12:22:23",
          caseAll: '腹部立卧位,胸部正侧位',
          caseAllMoney: '10.00',
          caseList:[{
            caseName: '乳腺钼靶',
            caseMoney: '5.00'
          },{
            caseName: '乳腺钼靶',
            caseMoney: '5.00'
          }]
        }
      ],
      moneySum: 0,
    };
  },
  computed: {
    ...mapGetters({
      userInfo: "user/userInfoGetter",
      activeIndex: "system/activeMenuGetter",
      orderStore: 'orderStore/orderStoreGetter',
      materialData: 'commitOrder/materialGetter'
    })
  },
  created () { 
    for(var i in this.orderList){
        this.moneySum += Number(this.orderList[i].caseAllMoney);
    }
  },
  components: {
    
  },
  mounted() {
    this.setActive("/orderDetails");
    console.log(this.orderStore,'测试')
    this.$router.push({ path: this.activeIndex });
  },
  methods: {
    ...mapMutations({
      setUserInfo: "user/userMutation",
      setActive: "system/activeBaseMutation"
    })
  }
};
</script>

<style lang="scss" scoped>
.inquiry {
  background: #f6f6f6;
  padding-bottom: 70px;
    .min-item,.max-item{
      background: #fff;
      margin-top: 10px;
      padding: 0 12px;
    }
    .min-item-view:first-child{
        border-bottom:1px solid #EDEDED; 
    }
    .min-item-view{
        height: 45px;
        line-height: 45px;
        display: flex;
        .item-label{
            flex: 1;
            font-size: 16px;
            color: #292929;
        }
        .item-content{
            flex: 1;
            font-size: 16px;
            color: #818181;
            text-align: right;
        }
    }
  
    .max-item-view:first-child{
        padding-top: 18px; 
    }
    .max-item-view{
        padding-bottom: 18px; 
        display: flex;
        .item-label{
            flex: 1;
            font-size: 16px;
            color: #292929;
        }
        .item-label.item-label-min{
            font-size: 14px;
            color: #818181;
        }
        .item-content{
            flex: 1;
            font-size: 16px;
            color: #818181;
            text-align: right;
            .iconfont{
                font-size: 14px;
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
        span:first-child{
          font-size: 14px;
          color: #5e5e5e;
        }
        span:last-child{
            font-size: 18px;
            color: #fb9c26;
            .iconfont{
                font-size: 13px;
            }
        }
    }
    .bottom-right {
      height: 35px;
      width: 205px;
        .el-button{
            padding: 0;
            line-height: 35px;
            height: 35px;
            color: #fff;
            font-size: 14px; 
        }
        .el-button:first-child{
            width: 88px;
            margin-right: 12px;
            border-color: #fff;
            color: #05a1f3;
        }
        .el-button:last-child{
            width: 97px;
            background-image: linear-gradient(90deg, 
              #1dd8f8 0%, 
              #05a1f3 100%);
            margin: 0;
        }
    }
  }
  /deep/ .note.min-item-view{
    height: auto;
    .item-label{
        width: 60px;
        flex: initial;
    }
    .item-content{
        height: auto;
        text-align: left;
        line-height: 25px;
        font-size: 14px;
    }
  }
}
</style>
