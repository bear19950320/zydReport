<template>
  <div class="inquiry autoHeight">
    <!-- 判断是否历史订单 -->
    <div class="explain-loading">
        <div class="explain-content">
            <div class="explain-icon">
                <img src="../../assets/images/reportLoading_03.png" alt="">
            </div>
            <p class="explain-title">报告解读中</p>
            <p class="explain-tips">报告正在解读中，请稍等！</p>
        </div>
    </div>
    
    <div class="max-item patient-list">
        <!-- <div class="item-title">
            会诊报告单
        </div> -->
        <div class="max-item-view view-first">
            <label class="item-label">患者姓名:</label>
            <div class="item-content">周明灿</div>
        </div>
        <div class="max-item-view">
            <label class="item-label">患者性别:</label>
            <div class="item-content">女</div>
        </div>
        <div class="max-item-view">
            <label class="item-label">患者年龄:</label>
            <div class="item-content">23岁</div>
        </div>
        <div class="max-item-view">
            <label class="item-label">检查医院</label>
            <div class="item-content">绵阳市中心医院</div>
        </div>
        <div class="max-item-view">
            <label class="item-label">检查项目:</label>
            <div class="item-content">
                <a href="javascript:;">乳腺钼靶</a>
                <a href="javascript:;">胸部平扫CT</a>
                <a href="javascript:;">乳腺钼靶</a>
            </div>
        </div>
        <div class="max-item-view">
            <label class="item-label">会诊机构:</label>
            <div class="item-content">吴文韬医生集团</div>
        </div>
    </div>
  
    <!-- 订单详情 -->
    <div class="max-item patient-order">
        <div class="item-title">
            订单详情
        </div>
        <div class="max-item-view view-first">
            <label class="item-label">医院</label>
            <div class="item-content">绵阳市中心医院</div>
        </div>
        <div class="max-item-view">
            <label class="item-label">检查时间</label>
            <div class="item-content">2019-06-45 12:22:23</div>
        </div>
        <div class="max-item-view">
            <label class="item-label">腹部立卧位,胸部正侧位</label>
            <div class="item-content"><i class="iconfont icon-fl-renminbi"></i>10.00</div>
        </div>
        <div class="max-item-view">
            <label class="item-label item-label-min">乳腺钼靶</label>
            <div class="item-content"><i class="iconfont icon-fl-renminbi"></i>5.00</div>
        </div>
        <div class="max-item-view">
            <label class="item-label item-label-min">乳腺钼靶</label>
            <div class="item-content"><i class="iconfont icon-fl-renminbi"></i>5.00</div>
        </div>
        <div class="max-item-view">
            <label class="item-label">订单编号</label>
            <div class="item-content">123145678945697</div>
        </div>
        <div class="max-item-view">
            <label class="item-label">支付时间</label>
            <div class="item-content">2019-06-45 12:22:33</div>
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
      material: {
        phone: '',
        name: '',
        note: ''
      },
      moneySum: 0,
    };
  },
  computed: {
    ...mapGetters({
      userInfo: "user/userInfoGetter",
      activeIndex: "system/activeMenuGetter",
      orderStatus: 'orderStore/orderStatusGetter'
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
    this.setActive("/reportExplain");
    this.$router.push({ path: this.activeIndex });
  },
  methods: {
    ...mapMutations({
      setUserInfo: "user/userMutation",
      setActive: "system/activeBaseMutation",
      setorderStatus: 'orderStore/orderStatusMutation'
    })
  }
};
</script>

<style lang="scss" scoped>
.inquiry {
  background: #f6f6f6;
  padding-bottom: 70px;
    .explain-loading{
        padding: 20px 0 48px 0;
        background: #fff;
        .explain-content{
            width: 160px;
            margin-left: calc(50% - 80px);
            text-align: center;
            .explain-icon{
                width: 54px;
                height: 54px;
                margin-left: calc(50% - 27px);
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .explain-title{
                color: #272727;
                font-size: 18px;
                font-weight: 600;
                margin-top: 20px; 
            }
            .explain-tips{
                color: #A4A4A4;
                font-size: 13px;
                padding-top: 12px;
            }
        }
    }
    .min-item,.max-item{
      background: #fff;
      margin-top: 10px;
      padding: 12px 12px;
        .item-title{
            padding: 8px 0 16px 0;
            border-bottom: 1px solid #F4F4F4;
            font-size: 16px;
            font-weight: 550;
        }
        .max-item-view:first-child{
            padding-top: 18px;
            color: red;
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
    }
    /deep/ .view-first{
        padding-top: 18px; 
    }
    .patient-list {
        padding: 12px;
        .max-item-view{
            line-height: 18px;
            .item-label{
                width: 85px;
                flex: initial;
                font-size: 15px;
                color: #272727;
                text-align: left;
                font-weight: 600;
            }
            .item-content{
                flex: 1;
                color: #696969;
                font-size: 15px;
                text-align: left;
                a:first-child{
                    text-align: left;
                }
                a{
                    display: inline-block;
                    width: 30%;
                    color: #00b7ff;
                    text-decoration: none;
                    text-align: center;
                }
            }
        }
    }
    .downReportExplain{
        margin-left: calc(50% - 121px);
        padding: 0;
        width: 242px;
        line-height: 36px;
        height: 36px;
        background:  #00b7ff;
        color: #ffffff;
        margin-bottom: 13px;
    }
}
</style>
