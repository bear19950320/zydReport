<template>
  <div class="inquiry autoHeight">
    <div class="report-head">
        <div class="report-patient">
            <span class="report-patient__name">周明灿</span>
            <span class="report-patient__sex">女</span>
            <span class="report-patient__age">23岁</span>
        </div>
        <div class="report-decode">解读机构：吴文韬医生集团</div>
        <div class="report-decode">解读时间：2019-6-28  12:12:12</div>
    </div>
    <div class="report-list">
        <div class="report-item" v-for="(item, index) in reportList">
            <div class="report-item__view">
                <label>医院</label>
                <div class="report-item__view_content">
                    {{item.hospital}}
                </div>
            </div>
            <div class="report-item__view">
                <label>{{item.caseAll}}</label>
                <div class="report-item__view_content">
                    <i class="iconfont icon-fl-renminbi"></i>{{item.caseAllMoney}}
                </div>
            </div>
            <div class="report-item__view_hr">
                <div class="report-item__view" v-for="(itemChild, key) in item.caseList">
                    <label>{{itemChild.caseName}}</label>
                    <div class="report-item__view_content">
                        <i class="iconfont icon-fl-renminbi"></i>{{itemChild.caseMoney}}
                    </div>
                </div>
            </div>
           <div class="report-item__view report-item__view_bottom">
                <label>{{item.date}}</label>
                <div class="report-item__view_content">
                   <span class="report-item__view_content_click" @click="viewOpinions(item)">查看解读意见 <i class="el-icon-arrow-right"></i></span>
                </div>
            </div>
        </div>
    </div>
    <!-- reportDetails -->
    <div class="report-details">
        <div class="report-details_title">
            订单信息
        </div>
        <div class="report-item__view">
            <label>订单编号</label>
            <div class="report-item__view_content">123145678945697</div>
        </div>
        <div class="report-item__view">
            <label>订单时间</label>
            <div class="report-item__view_content">2019-06-15 12:22:33</div>
        </div>
        <div class="report-item__view">
            <label>医院</label>
            <div class="report-item__view_content">绵阳市中心医院</div>
        </div>
        <div class="report-item__view">
            <label>支付时间</label>
            <div class="report-item__view_content">2019-06-15 12:24:00</div>
        </div>
        <el-collapse v-model="activeCollapse" accordion>
            <el-collapse-item  :name="(Number(index) + 1)" v-for="(item, index) in reportList">
                <template slot="title">
                   <div class="reportList_title">{{item.caseAll}}</div>
                   <div class="reportList_unit"><i class="iconfont icon-fl-renminbi"></i>10.00</div>
                   <div class="reportList_flag" v-if="activeCollapse != (Number(index) + 1)">展开 <i class="el-icon-caret-bottom"></i></div>
                   <div class="reportList_flag" v-if="activeCollapse == (Number(index) + 1)">收起 <i class="el-icon-caret-top"></i></div>
                </template>
                 <div class="report-item__view" v-for="(itemChild, key) in item.caseList">
                    <label>{{itemChild.caseName}}</label>
                    <div class="report-item__view_content">
                        <i class="iconfont icon-fl-renminbi"></i>{{itemChild.caseMoney}}
                    </div>
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      activeCollapse: 1,
      reportList: [
        {
          hospital: "绵阳市中心医院",
          date: "2019-06-45 12:22:23",
          caseAll: '腹部立1',
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
          caseAll: '腹部立2',
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
      activeIndex: "system/activeMenuGetter",
      orderStore: 'orderStore/orderStoreGetter',
      materialData: 'commitOrder/materialGetter'
    })
  },
  created () { 

  },
  components: {
    
  },
  mounted() {
    this.setActive("/detailsReport");
    this.$router.push({ path: this.activeIndex });
  },
  methods: {
    ...mapMutations({
      setActive: "system/activeBaseMutation",
      setActiveTitle: 'system/activeTitleMutation', //..写入下一页面的标题
      setReportCompltetList: 'reportCompltet/reportCompltetMutation'
    }),
    viewOpinions (data) {
        console.log(data)
        //.. 写入标题
        this.setActiveTitle(data.caseAll)
        
        this.setReportCompltetList(this.reportList)

        this.$message({
            message: data.caseAll,
            type: 'warning'
        })
        this.$router.push({
            path: '/reportComplete'
        })
    }
  }
};
</script>

<style lang="scss" scoped>
.inquiry {
  background: #f6f6f6;
  padding-bottom: 70px;
    .report-head{
        padding: 0 12px;
        height: 140px;
        background: #fff;
        background-image: url('../../assets/images/orderInfo.png');
        .report-patient{
            padding-top: 32px;
            padding-bottom: 10px;
            .report-patient__name{
                font-size: 18px;
                font-family: PingFang-SC-Regular;
                font-weight: bold;
                font-stretch: normal;
                letter-spacing: 0px;
                line-height: 18px;
                color: #ffffff;
                margin-right: 6px;
            }
            .report-patient__sex,.report-patient__age{
                font-size: 15px;
                line-height: 15px;
                color: #ffffff;
                font-family: PingFang-SC-Regular;
                letter-spacing: 0px;
            }
        }
        .report-decode{
            height: 15px;
            line-height: 15px;
            font-family: PingFang-SC-Regular;
            font-size: 15px;
            letter-spacing: 0px;
            color: #ffffff;
            padding-top: 10px;
        }
    }
    .report-list{
        .report-item{
            padding: 22px 12px 0 12px;
            background: #ffffff;
            margin-bottom: 10px;
            .report-item__view{
                display: flex;
                padding-bottom: 18px;
                line-height: 16px;
                label{
                    flex: 1;
                    font-family: PingFang-SC-Medium;
                    font-size: 16px;
                    color: #292929;
                }
                .report-item__view_content{
                    flex: 1;
                    text-align: right;
                    font-size: 16px;
                    color: #818181;
                    .iconfont{
                        font-size: 12px;
                    }
                    .report-item__view_content_click{
                        font-size: 16px;
                        color: #05a1f3;
                        i{
                            position: relative;
                            top: 2px;
                        }
                    }
                }
            }
            .report-item__view_hr{
                border-bottom: 1px solid #EBEBEB;
                .report-item__view{
                    label{
                        font-size: 14px;
                        color: #818181; 
                    }
                }
            }
            .report-item__view_bottom{
                padding-top: 18px;
                label{
                    font-size: 16px;
                    color: #818181; 
                }
            }
        }
    }
    .report-details{
        background: #ffffff;
        padding: 0 12px;
        .report-details_title{
            padding: 22px 0 18px 0;
            margin-bottom: 16px;
            border-bottom: 1px solid #EBEBEB;
            font-size: 16px;
            font-weight: bold;
            font-stretch: normal;
            letter-spacing: 0px;
            color: #2b2b2b;
        }
        .report-item__view{
            display: flex;
            padding-bottom: 18px;
            line-height: 16px;
            label{
                flex: 1;
                font-family: PingFang-SC-Medium;
                font-size: 16px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #292929;
            }
            .report-item__view_content{
                flex: 1;
                text-align: right;
                font-size: 16px;
                color: #818181;
                .iconfont{
                    font-size: 12px;
                }
                .report-item__view_content_click{
                    font-size: 16px;
                    color: #05a1f3;
                    i{
                        position: relative;
                        top: 2px;
                    }
                }
            }
        }
        .el-collapse{
            border: 0;
            .el-collapse-item{
                padding-bottom: 18px;
            }
            /deep/ .el-collapse-item__wrap{
                border: 0;
                .el-collapse-item__content{
                    padding: 0;
                    .report-item__view{
                        label{
                            font-size: 14px;
                            color: #818181;
                        }
                    }
                    .report-item__view:first-child{
                        padding-top: 18px;
                    }
                    .report-item__view:last-child{
                        padding-bottom: 0;
                    }
                }
            }
            /deep/ .el-collapse-item__header{
                display: flex;
                height: 20px;
                line-height: 20px;
                .reportList_title{
                    flex: 1;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    font-size: 16px;
                    color: #05a1f3;
                }
                .reportList_unit{
                    width: 72px;
                    color: #f77926;
                    font-size: 15px;
                    font-weight: 600;
                    i.iconfont{
                        font-size: 12px;
                    }
                }
                .reportList_flag{
                    display: inline-block;
                    width: 52px;
                    height: 17px;
                    border:1px solid #05a1f3;
                    color: #05a1f3;
                    border-radius: 10px;
                    font-size: 13px;
                    text-align: center;
                    line-height: 17px;
                }
                .el-collapse-item__arrow {
                    display: none;
                }
            }
        }
    }
}
</style>
