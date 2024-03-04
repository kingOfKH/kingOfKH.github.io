// 创建 XMLHttpRequest 对象
var xhr = new XMLHttpRequest();

// 配置请求，true 表示异步请求
xhr.open('GET', 'https://gitcode.net/2301_78006839/wxpj/-/raw/master/test.json', true);

// 设置请求完成时的回调函数
xhr.onreadystatechange = function() {
    // 检查请求是否完成
    if (xhr.readyState == 4) {
        // 检查 HTTP 状态码
        if (xhr.status == 200) {
            // 请求成功，你可以在 xhr.responseText 中获取响应的数据
            console.log(xhr.responseText);
        } else {
            // 请求失败，输出错误信息
            console.error('Failed to fetch data. Status: ' + xhr.status);
        }
    }
};

// 发送请求
xhr.send();