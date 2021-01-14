const { reject } = require('async');
const { request } = require('http');
const mysql = require('mysql');
const { resolve } = require('path');

const connectionInfo = {
    user: 'yy_20106',
    password: '1234',
    host: 'gondr.asuscomm.com',
    database: 'yy_20106'
};

const con = mysql.createConnection(connectionInfo);

function query(sql, data) {
    return new Promise((resolve, reject) => {
        con.query(sql, data, (err,result) => {
            if(err) reject(err);
            else resolve(result);
        })
    });
}

module.exports.con = con;
module.exports.query = query;