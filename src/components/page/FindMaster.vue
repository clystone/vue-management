<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-search"></i> 师傅管理</el-breadcrumb-item>
                <el-breadcrumb-item>查看师傅</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <span class="colorMain">请选择师傅的状态：</span><el-select v-model="value" placeholder="请选择" @change="changeSelect">
            <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
        <el-table :data="masters" border style="width: 100%" v-loading="listLoading" class="mt10">
            <el-table-column prop="id" label="id" sortable width="80">
            </el-table-column>
            <el-table-column prop="realName" label="姓名" width="100">
            </el-table-column>
            <el-table-column prop="headImgUrl" label="头像" width="100">
                <template slot-scope="scope">
                    <img :src="scope.row.headImgUrl" width="80" height="80"/>
                </template>
            </el-table-column>
            <el-table-column label="身份证" v-if="value >= 2" width="230">
                <template slot-scope="scope">
                    <img :src="'https://shifu.jack-kwan.com/images/master/'+scope.row.id+'/0.jpg'" width="100" height="100" @click="showBig(scope.row)"/>
                    <img :src="'https://shifu.jack-kwan.com/images/master/'+scope.row.id+'/1.jpg'" width="100" height="100" @click="showBig(scope.row)"/>
                </template>
            </el-table-column>
            <el-table-column prop="phone" label="手机" width="120">
            </el-table-column>
            <el-table-column prop="city" label="服务城市" width="100">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="showDetail(scope.row)" v-show="value == 2">通过</el-button>
                    <el-button size="mini" type="danger" @click="showDetail(scope.row)" v-show="value == 2">驳回</el-button>
                    <el-button size="mini" type="primary" @click="upIdCard(scope.row)" v-show="value == 3">上传身份证</el-button>
                    <el-button size="mini" type="danger" @click="showDetail(scope.row)" v-show="value == 3">冻结</el-button>
                    <el-button size="mini" type="danger" @click="showDetail(scope.row)" v-show="value == 4">解封</el-button>
                </template>
            </el-table-column>

        </el-table>
        <div class="pagination">
            <el-pagination
                @current-change ="handleCurrentChange"
                layout="prev, pager, next"
                :page-size="pageSize" :total="total">
            </el-pagination>
        </div>


        <el-dialog
            title="身份证详情"
            :visible.sync="picVisible"
            width="100%"
            center>
            <img :src="'https://shifu.jack-kwan.com/images/master/'+imgId+'/0.jpg'" width="49%" />
            <img :src="'https://shifu.jack-kwan.com/images/master/'+imgId+'/1.jpg'" width="49%" />
        </el-dialog>

        <el-dialog title="上传身份证" :visible.sync="upImgVisible" :close-on-click-modal="false" width="60%">
            <el-form style="text-align: center;">
                <el-form-item >
                    <el-upload class="avatar-uploader"  action="" :show-file-list="false" :on-change="imgChange" :before-upload="beforeUpload" >
                        <img style="width:300px;height: 300px;" :src="imgUrl" :onerror="defaultImg" title='点击选择图片' >
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="upImgVisible = false;imgUrl='';">取消</el-button>
                <el-button type="primary" @click="editImgSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
    import {url} from '../../config/url';
    import {findSkill} from '../../api/getData';
    import {getMaster1} from '../../api/getData';
    export default {
        name: "find-master",
        data() {
            return {
                name : '',
                total: 0,
                pageSize: 5,
                page: 1,
                size: 5,
                masters:[],
                listLoading:false,
                dialogVisible:false,
                picVisible:false,
                upImgVisible:false,
                editLoading:false,
                defaultImg:'this.src="' + require('../../assets/default.jpg') + '"',//默认图片
                imgUrl:'',
                detail:{},
                center: true,
                skills:[],
                options:[
                    {value:0,label:'未有数据'},
                    {value:1,label:'绑定手机'},
                    {value:2,label:'绑定身份证待审核'},
                    {value:3,label:'审核通过'},
                    {value:4,label:'封号'},],
                value:'',
                imgId: 0,
                masterId:0,
            }
        },
        mounted(){
            this.value = 3;
            console.log(url);
            console.log(process.env.API_ROOT);
            findSkill().then(res=>{
                console.log(res.data);
                this.skills=res.data.parms.skill;
            });
            getMaster1(3,this.page,this.size).then(res=>{
                console.log(res.data);
                if(this.page == 1){
                    this.total = res.data.parms.maxSize;
                }
                this.masters=res.data.parms.master;
                this.listLoading = false;
            })
        },
        methods: {
            handleCurrentChange(val) {
                this.page = val;
                this.listLoading = true;
                if(this.value == '审核通过'){
                    getMaster1(3,this.page,this.size).then(res=>{
                        console.log(res.data);
                        if(this.page == 1){
                            this.total = res.data.parms.maxSize;
                        }
                        this.masters=res.data.parms.master;
                        this.listLoading = false;
                    })
                }else{
                    getMaster1(this.value,this.page,this.size).then(res=>{
                        console.log(res.data);
                        if(this.page == 1){
                            this.total = res.data.parms.maxSize;
                        }
                        this.masters=res.data.parms.master;
                        this.listLoading = false;
                    })
                }

            },
            showDetail(row){
                this.dialogVisible = true;
                this.detail = Object.assign({}, row);
            },
            changeSelect(){
                console.log(this.value);
                this.page = 1;
                getMaster1(this.value,this.page,this.size).then(res=>{
                    console.log(res.data);
                    if(this.page == 1){
                        this.total = res.data.parms.maxSize;
                    }
                    this.masters=res.data.parms.master;
                    this.listLoading = false;
                })
            },
            showBig(row){
                this.imgId = row.id;
                this.picVisible = true;
                console.log(this.imgId);
            },
            upIdCard(row){
                console.log(row);
                this.masterId = row.id;
                console.log(this.masterId);
                this.upImgVisible = true;
            },
            //过滤并显示图片
            imgFilterAndShow:function(file){
                //console.log(file)
                let index = file.name.indexOf('.')
                //console.log(file.name.slice(index+1));
                let fileType = file.name.slice(index+1)//获取文件后缀
                let isJPG = fileType.toLowerCase() === 'jpg'|| fileType === 'jpeg';
                let isPNG = fileType.toLowerCase() === 'png';
                let isGIF = fileType.toLowerCase() === 'gif';
                //图片大小限制2M
                let isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG &&!isPNG && !isGIF) {
                    this.$message.error('上传头像图片只能是JPG或者PNG或者GIF格式!');
                    return;
                }
                if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过 2MB!');
                    return;
                }
                // 显示图片
                if(isJPG||isPNG||isGIF && isLt2M){
                    return URL.createObjectURL(file);
                }
            },
            imgChange:function(file){
                let imgUrl = this.imgFilterAndShow(file.raw);
                if(imgUrl){
                    this.imgUrl = imgUrl;
                }
            },
            //上传前对图片处理
            beforeUpload:function(file){
                //console.log(file);
                if(this.imgFilterAndShow(file)){
                    this.fd = new FormData();
                    this.fd.append('file', file);
                }
                //console.log(this.fd)
                return false;
            },
            //上传身份证
            editImgSubmit:function(){
                console.log('上传');
                //有上传图片
                if(this.fd instanceof FormData){
                    //console.log(this.newImgTime,this.lastImgTime)
                    //如果这次更改的时间距离上次更改时间不到5秒就不能更改

                        this.editLoading = true;
                        this.$axios
                            .post(url+'/api/file/ulmasteridcardm/'+ this.masterId +'/0',this.fd,{
                                headers:{
                                    'Content-Type': 'multipart/form-data'
                                }
                            })
                            .then(res=>{
                                console.log(res);
                                if(res.data.info == 1){
                                    this.editLoading = false;
                                    this.$message({
                                        message: '上传成功',
                                        type: 'success'
                                    });
                                    this.upImgVisible = false;
                                }else{
                                    this.$message({
                                        message: '身份证上传失败'+res.data.msg,
                                        type: 'error'
                                    });

                                }

                            })

                }
                else{
                    this.$message({
                        message: '请选择图片',
                        type: 'error'
                    });
                }
            },
        }
    }

</script>

<style scoped>
    el-row {
        margin-bottom: 20px;
    }
    el-row:last-child {
         margin-bottom: 0;
     }
</style>



