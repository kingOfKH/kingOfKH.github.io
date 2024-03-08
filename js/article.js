// 获取 detailContainer 对象
const detailContainer = document.getElementById('detailContainer')
// 获取标题对象 articleTitle
const articleTitle = document.getElementById('articleTitle')
// 获取标题头分类对象 articleClassifyText
const articleClassifyText = document.getElementById('articleClassifyText')
// 获取标题头时间对象 articleTimeText
const articleTimeText = document.getElementById('articleTimeText')
// 获取文章文本体 articleTextArea
const articleTextArea = document.getElementById('articleTextArea')
// 获取文章图片体 articleImgArea
const articleImgArea = document.getElementById('articleImgArea')


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
        articleClassifyText.innerHTML = card.classify
        articleTimeText.innerHTML = card.time
        // 合并标题和内容
        let articleContains = ""
        card.articleVaule.forEach(item => {
            articleContains+=item
        });
        // 文章展示
        articleTextArea.innerHTML = articleContains

        // 图片展示
        for(let i = 0; i < card.imgArr.length; i++){
            // 创建图片对象
            const aritcleImgObj = document.createElement('img')
            aritcleImgObj.src = card.imgArr[i]
            aritcleImgObj.className = 'articleImg'
            if(i == 0){
                articleTextArea.parentNode.insertBefore(aritcleImgObj, articleTextArea)
            }else articleImgArea.appendChild(aritcleImgObj)

            
        }
    } else {
        // 没有找到存储的数据
    }


};