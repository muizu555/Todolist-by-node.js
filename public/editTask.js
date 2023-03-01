const taskIDDom = document.querySelector(".task-edit-id");
const taskNameDom = document.querySelector(".task-edit-name");
const editFormDom = document.querySelector(".single-task-form");
const formAlertDom = document.querySelector(".form-alert");
const taskCompletedtDom = document.querySelector(".task-edit-completed");



const params = window.location.search;//windowobjectの中のidが欲しい
const id = new URLSearchParams(params).get("id");


console.log(id);


//１つの特定のタスクを取得する
const showTask = async () => {
    try {
        const {data: task } =await axios.get(`/api/v1/tasks/${id}`);//ここで特定の一つのタスクをget
        const { _id, completed, name} = task; //ここで分割代入？　あるobjectから取り出したいものを取り出すことができる
        taskIDDom.textContent = _id;
        taskNameDom.value = name;
        if(completed) {
            taskCompletedtDom.checked = true;
        }
    } catch (err) {
        console.log(err);
    }
}

showTask();


//タスクの編集
editFormDom.addEventListener("submit", async (e) => {//何かイベントが起こった時の操作
    e.preventDefault();//リロードしないようにしている
    try {
        const taskName = taskNameDom.value;
        taskCompleted = taskCompletedtDom.checked//なんでconstがいらないの？
        const {data: task } = await axios.patch(`/api/v1/tasks/${id}`, {
            name: taskName,
            completed: taskCompleted,
        });
        formAlertDom.getElementsByClassName.display = "block";
        formAlertDom.textContent ="編集に成功しました";
        formAlertDom.classList.add("text-success");
        
    } catch (err) {
        console.log(err);
    }

    setTimeout (() => {
        formAlertDom.style.display = "none";
        formAlertDom.classList.remove("text-success");
    },3000); //3秒後に消えて欲しい

})