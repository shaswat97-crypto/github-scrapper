const cheerio = require("cheerio");
const request = require("request");
const getIssues = require("./issues");
function getRepoLinks(url, topic) {

    request(url, cb);

    function cb(err, response, html) {
        if (err) {
            console.log(err);
        }
        else {
            solve(html);
        }
    }

    function solve(html) {

        let $ = cheerio.load(html);
        //yha sab repo ka link hai
        let links = $(".f3");

        console.log(topic);
        for (let i = 0; i < 8; i++) {
            //ek div me 2 anchor hai, usme se ek ke jrurat hai
            let twoAnchors = $(links[i]).find("a");
            let link = $(twoAnchors[1]).attr("href");
            //iha humko issues ka link chiye, to isi repo ke link me /issues jod die
            link = "https://github.com" + link + "/issues";
            let repoName = link.split('/')[4];
            console.log(repoName + " -> " + link);
            getIssues(link, topic, repoName);
        }
        console.log("````````````````````````````````````````````````````````````````````");
    }
}
module.exports = getRepoLinks;