layui.use('upload', function(){
    layui.upload({
        url: '/upload/video',
        elem:'#testVideo',
        success: function(res){
            //console.log(res); //上传成功返回值，必须为json格式
            $('#LAY_demo_upload_video').attr('src', res.url);
        }
    });
});
function setLayuiUploadVideo() {
    let videoUrl = localStorage.getItem('videoUrl');
    console.log(videoUrl);
    $('#LAY_demo_upload_video').attr('src', videoUrl);
}
function saveVideoUrl() {
    localStorage.setItem('videoUrl', $('#LAY_demo_upload_video').attr('src'));
}
