import request from '@/utils/request'
const api_name = '/admin/cmn/'
export default{
    dictList(id){
        return request({
            url:`${api_name}/findChildData/${id}`,
            method:'get',
        })
    }
}