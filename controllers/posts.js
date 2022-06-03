const handleResponse = require("../service/handleResponse");
const Post = require("../models/posts");

const posts = {
  getPosts: handleResponse.errorAsync(async (req, res, next) => {
    const timeSort = req.query.timeSort == "asc" ? "createdAt":"-createdAt";
    const q = req.query.q !== undefined ? {"content": new RegExp(req.query.q)} : {};
    const allPosts = await Post.find(q).populate({
      path: "user",
      select: "name photo"
    }).sort(timeSort);
    handleResponse.success(res, "資料讀取成功", allPosts);
  }),
  createPosts: handleResponse.errorAsync(async (req, res, next) => {
    const body = req.body;
    if (body.content){
      const newPost = await Post.create(body);
      handleResponse.success(res, "資料讀取成功", newPost);
    }else{
      handleResponse.errorNew(400, "內文資料未填", next);
    }
  }),
  deleteAllPosts: handleResponse.errorAsync(async (req, res, next) => {
    await Post.deleteMany({});
    handleResponse.success(res, "刪除成功", Post);
  }),
  deleteOnePost: handleResponse.errorAsync(async (req, res, next) => {
    const id = req.params.id;
    if (await Post.findById(`${id}`) !== null){
      await Post.findByIdAndDelete(`${id}`);
      handleResponse.success(res, "刪除成功", Post);
    }else{
      handleResponse.errorNew(400, "無此筆資料", next);
    }
  }),
  updatePosts: handleResponse.errorAsync(async (req, res, next) => {
    const body = req.body;
    const id = req.params.id;
    if (await Post.findById(`${id}`) !== null){
      if(body.content){
        const updatePost = await Post.findByIdAndUpdate(`${id}`, body, {new: true});
        handleResponse.success(res, updatePost);
      }else{
        handleResponse,errorNew(400, "內文資料未填", next);
      }
    }else{
      handleResponse.errorNew(400, "無此筆資料", next);
    }
  })
};

module.exports = posts;