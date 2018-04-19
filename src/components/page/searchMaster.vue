<template>
<div>
    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-search"></i> 师傅管理</el-breadcrumb-item>
            <el-breadcrumb-item>搜索师傅</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <el-input placeholder="请输入师傅名称" v-model="input1" class="input-with-select">
        <template slot="prepend">师傅名称查找</template>
        <el-button slot="append" icon="el-icon-search" @click="searchName"></el-button>
    </el-input>
    <el-input placeholder="请输入师傅手机号" v-model="input2" class="input-with-select mt10" type="number">
        <template slot="prepend" width="200">师傅手机号查找</template>
        <el-button slot="append" icon="el-icon-search" @click="searchPhone"></el-button>
    </el-input>
</div>
</template>

<script>
    // import {url} from '../../config/url';
    import {findPhonem} from '../../api/getData';
    import {findRNm} from '../../api/getData';
    export default {
        name: "search-master",
        data() {
            return{
                input1: '',
                input2: '',
                page: 1,
                size: 10
            }
        },
        methods:{
            searchName() {
                findRNm(this.input2,this.page,this.size).then(res => {
                    console.log(res.data);
                })
            },
            searchPhone() {
                findPhonem(this.input2).then(res => {
                    console.log(res.data);
                })
            }
        }
    }
</script>

<style scoped>

</style>
