/**
 * Created by zh on 17-8-14.
 */
$(document).ready(function () {
    let count = 1;
    let sy='',sm='',ey='',em='';
    let URL = `http://127.0.0.1:8081/news?count=${count}&sy=${sy}&sm=${sm}&ey=${ey}&em=${em}`;
    pageOne(URL,"thelist");
    $(window).bind("scroll",function () {
        if($(window).scrollTop()+$(window).height()>=$(document).height()){
            ajaxRead();
        }
    });
    function ajaxRead() {
        console.log(count)
        count++;
        URL = `http://127.0.0.1:8081/news?count=${count}&sy=${sy}&sm=${sm}&ey=${ey}&em=${em}`;
        $.ajax({
            url:URL,
            type:"GET",
            crossDomain:true,
            cache:false,
            success:function (data) {
                /*设置中间的分割线*/
                let div3 = document.createElement('div');
                div3.setAttribute("class","time-line1");
                $("#thelist").append(div3);

                if(count % 2 ===0){
                    makeLines(data,"thelist","time-line-content2","time-line2");
                    for(let i=0; i<data.length; i++){
                        if(i%2 ===1){
                            makeRightLi(data[i],"rectangle1","thelist","30%");
                        }else{
                            makeRightLi(data[i],"rectangle1","thelist","15%");
                        }
                    }
                }else {
                    makeLines(data,"thelist","time-line-content","time-line");
                    for(let i=0; i<data.length; i++){
                        if(i%2 ===1){
                            makeLeftLi(data[i],"rectangle2","thelist","30%");
                        }else{
                            makeLeftLi(data[i],"rectangle2","thelist","15%");
                        }
                    }
                }
                if(data.length<6){
                    makePrompt("thelist");
                }
            }
        });
    }
    // $("#filter").click(function (e) {
    //     e.preventDefault();
    //     sy = $("#startYear").val();
    //     sm = $("#startMonth").val();
    //     ey = $("#endYear").val();
    //     em = $("#endMonth").val();
    //     URL = `http://127.0.0.1:8081/news?count=${count}&sy=${sy}&sm=${sm}&ey=${ey}&em=${em}`;
    //     $("#thelist").empty();
    //     pageOne(URL,"thelist");
    //
    // });

    $("#show_news").click(function () {
        $("#wrapper1").css("display","none");
        $("#wrapper").css("display","block");
        sy='';sm='';ey='';em='';
    });
});

$(document).ready(function () {
    let count = 1;
    let sy='',sm='',ey='',em='';
    let URL = `http://127.0.0.1:8081/blogs?count=${count}&sy=${sy}&sm=${sm}&ey=${ey}&em=${em}`;
    pageOne(URL,"thelist1");
    $(window).bind("scroll",function () {
        if($(window).scrollTop()+$(window).height()>=$(document).height()){
            ajaxRead();
        }
    });
    function ajaxRead() {
        console.log(count)
        count++;
        URL = `http://127.0.0.1:8081/blogs?count=${count}&sy=${sy}&sm=${sm}&ey=${ey}&em=${em}`;
        $.ajax({
            url:URL,
            type:"GET",
            crossDomain:true,
            cache:false,
            success:function (data) {
                /*设置中间的分割线*/
                let div3 = document.createElement('div');
                div3.setAttribute("class","time-line1");
                $("#thelist1").append(div3);

                if(count % 2 ===0){
                    makeLines(data,"thelist1","time-line-content2","time-line2");
                    for(let i=0; i<data.length; i++){
                        if(i%2 ===1){
                            makeRightLi(data[i],"rectangle1","thelist1","30%");
                        }else{
                            makeRightLi(data[i],"rectangle1","thelist1","15%");
                        }
                    }
                }else {
                    makeLines(data,"thelist1","time-line-content","time-line");
                    for(let i=0; i<data.length; i++){
                        if(i%2 ===1){
                            makeLeftLi(data[i],"rectangle2","thelist1","30%");
                        }else{
                            makeLeftLi(data[i],"rectangle2","thelist1","15%");
                        }
                    }
                }
                if(data.length<6){
                    makePrompt("thelist1");
                }
            }
        });
    }
    // $("#filter").click(function (e) {
    //     e.preventDefault();
    //     sy = $("#startYear").val();
    //     sm = $("#startMonth").val();
    //     ey = $("#endYear").val();
    //     em = $("#endMonth").val();
    //     URL = `http://127.0.0.1:8081/blogs?count=${count}&sy=${sy}&sm=${sm}&ey=${ey}&em=${em}`;
    //     $("#thelist1").empty();
    //     pageOne(URL,"thelist1");
    // });

    $("#show_blogs").click(function () {
        $("#wrapper1").css("display","block");
        $("#wrapper").css("display","none");
        sy='';sm='';ey='';em='';
    })
});

function pageOne(URL,theListId) {
    $.ajax({
        url:URL,
        type:"GET",
        crossDomain:true,
        cache:false,
        success:function (data) {
            makeLines(data,theListId,"time-line-content","time-line");
            for(let i=0; i<data.length; i++){
                if(i%2 ===1){
                    makeLeftLi(data[i],"rectangle2",theListId,"30%");
                }else{
                    makeLeftLi(data[i],"rectangle2",theListId,"15%");
                }
            }
            if(data.length<6){
                makePrompt(theListId);
            }
        }
    })
}

function makeLines(data,theListId,timeLineContent,timeLine) {
    let el,div1,div2;
    el = document.getElementById(theListId);
    div1 = document.createElement('div');
    div2 = document.createElement('div');
    div1.appendChild(div2);
    el.appendChild(div1);
    div1.setAttribute("class",timeLineContent);
    div1.style.height = `${data.length*188}px`;
    div2.setAttribute("class",timeLine);
    div2.style.height = `${data.length*191}px`;
}

function makeLeftLi(data,rectangle,theListId,rate) {
    let li = document.createElement('li');
    li.setAttribute("class",rectangle);
    li.style.marginLeft = rate;
    li.innerHTML = `
        <div class="row html">
        <div class="col-md-8 col-xs-12">
        <h3><a href="">${data.title}</a></h3>
        <p>作者：${data.author}<span class="glyphicon glyphicon-calendar" style="margin-left: 10px"></span><span>${data.date}</span></p>
        <p class="content">${data.content}</p>
        <a href="">READ MORE</a>
        </div>`;
    if(data.pictureUrl !== null){
        li.innerHTML += `<a href="" class="col-md-4 img"><img src="${data.pictureUrl}"></a>`;
    }
    li.innerHTML += `</div>`;
    $(`#${theListId}`).append(li);
}

function makeRightLi(data,rectangle,theListId,rate) {
    let li = document.createElement('li');
    li.setAttribute("class",rectangle);
    li.style.marginRight = rate;
    li.innerHTML = `
        <div class="row html">
        <div class="col-md-8 col-xs-12">
        <h3><a href="">${data.title}</a></h3>
        <p>作者：${data.author}<span class="glyphicon glyphicon-calendar" style="margin-left: 10px"></span><span>${data.date}</span></p>
        <p class="content">${data.content}</p>
        <a href="">READ MORE</a>
        </div>`;
    if(data.pictureUrl !== null){
        li.innerHTML += `<a href="" class="col-md-4 img"><img src="${data.pictureUrl}"></a>`;
    }
    li.innerHTML += `</div>`;
    $(`#${theListId}`).append(li);
}

function makePrompt(theListId) {
    let li = document.createElement('li');
    li.innerHTML = `
        <div class="row html">
            <div class="col-md-10" style="margin-top: 20px">
            <p style="text-align: center;color: #01AAED;font-size: 65%">没有更多新闻了:(</p>
        </div>
                     `;
    $(`#${theListId}`).append(li);
    $(window).unbind('scroll');
}
