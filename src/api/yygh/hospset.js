//使用src/utils/request.js 发起请求，该js对axios进行了封装的
import request from '@/utils/request'
const api_name = '/admin/hosp/hospitalSet'
export default {
    findAll() {
        return request({
            url: `${api_name}/findAll`,
            method: 'get'
        })
    },
    //带条件的分页查询,获取医院设置列表
    getPageList(page, limit, searchObj) {
        return request({
            url: `${api_name}/${page}/${limit}`,
            method: 'post',
            data: searchObj,
        })
    },
    removeById(id){
        return request({
            url:`${api_name}/${id}`,
            method:'delete'
        })
    },
//新增医院设置
    save(hospset){
        return request({
            url:`${api_name}/saveHospSet`,
            method:'post',
            data:hospset
        })
    },
    //根据id查询医院设置
    getById(id){
        return request({
            url:`${api_name}/getHospSet/${id}`,
            method:'get'
        })
    },
    //更新医院设置
    updateById(hospset){
        return request({
            url: `${api_name}/updateHospSet`,
            method:'post',
            data:hospset
        })
    },
    //批量删除
    removeByIds(ids){
        return request({
            url:`${api_name}/batchRemove`,
            method:'delete',
            data:ids
        })
    }
}