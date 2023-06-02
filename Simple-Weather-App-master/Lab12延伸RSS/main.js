$(function(){
    //$("button").on("click", loadServerData);
    $("#see").on("click", FindNews);
    FindNews();
});

function FindNews(){
    $("#tablebody").empty();
    let rss2json = "https://api.rss2json.com/v1/api.json?rss_url=";
    $.getJSON(rss2json+"https://www.cwb.gov.tw/rss/Data/cwb_warning.xml")
    .done(function(data){
        for(let x=0; x<data.items.length;x++){
            if(data.items[x].title != "")
            {
                $("#tablebody").append(
                    `<tr><td style="font-size: 20px; font-weight: bold;">${data.items[x].title}</td> <td style="font-size: 25px; font-weight: bold;">${data.items[x].description}</td> <td style="font-size: 20px;"><a target='_blank' href='${data.items[x].link}' style="color: red;">link here</a></td> </tr>`
                );
            } 
        }
    })
    .fail(function(){console.log("Error");})
    .always(function(){console.log("Always")});
}

function loadServerData(){
    $("#dataTable").empty();
    let rss2json = "https://api.rss2json.com/v1/api.json?rss_url=";
    $.getJSON(rss2json+"https://www.reddit.com/.rss")
    .done(function(data){
        
        for(let x=0; x<data.items.length;x++){
            if(data.items[x].thumbnail != "")
            {
                $("#dataTable").append(
                    `<tr><td><a target='_blank' href='${data.items[x].link}'>${data.items[x].title}</a></td> <td><img src='${data.items[x].thumbnail}'></td> <td>${data.items[x].pubDate.split(" ")[0]}</td></tr>`
                );
            }
            else
            {
                $("#dataTable").append(
                    `<tr><td><a target='_blank' href='${data.items[x].link}'>${data.items[x].title}</a></td> <td><img src='1.jpg'></td> <td>${data.items[x].pubDate.split(" ")[0]}</td></tr>`
                );
            }
            
        }
    })
    .fail(function(){console.log("Error");})
    .always(function(){console.log("Always")});
}