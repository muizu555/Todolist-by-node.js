const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    name: {//todoの打ち込む内容
        type: String,
        required: [true, "タスク名を入れてください。"],//名前をつけないとエラーが吐かれるらしい？　ここの挙動を詳しく
        trim: true,//空白をなくしてくれる
        maxlength: [20, "タスク名は20文字以内で入力してください。"],
    },
    completed: {
        type: Boolean,
        default: false, //タスクを入れた直後は完了してないから
    },
});

module.exports = mongoose.model("Task", TaskSchema);//全てのファイルからアクセスできるように？　ここよく分からん