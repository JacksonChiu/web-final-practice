let player;//YouTubePlayer
let currentPlay=0;//記錄目前撥到第幾個頻道
let Allplay=3;

$(function(){
    $("#nextButton").on("click", NextTV);
    $("#lastButton").on("click", LastTV);
});

//YouTubeAPIReady
function onYouTubeIframeAPIReady()
{
    player=new YT.Player("player",{
        height:"600",
        width:"1100",
        videoId: playList[currentPlay],
        playerVars:{
            autoplay:1,//是否自動撥放
            controls:0,//是否顯示控制項
            // start:playTime[currentPlay][0],//開始秒數
            // end:playTime[currentPlay][1],//結束秒數
            iv_load_policy:3
        },
        events:{
            onReady:onPlayerReady,
            onStateChange:onPlayerStateChange
        }
    });

}

//YouTubePlayerReady
function onPlayerReady(event)
{
    //$("h2").text(player.getVideoData().title);
    player.playVideo();
}

//PlayerStateChange
function onPlayerStateChange(event)
{
    if(Math.floor(player.getCurrentTime())!=playTime[currentPlay][1]){
        if(currentPlay<playList.length-1){
            currentPlay++;
            player.loadVideoById({
                videoId:playList[currentPlay],
                // startSeconds:playTime[currentPlay][0],
                // endSeconds:playTime[currentPlay][1],
                suggestedQuality:"large"
            });
        }else{
            currentPlay=0;
            player.cueVideoById({
                videoId:playList[currentPlay],
                // startSeconds:playTime[currentPlay][0],
                // endSeconds:playTime[currentPlay][1],
                suggestedQuality:"large"
            });
            $("h2").text("");
        }
    }
    if(event.data==1){ 
        $("h2").text(player.getVideoData().title);
    }
}

function NextTV(){
    currentPlay++;
    if(currentPlay<Allplay)
    {
        player.loadVideoById({
            videoId:playList[currentPlay],
            
            suggestedQuality:"large"
        });
    }
    else
    {
        currentPlay=0;
        player.loadVideoById({
            videoId:playList[currentPlay],
            
            suggestedQuality:"large"
        });
    }
    
}

function LastTV(){
    currentPlay--;
    if(currentPlay==-1)
    {
        currentPlay=Allplay-1;
        player.loadVideoById({
            videoId:playList[currentPlay],
            
            suggestedQuality:"large"
        });
    }
    else
    {
        player.loadVideoById({
            videoId:playList[currentPlay],
            
            suggestedQuality:"large"
        });
    }
    
}