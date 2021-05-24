module.exports = (req, res, next) => {
  if (req.method === "POST" && req.path === "/login") {
    if (req.body.username === "jack" && req.body.password === "123456") {
      return res.status(200).json({
        user: {
          "id": 1,
          "name": "高修文",
          "email": "",
          "title": "",
          "organization": "外卖组",
          "token": "MTkzNDA5NzAw"
        },
      });
    } else {
      return res.status(400).json({ message: "用户名或者密码错误" });
    }
  }
  next();
};