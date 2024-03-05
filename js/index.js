var url = "../test.json"
// 申明一个XMLHttpRequest
var request = new XMLHttpRequest();
// 设置请求方法与路径
request.open("get", url);
// 不发送数据到服务器
request.send(null);
//XHR对象获取到返回信息后执行
request.onload = function () {
    // 解析获取到的数据
    var data = JSON.parse(request.responseText);
    console.log(data)

}