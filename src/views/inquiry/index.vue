<template>
    <div class="inquiry autoHeight">
        <div class="inquiry-header">
            <a href="javascript:;" class="inquiry-banner">
                <img src="../../assets/images/banner.png" alt="">
            </a>
        </div>
        <!-- 价格列表 -->
        <div class="inquiry-charge autoHeight">
            <h2>收费标准</h2>
            <div class="charge-item" v-for="(item , index) in chargeList">
                <h1>{{item.price}}</h1>
                <p>{{item.title}}}</p>
            </div>
            <p class="note-charge">(影像会诊、三维重建按照上传检查的部位进行合计收费)</p>
        </div>
        <!-- 操作步骤 -->
        <div class="inquiry-option">
            <p>
                操作：选择报告<i class="el-icon-arrow-right"></i>
                支付<i class="el-icon-arrow-right"></i>
                解读报告<i class="el-icon-arrow-right"></i>
                出具诊断结果
            </p>
        </div>
        <div class="max-item material-item">
            <p class="material-title">填写信息</p>
            <el-form :model="material" :rules="materialRules" ref="material" label-width="70px">
                <el-form-item label="姓名" class="material-view" prop="name">
                    <el-input v-model="material.name" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="手机号" class="material-view" prop="phone">
                    <el-input v-model="material.phone" placeholder="请输入手机号"></el-input>
                </el-form-item>
            </el-form>
            <div class="material-view note">
                <el-input
                    type="textarea"
                    placeholder="备注"
                    v-model="material.remarks"
                    resize="none">
                </el-input>
            </div> 
        </div>
        <!-- 说明 -->
        <div class="inquiry-caption">
            <h2>说明</h2>
            <p>1.说明说明说明说明说明说明说明</p>
            <p>2.说明说明说明说明</p>
        </div>
        <!-- 底部按钮 -->
        <div class="bottom-style">
            <el-button type="primary" class="bottom-btn" @click="selectReport">报告解读</el-button>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapMutations , mapState } from 'vuex'
let validMobile=(rule,value,callback)=>{
    if(value==''||value==undefined){
        callback()
    }else{
        let reg=/^1[3|4|5|7|8][0-9]\d{8}$/
        if(!reg.test(value)){callback(new Error('请输入正确11位手机号'))}else{
            callback()
        }
    }
};
export default {
    data () {
        return {
            chargeList: [
                {
                    title: 'DR检查*',
                    price: '6.5元/部位'
                }, {
                    title: '乳腺钼靶',
                    price: '19.5元/部位'
                }, {
                    title: 'CT检查*',
                    price: '32.5元/部位'
                }, {
                    title: 'MRI检查*',
                    price: '52元/部位'
                }, {
                    title: 'PET-CT检查',
                    price: '195元/部位'
                }, {
                    title: 'PET-MR检查',
                    price: '390元/部位'
                }
            ],
            material: {
                name: '',
                phone: '',
                remarks: ''
            },
            materialRules:  {
                name: [
                    { required: true, message: '请输入姓名'}
                ],
                phone: [
                    { required: true, message: '请输入正确的11位手机号', pattern: /^1[34578]\d{9}$/,}
                ]
            }
        }
    },
    computed: {
        ...mapGetters({
            userInfo: 'user/userInfoGetter',
            activeIndex: 'system/activeMenuGetter',
            materialData: 'commitOrder/materialGetter'
        }),
    },
    components: {

    },
    mounted () {
        this.setActive('/inquiry');
        this.$router.push({ path: this.activeIndex })
    },
    methods: {
        ...mapMutations({
            setUserInfo: 'user/userMutation',
            setActive: 'system/activeBaseMutation',
            setMaterial : 'commitOrder/materialMutation'
        }),
        // 获取微信id
        async getWechat(){

        },
        selectReport (){
            this.$refs['material'].validate((valid) => {
                if (valid) {
                    //  储存所填写信息 后面提交订单使用
                    this.setMaterial( this.material )
                    this.$router.push({path: '/selectReport'})
                } else {
                    return false;
                }
            });
            // this.$router.push({path: '/selectReport'})
        }
    }
}
</script>

<style lang="scss" scoped>
.inquiry{
    background: #F6F6F6;
    padding-bottom: 60px;
    //  头部banner
    .inquiry-header{
        background: #fff;
        padding: 12px;
        .inquiry-banner{
            width: 100%;
            height: 100%;
            display: inline-block;
            img{
                border-radius: 5px;
                width: 100%;
            }
        }
    }
    //  收费列表
    .inquiry-charge{
        padding: 2px 12px 25px 12px;
        background: #fff;
        h2{
            font-size: 16px;
            color: #0b0b0b;
            font-family: PingFang-SC-Medium;
            margin-bottom: 15px;
        }
        .charge-item{
            width: calc(33% - 6px);
            float: left;
            background: #F8F8F8;
            margin-bottom: 9px;
            padding: 7px 0;
            h1{
                font-family: PingFang-SC-Bold;
                text-align: center;
                color: #fbba47;
                font-size: 15px;
                line-height: 21px;
            }
            p{
                font-family: PingFang-SC-Regular;
                text-align: center;
                color: #42aeff;
                line-height: 21px;
                font-size: 12px;
            }
        }
        .charge-item:nth-child(3),
        .charge-item:nth-child(6){
            margin: 0 9px;
            margin-bottom: 9px;
        }
        .note-charge{
            color: #9f9f9f;
            font-size: 13px;
            line-height: 21px;
            clear: both;
            margin: 6px 0 0 0;
            font-family: PingFang-SC-Regular;
        }
    }
    //  操作步骤
    .inquiry-option{
        margin: 10px 0;
        padding: 15px 12px;
        background: #fff;
        p{
            font-family: PingFang-SC-Regular;
            color: #646464;
            font-size: 14px;
            line-height: 21px;
        }
    }
    // 说明
    .inquiry-caption{
        padding: 0 12px;
        padding-top: 14px;
        background: #fff;
        padding-bottom: 50px;
        h2{
            margin-bottom: 15px;
            font-size: 16px;
            font-size: 16px;
            font-family: PingFang-SC-Regular;
            color: #0b0b0b;
        }
        p{
            color: #7c7c7c;
            font-size: 13px;
            line-height: 16px;
            font-family: PingFang-SC-Regular;
        }
    }
    /deep/ .material-item{
        padding: 18px 12px;
        padding-bottom: 23px;
        background: #fff;
        margin-bottom: 10px;
        .material-title{
            font-size: 16px;
            font-weight: 600;
            margin: 8px 0 20px 0; 
        }
        .material-view{
            display: flex;
            margin-bottom: 20px;
            .el-form-item__content{
                margin: 0 !important;
                flex: 1;
            }
            label{
                text-align: justify;
                text-align-last:justify;
                width: 54px;
                padding-right: 6px;
                line-height: 45px;
                text-align: right;
            }
            label:after {
                content: '';
                width: 54px;
            }
            .el-input{
                flex: 1;
                .el-input__inner{
                    height: 45px !important;
                    line-height: 45px !important;
                    -webkit-appearance:none;/*清除ios默认圆角*/
                    border-radius:0;
                }
            }
            .el-textarea{
                // border: 1px solid #E2E2E2;
                .el-textarea__inner{
                    -webkit-appearance:none;/*清除ios默认圆角*/
                    border-radius:0;
                    display: inline-block;
                    border: 1px solid #E2E2E2;
                    height: 109px;
                }
            }
        }
        .material-view:last-child{
            margin-top: 20px;
        }
    }

    /deep/ .bottom-btn{
        margin-left: calc(50% - 164px);
        margin-top: 4px;
        height: 45px;
        width: 328px;
        border-radius: 22px;
        background-image: linear-gradient(90deg, 
              #1dd8f8 0%, 
              #05a1f3 100%);
        background-color: #05a1f3;
        border-color:  #fff;
    }
}
</style>
