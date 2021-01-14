const {getCovidData} = require('./Covid');
const express = require('express'); //지금 설치한 express를 가져온다.
const http = require('http');
const path = require('path');

//con은 안가져오고 query만 Q라는 이름으로 가져올꺼야.
const {query:Q} = require('./DB'); //구조분해 할당

// React와 Node를 마스터한 자 정나영

//익스프레스를 이용하여 웹서버 만들기
const app = express();
const server = http.createServer(app);


//이거 두줄 설명이요.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//정적파일은 public폴더를 참조하도록 코드를 작성한다
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async (req, res)=>{
    console.time("render");
    const existSql = "SELECT * FROM covid_data WHERE date = ?";
    // 여기서 오늘날짜를 받아서 
    let today = new Date().toISOString().slice(0,10);

    let existData = await Q(existSql, [today]);

    if(existData.length === 0){
        getCovidData().then(d => {
            if(d.date == today) { // 날짜가 오늘이면
                const sql = 
                `INSERT INTO covid_data(date, total, covid, covid_d, covid_o, 
                                        freecnt, freecnt_compare, inprison, inprison_compare, 
                                        death, death_compare)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
                 d.dataCheck = true;
                res.render('main', d);
                
                let valueList = [];
                for( let key in d){
                    valueList.push(d[key]);
                }

                Q(sql, valueList).then( data => {
                    console.timeEnd("render");
                });          
            } else {
                console.log("오늘 코로나 데이터는 없어요;;");
                res.render('main', {dataCheck : false});
            }
              
        });
    }else{
        existData[0].dataCheck = true;
        res.render('main', existData[0]);
        console.timeEnd("render");
    }
});

server.listen(54000, ()=>{
    console.log("서버가 54000번 포트에서 동작중입니다.");
});