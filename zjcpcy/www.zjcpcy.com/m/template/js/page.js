function getPageBar(){
 //页码大于最大页数
 if(curPage>totalPage){
    curPage=totalPage;
 }

var pageStr = "";
 //页码小于1
 if(curPage<1){
  curPage=1;
 }
 //pageStr = "<span>共"+total+"条</span><span>"+curPage+"/"+totalPage+"</span>";


 //如果是第一页
 if(curPage==1){
  pageStr += "<span class='prevpage'>上一页</span>";
 }else{
  pageStr += "<span class='prevpage'><a href='javascript:void(0)' rel='"+(curPage-1)+"'>上一页</a></span>";
 }

var start;
var end;

/*  if(totalPage <= 5) {
    start = 1;
    end = totalPage;
  } else {
    if(curPage-2 <= 0) {
        start = 1;
        end = 5;
    } else {
        if(totalPage-curPage < 2) {
            start = totalPage - 4;
            end = totalPage;
        } else {
            start = curPage - 2;
            end = curPage + 2;
        }
    }
  }*/

for(var i=1;i<=totalPage;i++) {
    if(i == curPage) {
        pageStr += "<span class='pageBtn-selected'><a href='javascript:getData("+i+")'>"+i+"</a></span>";
    } else {
        pageStr += "<span class='pageBtn'><a href='javascript:getData("+i+")'>"+i+"</a></span>";
    }
}

 //如果是最后页
 if(curPage>=totalPage){
  pageStr += "<span class='nextpage'>下一页</span>";
 }else{
  pageStr += "<span class='nextpage'><a href='javascript:void(0)' rel='"+(parseInt(curPage)+1)+"'> 下一页</a></span>";
 }

 $("#pagecount").html(pageStr);
}

$(function(){
 getData(1);
 $("#pagecount span a").live('click',function(){
  var rel = $(this).attr("rel");
  if(rel){
   getData(rel);
  }
 });
});
