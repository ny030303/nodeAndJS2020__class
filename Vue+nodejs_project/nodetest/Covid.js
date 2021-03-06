const cheerio = require('cheerio');
const { resolve } = require('path');
const request = require('request');

String.prototype.toNumber = function(){
    return parseInt(this.split("").filter(x => x != " " && x != ",").join(""));
}

function getCovidData(){
    const url = "http://ncov.mohw.go.kr/bdBoardList_Real.do";
    // 2020-12-23
    return new Promise( (resolve, reject)=>{
        request(url, (err, res, body)=>{
            const $ = cheerio.load(body);
            //갓채영 
            let total = $(".ca_value").eq(0).html().toNumber();
            let covid = $(".inner_value").eq(0).html().toNumber();
            let covid_d = $(".inner_value").eq(1).html().toNumber();
            let covid_o = $(".inner_value").eq(2).html().toNumber();
            
            let freecnt = $(".ca_value").eq(2).html().toNumber();
            let freecnt_compare = $(".txt_ntc").eq(0).html().toNumber();
    
            let inprison = $(".ca_value").eq(4).html().toNumber();
            let inprison_compare = $(".txt_ntc").eq(1).html().toNumber();
    
            let death = $(".ca_value").eq(6).html().toNumber();
            let death_compare = $(".txt_ntc").eq(2).html().toNumber();
            
            let dateString = $(".t_date").eq(0).html();
            let dateArr = dateString.substr(1).split("."); //0번째는 월, 1번째는 1일

            let now = new Date();
            let year = now.getFullYear();
            let date = `${year}-${dateArr[0]}-${dateArr[1]}`;

            resolve({date, total,covid,covid_d,covid_o,freecnt,freecnt_compare,inprison,inprison_compare,death,death_compare});
        });
    });
}
//getCovidData라는 함수를 내보내기 위해서 써야하는 코드 한줄을 말해라
module.exports.getCovidData = getCovidData;

// let html = `
//     <div class="abc">ㅁㅇㅁㄴㅇ</div>
//     <div class="gondr">sss</div>
//     <div class="cccc">qwe</div>
// `;

// let $ = cheerio.load(html);

// const msg = $(".gondr").html();

// console.log(msg);

// document => 
// 문서 객체 -> HTML문서를 해석해서 DOM 형태로 트리구조화 시켜놓은것을 담고 있는 객체
//document

// 노드는 브라우저라는 플랫폼을 벗어나서 
// 컴퓨터 어디든 JS실행시킬 수 있는 환경을 만들어준거.
// 정나영 1000원
// npm === gradle === packgist(composer) === pip
// 해오지않으면 1000원씩만 
// 김가현 1000원
// 김창현+현창 1000원 
// 박태양 1000원
// 하늘새미 1000원

// 이수안 12월 23일 6교시 결과로 인한 벌금 1000원씩
// 한다원 1000원