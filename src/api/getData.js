import axios from 'axios';
import {url} from '../config/url';

//师傅管理相关
/*获取不同状态师傅信息*/
export const getMaster1 = (state,page,size) => axios.get(url+'/api/master/findAllm/'+ state +'?page='+page+'&size='+size);
/*根据手机号码查询师傅*/
export const findPhonem = (phone) => axios.get(url+'/api/master/findPhonem/'+ phone);
/*根据真实姓名模糊查询师傅*/
export const findRNm = (realName,page,size) => axios.get(url+'/api/master/findRNm/'+ realName+'?page='+page+'&size='+size);
/*根据ID查询师傅信息*/
export const findm = (id) => axios.get(url+'/api/master/findm/'+ id);

//技能管理相关
/*获取服务技能*/
export const findSkill = () => axios.get(url+'/api/skill/findAll/1001');

//用户管理相关
/*管理员查询用户列表*/
export const findUser = (page,size) => axios.get(url+'/api/user/findsome?page='+page+'&size='+size);
