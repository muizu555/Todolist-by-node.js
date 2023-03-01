const express = require("express");
const app = express();

const taskRoute = require("./routes/tasks"); //task.jsからrouterを取ってきている ルーティング設計は難しい

const connectDB = require("./db/connect");//データベースと繋げている
require("dotenv").config();//これで.envから呼び出している

app.use(express.json());//json形式のデータを受け取るということ
app.use(express.static("./public"))



const PORT = 3000;

//これがルーティング設計
app.use("/api/v1/tasks", taskRoute);///api/v1/tasksは共通する部分 

//データベースと接続
const start = async () => { //非同期処理の書き方
    try {
        await connectDB(process.env.MONGO_URL);//秘匿性を上げるために.envへ移した
        app.listen(PORT, console.log("サーバーが起動しました"));
        
    } catch (err) {
        console.log(err);
    }
};

start();//上の非同期処理の関数を呼び出している







//app.listen(PORT, console.log("サーバーが起動しました")); これも非同期処理の中に入れても良い