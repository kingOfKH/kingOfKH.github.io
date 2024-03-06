var url = "../data/webCards.json"
// 申明一个XMLHttpRequest
var request = new XMLHttpRequest();
// 设置请求方法与路径
request.open("get", url);
// 不发送数据到服务器
request.send(null);
//XHR对象获取到返回信息后执行
request.onload = function () {
    const cardList = document.getElementById('cardList')
    // 解析获取到的数据
    var cards = JSON.parse(request.responseText);
    console.log('data:',cards)

    cards.forEach(card => {
        console.log("card",card);

        // 创建 card
        var card1 = document.createElement('div');
        card1.className = 'card'
        // 创建 cover
        var cover = document.createElement('div');
        cover.className = 'cover'
        // 创建 cover_img
        var cover_img = document.createElement('img')
        if(card.imgArr != undefined)
        cover_img.src = card.imgArr[0]
        cover_img.alt = card.name+'图片'
        cover_img.className = 'cover'
    // 添加 cover_img 到 cover
        cover.appendChild(cover_img)
        // 创建 msg
        var msg = document.createElement('div');
        msg.className = 'msg'
        // 创建 flag
        var flag = document.createElement('div');
        flag.className = 'flag'
        // 创建 dopt
        var dopt = document.createElement('span');
        dopt.className = 'dopt'
        dopt.innerText = '●'
        // 创建分类
        var classify = document.createElement('span');
        classify.innerHTML = card.classify
    // 添加到 flag
        flag.appendChild(dopt)
        flag.appendChild(classify)
        // 创建 cTitle
        var cTitle = document.createElement('div');
        cTitle.className = 'cTitle'
        cTitle.innerHTML = card.detail
    // 添加到 msg
        msg.appendChild(flag)
        msg.appendChild(cTitle)
    // 添加到 card
        card1.appendChild(cover)
        card1.appendChild(msg)
    // 添加 card 到 cardList
        cardList.appendChild(card1)
    });

}