const Task = require("../models/Task");

const getAllTasks = async (req,res) => {
    try {
        const allTask = await Task.find({});//{}これで全て取得になる
        res.status(200).json(allTask);//ここがよく分からない
    } catch (err) {
        res.status(500).json(err);//ここがよく分からない
    } 
    
};

const createTask = async (req,res) => {
    try {
        const createTask = await Task.create(req.body);//今回はポストマンを使うので req.bodyとした
        res.status(200).json(createTask);
    } catch (err) {
        res.status(500).json(err);
    } 
};


const getSingleTask = async(req,res) => {
    try {
        const getSingleTask = await Task.findOne({_id: req.params.id });//ここもよく分からないが、ランダムなIDが来たらそれを探して返しているはず req.params.idはランダムな文字列
        if(!getSingleTask){
            return res.status(404).json("_id:${req.params.id}は存在しません");//ここ実際に文字列が出てこない
        }
        res.status(200).json(getSingleTask);



    } catch (err) {
        res.status(500).json(err);
    } 
   
};

const updateTask = async(req,res) => {
    try {
        const deleteTask = await Task.findOneAndUpdate(
            {_id: req.params.id },
            req.body,
            {
                new: true, //変更が反映されなかったからこうした ここどういう挙動なのか分からない
            }
        );
        if(!deleteTask){
            return res.status(404).json("_id:${req.params.id}は存在しません");//ここ実際に文字列が出てこない
        }
        res.status(200).json(deleteTask);

    } catch (err) {
        res.status(500).json(err);
    } 
   
  
};

const deleteTask = async(req,res) => {
    try {
        const updateTask = await Task.findOneAndDelete(
            {_id: req.params.id },
            //req.body, 今回は更新しないので必要なさそう
            //{
                //new: true, ここも要らなそう
            //}
        );
        if(!updateTask){
            return res.status(404).json("_id:${req.params.id}は存在しません");//ここ実際に文字列が出てこない
        }
        res.status(200).json(updateTask);

    } catch (err) {
        res.status(500).json(err);
    } 
    
};

module.exports = {
    getAllTasks,
    createTask,
    getSingleTask,
    updateTask,
    deleteTask,
};