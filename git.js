url = "https://github.com/topics";
const cheerio = require("cheerio");
const request = require("request");
const getRepoLinks = require("./projects")
request(url, cb);
function cb(err, response, html){
    if(err){
        console.log(err);
    }
    else{
        solve(html);
    }
}
function solve(html){
    let $ = cheerio.load(html);
    //3 topics
        //top 8 projects
            //all issues
    //3no toic ka link nikale

    //3no topic ka link isme hai
    let links = $(".topic-box a");

    //ek ek link nikale
    for(let i=0; i<links.length; i++){
        let link = $(links[i]).attr("href");
        // console.log(a);
        link = "https://github.com"+link;
        let topic = link.split("/")[4];
        
        //abhi keval tpoic ka link mila hai
        //ab hum is topic ke link ke under jaake, 8 repo nnikale
        getRepoLinks(link, topic);
    }
}