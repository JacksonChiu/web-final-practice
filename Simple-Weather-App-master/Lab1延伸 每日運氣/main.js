var temp=0
let imgageURL_Array=[
    "./emo/1.png",
    "./emo/2.png",
    "./emo/3.png",
    "./emo/4.png",
    "./emo/5.png",
];
let emostring=[
    "災轗時時退\n名顯四方揚\n改故重乘祿\n昴高福自昌",
    "舊愆何日解\n戶內保嬋娟\n要逢十一口\n遇鼠過牛邊",
    "道合須成合\n先憂事更多\n所求財寶盛\n更變得中和",
    "有物不周旋\n須防損半邊\n家鄉煙火裡\n祈福始安然",
    "愁惱損忠良\n青霄一炷香\n雖然防小過\n閑慮覺時長",
];
let emostringmean=[
    "解釋: 災難也慢慢地消失，運勢會展開來吧。\n名聲慢慢地傳遍世間，就好的意義看，不知道的人也變得不存在吧。\n能改去過去的事，名聲和實際都能得到幸運吧。\n出人頭地，變得福運繁榮，會繁盛吧。",
    "解釋: 變成擔心過去的錯誤何時才能消失吧。\n家裡加入美人，這件事想向世人公布就是沒有反省自己的生活與沒有節操，用心在家裡和睦吧。\n如果試著將十一和口重疊起來看的話，會變成吉字。也就是說，如果期望吉事而努力做的話，必定會到來吧。\n像是在人們沈靜入睡的夜晚也起床工作般地努力吧。",
    "解釋: 如果自身的行為符合道理的話，什麼都會成功吧。\n但是在最初的時候悲傷和痛苦會很多吧。\n之後，所希望的財寶會如心想地聚集過來吧。\n未來的災難也會馬上變成往幸福的方向，繁盛會到來吧。",
    "解釋: 雖然有很多東西但是難到手的狀況。雖然希望很豐富，但是難以實現吧。\n成功一半，損失一半吧。但是不要堅持小事，想著一半已經成功事吧。\n有火災發生的危險。要充分地注意吧。\n相信神明或佛菩薩，如果抱著堅定的心，最後會變得安泰吧。",
    "解釋: 層層疊疊嘆氣與苦惱，被回報的事很少吧。\n就像向著天燒香祈禱般地，你的願望無法傳達天聽吧。\n雖這樣說，但就算只有一點點善行也好，作了可以逃離災厄吧。\n東想西想之間，似乎不知不覺就像過了很長的時間。等待時機的到來吧。",
];
let sign=[
    "大吉",
    "中吉",
    "小吉",
    "末吉",
    "凶",
];
$(function(){
    $("#start").on("click",function(){
        $("#sign").empty();
        $("#signmean").empty();
        var NumofList = imgageURL_Array.length;
        var randomChildNum = Math.floor(Math.random()*NumofList);

        if(temp !== randomChildNum)
        {
            console.log(temp);
            console.log(randomChildNum);
        }
        else
        {
            randomChildNum=(randomChildNum+1)%4;  
        }
        //change img
        $("h1").text(sign[randomChildNum]);

        $("#sign").append(emostring[randomChildNum]);
        $("#signmean").append(emostringmean[randomChildNum]);
        
        $("img").attr("src",imgageURL_Array[randomChildNum]);
        temp = randomChildNum;
    });
});