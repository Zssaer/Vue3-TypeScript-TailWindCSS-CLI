// 获取滚动条的位置
const getScrollTop = function () {
  var scrollPos;
  if (window.pageYOffset) {
    scrollPos = window.pageYOffset;
  } else if (document.compatMode && document.compatMode != "BackCompat") {
    scrollPos = document.documentElement.scrollTop;
  } else if (document.body) {
    scrollPos = document.body.scrollTop;
  }
  return scrollPos;
};

// 滚动条滚动到底部
const scrollBottom = function () {
  var bottom;
  //变量scrollTop是滚动条滚动时，距离顶部的距离
  var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  //变量windowHeight是可视区的高度
  var windowHeight =
    document.documentElement.clientHeight || document.body.clientHeight;
  //变量scrollHeight是滚动条的总高度
  var scrollHeight =
    document.documentElement.scrollHeight || document.body.scrollHeight;
  //滚动条到底部的条件
  if (Math.ceil(scrollTop + windowHeight) >= scrollHeight) {
    //到了这个就可以进行业务逻辑加载后台数据了 到底部了
    bottom = true;
  } else {
    bottom = false;
  }
  return bottom;
};

// 设置视窗的最小高度
const setMinHeight = function () {
  let winHeight = document.documentElement.clientHeight; //视窗的高度
  let footHeight = document.querySelector(".footer")?.clientHeight;
  // let headerHeight = document.querySelector('.header').clientHeight;
  if (footHeight != null) {
    let minHeight = winHeight - footHeight + "px";
    return minHeight;
  }else{
    let minHeight = winHeight + "px";
    return minHeight;
  }
};

export { getScrollTop, scrollBottom, setMinHeight };
