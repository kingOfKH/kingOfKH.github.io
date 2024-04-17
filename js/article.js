// window.addEventListener("DOMContentLoaded",() => {
//     // 获取标题 前往下载 gotoDown
// const gotoDown = document.getElementById('gotoDown')

// // 获取所有img并添加load
// const imgs = document.getElementsByClassName('articleImg')
// console.log("imgs:",imgs);
// // 遍历所有图片元素并为它们添加load事件监听器
// for (let i = 0; i < imgs.length; i++) {
//     console.log("img"+i+":",imgs[i]);
//     imgs[i].addEventListener('load',() => {
//         console.log("img"+i+"load");
//         imgs[i].style.display = 'block'
//         // 隐藏 img_load
//         document.getElementById('img_load_'+imgs[i].id).style.display='none'
//     })
// }

// gotoDown.addEventListener('click',() => {
//     const downLoad = document.getElementById('downLoad')
//     downLoad.scrollIntoView({behavior:'smooth'})
// })

// function goLink(link){
//     document.location.href = link
// }

// })



// 获取标题 前往下载 gotoDown
const gotoDown = document.getElementById('gotoDown')


if(gotoDown != null){
    gotoDown.addEventListener('click',() => {
        const downLoad = document.getElementById('downLoad')
        downLoad.scrollIntoView({behavior:'smooth'})
    })
}


function goLink(link){
    document.location.href = link
}

const articleTags = document.getElementById('articleTags')
const tags = articleTags.children;
for(let i = 0; i < tags.length; i++){
    tags[i].addEventListener('click',() => {
        // 搜索标签
        let ref = '../../index.html?search='+tags[i].innerHTML
        window.location.href = ref
    })
}

function isToday(someDate) {
    const today = new Date();
    return someDate.getDate() === today.getDate() &&
           someDate.getMonth() === today.getMonth() &&
           someDate.getFullYear() === today.getFullYear();
}

const PERDAYDOWNLOAD = document.getElementById('PERDAYDOWNLOAD')
const PERDAYDOWNLOADBTN = document.getElementById('PERDAYDOWNLOADBTN')
PERDAYDOWNLOADBTN.addEventListener('click',() => {
    console.log('点击了');
    // 存储数据
    localStorage.setItem('BZXM_PER_DAY', new Date());
    localStorage.setItem('BZXM_PER_DAY_FLAG', false);
})
// 判断是否每日第一次获取
// 获取数据
const BZXM_PER_DAY = localStorage.getItem('BZXM_PER_DAY');
const BZXM_PER_DAY_FLAG = localStorage.getItem('BZXM_PER_DAY_FLAG');
if(BZXM_PER_DAY != undefined){
    console.log(isToday(new Date(BZXM_PER_DAY)));
    console.log(BZXM_PER_DAY_FLAG);
    if(isToday(new Date(BZXM_PER_DAY)) && BZXM_PER_DAY_FLAG == 'true'){
        console.log('dsssss');
        PERDAYDOWNLOAD.style.display = 'block'
    }
}else{
    // 存储数据
    localStorage.setItem('BZXM_PER_DAY', new Date());
    localStorage.setItem('BZXM_PER_DAY_FLAG', true);
    PERDAYDOWNLOAD.style.display = 'block'
}