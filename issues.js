let url = "github.com/jekyll/jekyll/issues";
const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");
const path = require("path");
const pdfkit = require("pdfkit");
function getIssues(url, topic, repoName) {

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
        //eme ek ek issue ka link hai
        let links = $(".Box-row .Link--primary");

        let arr = [];
        for (let i = 0; i < links.length; i++) {
            let link = $(links[i]).attr("href");
            link = "https://github.com" + link;
            //e array kaam aaega json banane me
            arr.push(link);
        }

        //ab folder aur file me data ko organise kar rhe hai
        //pehle topic(ex: vue) ke naam ka folder ban liye
        let folderPath = path.join(__dirname, topic);
        dirCreater(folderPath);

        //us folder me repo/project ke naam ka 8 file banana hai
        let filePath = path.join(folderPath, repoName + ".json");
        fs.writeFileSync(filePath, JSON.stringify(arr));


        //pdf me karne ke liye
        let filePath2 = path.join(folderPath, repoName + ".pdf");
        let text = JSON.stringify(arr);
        let pdfDoc = new pdfkit;
        pdfDoc.pipe(fs.createWriteStream(filePath2));
        pdfDoc.text(text);
        pdfDoc.end();
    }

    function dirCreater(folderPath) {
        let pathExist = fs.existsSync(folderPath);
        if (!pathExist) {
            fs.mkdirSync(folderPath);
        }
    }

}
module.exports = getIssues;
