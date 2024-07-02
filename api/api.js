// 引入 request 文件
import request from '@/utils/request'

// 以下 api 为博主项目示例，实际与项目相匹配

// 分页查询学习列表
export async function ciliSearch(params) {
    return request({
        url: '/cili/search/v1',
        method: 'get',
        data: params
    })
}
// 查询学习列表
// export const listStudyInfo = (params) => {
//     return request({
//         url: '/study/studyInfo/list',
//         method: 'get',
//         data: params
//     })
// }


// // 获取学习列表详细信息
// export const studyInfoById= (id) => {
//     return request({
//         url: '/study/studyInfo/'+id,
//         method: 'get',
//     })
// }

// // 增加学习列表
// export const saveStudyInfo = (params) => {
//     return request({
//         url: '/study/studyInfo',
//         method: 'post',
//         data: params
//     })
// }

// // 修改学习列表
// export const updateStudyInfo = (params) => {
//     return request({
//         url: '/study/studyInfo',
//         method: 'put',
//         data: params
//     })
// }

// // 删除学习列表
// export const deleteStudyInfo = (id) => {
//     return request({
//         url: '/study/studyInfo/delete?id='+id,
//         method: 'delete',
//     })
// }