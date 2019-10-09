
//封装操作本地浏览器localStorage 的方法
export const setLocalStorage = (key,value) => {

    //若value是一个json对象，则转成json字符串
    if(typeof value === 'object'){
       value = JSON.stringify(value)
    }

    //将数据保存到本地浏览器localStorage
    localStorage.setItem(key,value)
}

export const getLocalStorage = (key) => {
    return localStorage.getItem(key)
}