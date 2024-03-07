window.onload = function() {

    
};

// 页面容器 container
const container = document.getElementById('container')
const cardList = document.getElementById('cardList')
// 分页条 pageBar
const pageBar = document.getElementById('pageBar')
// 加载页面 onload
const onload = document.getElementById('onload')


// 主页搜索按钮 search_btn
const search_btn = document.getElementById('search_btn')
// 主页搜索框 search_btn
const searchText = document.getElementById('searchText')






// 所有内容
let allCards = []
// 当前分类的内容
let currentClassifyCards = []
// 当前页面展示的内容
let currentShowCards = []
// 每页最多展示个数
const perPageNum = 20
// 当前是第几页
let currentPageNum = 1
// 总共多少页
let totalPages

var url = "../data/webCards.json"
// 申明一个XMLHttpRequest
var request = new XMLHttpRequest();
// 设置请求方法与路径
request.open("get", url);
// 不发送数据到服务器
request.send(null);
//XHR对象获取到返回信息后执行
request.onload = function () {
    // 解析获取到的数据
    var cards = JSON.parse(request.responseText);
    allCards = cards
    console.log('data:',cards)

    // 判断该展示的内容
    // 解析 URL 中的参数
    var urlParams = new URLSearchParams(window.location.search);
    var classifyValue = urlParams.get('classify');
    if(classifyValue!=null){
        getCurrentClassifyCards(classifyValue)
        currentPageNum = 1
        showThis(getCurrentShowCards(currentPageNum))
        // 滚动到页面顶部
        container.scrollTo(0, 0);
        onload.style.display = 'none'

        console.log('上个页面传递:'+classifyValue);
    }else{
        getCurrentClassifyCards('全部')
        showThis(getCurrentShowCards(currentPageNum))
        onload.style.display = 'none'
    }

    
}


const showThis = (cards) => {
    cardList.innerHTML = ''
    cards.forEach(card => {
        console.log("card",card);

        // 创建 card
        var card1 = document.createElement('div');
        card1.className = 'card'
        // 添加点击事件
        card1.addEventListener('click',() => {
            cardClick(card)
        })
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

// 根据分类名获取当前分类所有card
const getCurrentClassifyCards = (classify) => {
    if(classify == '全部'){
        // 计算总页数
        totalPages = Math.ceil(allCards.length / perPageNum);
        currentClassifyCards = allCards
    }else{
        let cur = []
        allCards.forEach(card=>{
            if(card.classify.includes(classify)){
                cur.push(card)
            }
        })
        // 计算总页数
        totalPages = Math.ceil(cur.length / perPageNum);
        currentClassifyCards = cur;
    }
}

// 根据目标页面获取当前应展示card
const getCurrentShowCards = (toPage) => {
     // 确保页数在有效范围内
     if (toPage < 1 || toPage > totalPages) {
        console.log('页数超出范围');
        return [];
    }
    currentPageNum = toPage
    // 根据当前页面生成分页栏
    showPageBar(toPage)

    // 计算起始索引和结束索引
    const startIndex = (toPage - 1) * perPageNum;
    const endIndex = Math.min(startIndex + perPageNum, currentClassifyCards.length);

    // 获取指定页的数据并返回
    const pageData = currentClassifyCards.slice(startIndex, endIndex);
    
    // 滚动到页面顶部
    container.scrollTo(0, 0);
    return pageData;
}

// 根据目标页码生成分页栏
const showPageBar = (toPage) => {
    // 清空分页条 pageBar
    pageBar.innerHTML = ''
// 加载 上一页 按钮
    const upPage = document.createElement('div')
    upPage.className = 'pageItem'
    upPage.id = 'upPage'
    upPage.innerHTML = '上一页'
    // 添加点击事件
    upPage.addEventListener('click',() => {
        if(currentPageNum > 1){
            showThis(getCurrentShowCards(currentPageNum-1))
        }
    })
    // 添加到 分页条
    pageBar.appendChild(upPage)
    // 判断
    if(toPage <= 3){
    // 加载 前三页 按钮
        for(let i = 1; i <= Math.min(5,totalPages); i++){
            const firstPage = document.createElement('div')
            firstPage.className = 'pageItem'
            if(i == toPage){
                firstPage.className = 'pageItem pageItemActive'
            }
            firstPage.innerHTML = ''+i
            // 添加点击事件
            firstPage.addEventListener('click',() => {
                showThis(getCurrentShowCards(i))
            })
            // 添加到 分页条
            pageBar.appendChild(firstPage)
        }
    // 添加省略号
        const page = document.createElement('div')
        page.className = 'pageItem'
        page.innerHTML = '...'
        // 添加到 分页条
        pageBar.appendChild(page)
    // 添加最后一列
        const LastPage = document.createElement('div')
        LastPage.className = 'pageItem'
        LastPage.innerHTML = ''+totalPages
        // 添加点击事件
        LastPage.addEventListener('click',() => {
            showThis(getCurrentShowCards(totalPages))
        })
        // 添加到 分页条
        pageBar.appendChild(LastPage)
    }else if(toPage >= totalPages - 2){
    // 加载 第一页 按钮
        const firstPage = document.createElement('div')
        firstPage.className = 'pageItem'
        firstPage.innerHTML = '1'
        // 添加点击事件
        firstPage.addEventListener('click',() => {
            showThis(getCurrentShowCards(1))
        })
        // 添加到 分页条
        pageBar.appendChild(firstPage)
    // 添加省略号
        if(toPage - 5 != 1){
            const page = document.createElement('div')
            page.className = 'pageItem'
            page.innerHTML = '...'
            // 添加到 分页条
            pageBar.appendChild(page)
        }
    // 加载 末5页 按钮
        for(let i = Math.max(1,totalPages-4); i <= totalPages; i++){
            const thePage = document.createElement('div')
            thePage.className = 'pageItem'
            if(i == toPage){
                thePage.className = 'pageItem pageItemActive'
            }
            thePage.innerHTML = ''+i
            // 添加点击事件
            thePage.addEventListener('click',() => {
                showThis(getCurrentShowCards(i))
            })
            // 添加到 分页条
            pageBar.appendChild(thePage)
        }
    }else{
    // 加载 第一页 按钮
        const firstPage = document.createElement('div')
        firstPage.className = 'pageItem'
        firstPage.innerHTML = '1'
        // 添加点击事件
        firstPage.addEventListener('click',() => {
            showThis(getCurrentShowCards(1))
        })
        // 添加到 分页条
        pageBar.appendChild(firstPage)
        if(toPage != 4){
        // 添加省略号
            const page = document.createElement('div')
            page.className = 'pageItem'
            page.innerHTML = '...'
            // 添加到 分页条
            pageBar.appendChild(page)
        }
    // 加载 中间五页 按钮
        for(let i = toPage-2; i <= toPage+2; i++){
            const thePage = document.createElement('div')
            thePage.className = 'pageItem'
            if(i == toPage){
                thePage.className = 'pageItem pageItemActive'
            }
            // 添加点击事件
            thePage.addEventListener('click',() => {
                showThis(getCurrentShowCards(i))
            })
            thePage.innerHTML = ''+i
            // 添加到 分页条
            pageBar.appendChild(thePage)
        }
        if(toPage != totalPages-3){
        // 添加省略号
            const page = document.createElement('div')
            page.className = 'pageItem'
            page.innerHTML = '...'
            // 添加到 分页条
            pageBar.appendChild(page)
        }
    // 添加最后一列
        const LastPage = document.createElement('div')
        LastPage.className = 'pageItem'
        LastPage.innerHTML = ''+totalPages
        // 添加点击事件
        LastPage.addEventListener('click',() => {
            showThis(getCurrentShowCards(totalPages))
        })
        // 添加到 分页条
        pageBar.appendChild(LastPage)
    }


    
    // 加载 下一页 按钮
    const downPage = document.createElement('div')
    downPage.className = 'pageItem'
    downPage.id = 'downPage'
    downPage.innerHTML = '下一页'
    // 添加点击事件
    downPage.addEventListener('click',() => {
        if(currentPageNum < totalPages){
            showThis(getCurrentShowCards(currentPageNum+1))
        }
    })
    // 添加到 分页条
    pageBar.appendChild(downPage)
// 加载 页码 输入框
    const pageInput = document.createElement('input')
    pageInput.id = 'pageInput'
    pageInput.placeholder = '页码'
    // 添加到 分页条
    pageBar.appendChild(pageInput)
// 加载 跳转 按钮
    const toPageBtn = document.createElement('div')
    toPageBtn.id = 'toPageBtn'
    toPageBtn.innerHTML = '跳转'
    // 添加点击事件
    toPageBtn.addEventListener('click',() => {
        const toPage = document.getElementById('pageInput').value
        showThis(getCurrentShowCards(toPage))
    })
    // 添加到 分页条
    pageBar.appendChild(toPageBtn)
}

// 搜索并展示
const searchCardAndShow = (searText)=>{
    let current = []
    allCards.forEach(item=>{
        if(item.detail.includes(searText)){
            current.push(item)
        }
    })
    currentClassifyCards = current
    // 计算总页数
    totalPages = Math.ceil(currentClassifyCards.length / perPageNum);
    showThis(getCurrentShowCards(1))
}



// 点击主页搜索按钮
search_btn.addEventListener('click',() => {
    searchCardAndShow(searchText.value)
})


// 点击card 事件 进入 detail 界面
const cardClick = (card) => {
    const cardStr = JSON.stringify(card)

    let ref = '../html/article.html?card='+encodeURI(cardStr)
    window.location.href = ref
}

