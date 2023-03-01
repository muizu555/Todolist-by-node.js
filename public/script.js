const tasksDom = document.querySelector(".tasks");
const formDom = document.querySelector(".task-form");//なんでdivじゃないの
const taskInputDom = document.querySelector(".task-input"); //taskInputDomのvalue属性の中に文字列が入っているはず
const formAlertDom = document.querySelector(".form-alert");


// api/v1/tasksからタスクを読み込む
//何をすべきか　ー＞　axiosを使ってエンドポイントにアクセスする必要がある
//アロー関数を多用するので勉強が必要かも
//if you access routes, youは非同期を使わないといけない

const showTasks = async () => {
    try {
        //ここで自作のAPIを叩く ー> APIのエンドポイントにアクセスする
        const { data: tasks } = await axios.get("/api/v1/tasks");  //{ data: tasks } この記述をデータ属性だけが欲しいから

        //タスクが一つもない時
        //console.log(tasks.length);
        
        if(tasks.length < 1){
            tasksDom.innerHTML = `<h5 class = "empty-list">タスクがありません悲しいよー</h5>` //挿入している
            return; //ここで関数から脱出している
        }
        

        //タスクを出力 読み込む
        const allTasks = tasks.map((task) => {  //map関数とは、(変数)を一つ一つ取り出すという意味
            const { completed, _id, name} = task;  //ここは分割代入らしいが、今は変数指定を{}ですると一つ一つ取り出せるという理解で良さそう
            //ここのreturnが分からない
            return `  <div class="single-task ${completed && "task-completed"}">  
            <h5><span><i class="far fa-cheak-circle"></i></span>${name}</h5>
            <div class="task-links">
                <!--編集リンク-->
                <a href="edit.html?id=${_id}" class="edit-link">
                    <i class="fas fa-edit"></i>
                </a>
                <!--ゴミ箱リンク-->
                <button type="button" class="delete-btn" data-id= "${_id}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>`
        })
        .join("");//配列の区切りのカンマを消してくれる
        tasksDom.innerHTML = allTasks;
    } catch (err) {
        console.log(err);
    }

};

showTasks();

//タスクを新規作成する
formDom.addEventListener("submit", async (event) => {  //eventで再リロードされるのを阻止しようとしている
    event.preventDefault();
    const name = taskInputDom.value;

    try {
        await axios.post("/api/v1/tasks", { name: name});//ここで投稿はしたが、まだ表示はされてないはず
        showTasks();
        taskInputDom.value = "";//打ち込んだ後に空にしたい！！
        formAlertDom.style.display = "block";//これ何？
        formAlertDom.textContent = "タスクを追加しました";
        formAlertDom.classList.add("text-success");
        
    } catch (err) {
        console.log(err);
        formAlertDom.style.display = "block";
        formAlertDom.innerHTML = "無効ですもう一度やり直してください。20文字以内だよ!"
        
    }
    setTimeout (() => {//なんでcatch分の中じゃないの？
        formAlertDom.style.display = "none";
        formAlertDom.classList.remove("text-success");
    },3000); //3秒後に消えて欲しい

});

//タスクを削除する
tasksDom.addEventListener("click", async (event) => {
    const element = event.target;
    //console.log(element.parentElement); //ゴミ箱のボタンの親の要素を取得できた
    if(element.parentElement.classList.contains("delete-btn")){//ここでゴミ箱ボタンかどうかの判定
        const id = element.parentElement.dataset.id;
        console.log(id);
        try {
            await axios.delete(`/api/v1/tasks/${id}`)//mongodbのIDが欲しい  ${id}これをどこから持ってくるかがカギとなる！ なんでここだけ’’なのか？
            showTasks();//この関数は前に書いた画面に反映させる関数
            
        } catch (err) {
            console.log(err);
            
        }

    }
});




