const express = require("express");//expressを読んでいる

const router = express.Router();
const {
    getAllTasks,
    createTask,
    getSingleTask,
    updateTask,
    deleteTask,
} = require("../controllers/tasks");



router.get("/", getAllTasks);  // "/" = "/api/v1/tasks"

router.post("/", createTask);//メソッドが違うのでエンドポイントは同じで良さそう});

router.get("/:id", getSingleTask);

router.patch("/:id", updateTask);

router.delete("/:id", deleteTask);

module.exports = router;//app.jsと繋げるため







