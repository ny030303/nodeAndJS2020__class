const cheerio = require('cheerio');
const request = require('request');

const url = "http://ncov.mohw.go.kr/bdBoardList_Real.do";

request(url, (err,res, body) => {
    const $ = cheerio.load(body);

    let data = {
        
    }

    let list = {
        t1: $(".ca_value").eq(0).html(),
        t_i:[$(".inner_value").eq(0).html(), 
            $(".inner_value").eq(1).html(), 
            $(".inner_value").eq(2).html()
        ],
        t2: [$(".ca_value").eq(2).html(), $(".ca_value .txt_ntc").eq(0).html()],
        t3: [$(".ca_value").eq(4).html(), $(".ca_value .txt_ntc").eq(1).html()],
        t4: [$(".ca_value").eq(6).html(), $(".ca_value .txt_ntc").eq(2).html()]
    };
    console.log(`
        확진환자 누적 : ${list.t1}
        확진환자 전일대비 소계 : ${list.t_i[0]}
        확진환자 전일대비 국내발생 : ${list.t_i[1]}
        확진환자 전일대비 해외유입 : ${list.t_i[2]}
        격리해제 누적 : ${list.t2[0]}
        격리해제 전일대비 : ${list.t2[1]}
        격리중 누적 : ${list.t3[0]}
        격리중 전일대비 : ${list.t3[1]}
        사망 누적 : ${list.t4[0]}
        사망 전일대비 : ${list.t4[1]}
    `);
});
// let html = `
//     <div class="abc">asddassd</div>
//     <div class="gondr">sss</div>
//     <div class="ccc">qwe</div>
// `;

// let $ = cheerio.load(html);
// const msg = $("gondr").html();

// console.log(cheerio); // JSOUP
// document =>
// 문서 객체 -> HTML 문서를 해석해서 DOM 형태로 트리구조화 시켜놓은 것을 담고 있는 객체
// 

// 노드는 브라우저 플랫폼을 벗어나서
// 컴퓨터 어디든 js 실행을 시킬수 있는 환경을 만들어주는거
// npm === gradle === packgist(composer) === pip