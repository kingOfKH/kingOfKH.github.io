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
    // 获取会话数据
    // 在第二个页面中从会话存储中获取数据
    var cardStr = sessionStorage.getItem('card');
    if (cardStr) {
        var card = JSON.parse(cardStr);
        // 使用获取到的数据进行操作
        document.title = card.name
        articleTitle.innerHTML = card.detail
        articleTimeText.innerHTML = card.time
    } else {
        // 没有找到存储的数据
    }


};