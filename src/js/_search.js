// 根据搜索引擎判断接口地址
export const getURL = function (engine) {
  switch (engine) {
    case "baidu":
      return "/su?type=cb&wd=";
    case "sogou":
      return "api/getsug?type=cb&key=";
    case "bing":
      return "/qsonhs.aspx?type=cb&q=";
    case "google":
      return "/qsonhs.aspx?type=cb&q=";
    // return "/s?hl=zh-cn&sugexp=llsin&q=";
  }
};

// 对返回的搜索数据进行处理，返回目标数组
export const dataProcess = function (res, engine) {
  switch (engine) {
    case "baidu":
      const a = eval("(" + getParenthesis(res.data) + ")");
      return a.s;
    case "sogou":
      const b = getParenthesis(res.data);
      const b2 = JSON.parse(getSegmented(b).toString());
      return b2[1];
    case "bing":
      return bingData(res);
    case "google": // 因google无法连接，转为bing
      return bingData(res);
  }
};

// Bing引擎的响应数据处理
const bingData = function (res) {
  const c = res.data.AS.Results;
  let arr = c[1].Suggests;
  let result = [];
  for (let i = 0; i < c.length; i++) {
    if (i != 1) {
      c[i].Suggests.forEach((e) => {
        for (let j = 1; j < arr.length; j++) {
          const a = e.Sk;
          const b = arr[j].Sk;
          const c = arr[j - 1].Sk;
          if (a < b && a > c) {
            // 在循环中，往参数中的数组插入数据时，容易因数组长度发生而重新开始循环，然后一直下去
            arr.splice(j - 1, 0, e);
            break;
          }
        }
      });
    }
  }
  // 提取目标数据，插入返回数组
  arr.forEach((e) => {
    result.push(e.Txt);
  });
  return result;
};

// 获取字符串最外层 () 中的内容
const getParenthesis = function (str) {
  const result = str
    .match(/\((.+)\)/g)
    .toString()
    .replace("(", "")
    .replace(")", "");
  return result;
};

// 获取字符串最外层 [] 中的内容
const getSegmented = function (str) {
  const result = str.match(/\[(.+)\]/g);
  return result;
};
