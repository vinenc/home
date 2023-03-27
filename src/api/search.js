import * as service from "./index";
import { getURL, dataProcess } from "@/js/_search";

// 获取搜索引擎自动联想的数据
export const getRequest = function (input, engine, callback) {
  service[engine]
    .get(getURL(engine) + input)
    .then((res) => {
      const list = dataProcess(res, engine);
      callback(list);
    })
    .catch((err) => {
      console.log(err);
    });
};
