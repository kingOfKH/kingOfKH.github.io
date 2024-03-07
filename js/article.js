// 获取 detailContainer 对象
const detailContainer = document.getElementById('detailContainer')
// 获取标题对象 articleTitle
const articleTitle = document.getElementById('articleTitle')
// 获取标题头时间对象 articleTimeText
const articleTimeText = document.getElementById('articleTimeText')
// 获取标题体 articleBody
const articleBody = document.getElementById('articleBody')


// 获取页面参数
window.onload = function() {
    // 解析 URL 中的参数
    var urlParams = new URLSearchParams(window.location.search);
    var cardValue = urlParams.get('card');
    
    // 判断是否存在参数
    if (cardValue !== null) {
        // 使用获取到的参数值
        console.log('cardValue :', cardValue);
        const card = JSON.parse(decodeURI(cardValue))
        document.title = card.name
        articleTitle.innerHTML = card.detail
        articleTimeText.innerHTML = card.time
    } else {
        console.log('Parameter not found');
    }
};