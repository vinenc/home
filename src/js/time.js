// 农历时间转换模块
import { getLunar } from "chinese-lunar-calendar";

// 获取本地时间
export const getTime = function () {
  const date = new Date();
  // 年，月，日，星期
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const wk = date.getDay();
  const weeks = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
  ];
  let week = weeks[wk];

  // 时，分，秒，a/pm
  const hour = check(date.getHours());
  const minute = check(date.getMinutes());
  const second = check(date.getSeconds());
  let hour12 = "";
  let apm = "";
  if (hour <= 12) {
    hour12 = hour;
    apm = " AM";
  } else {
    hour12 = hour - 12;
    apm = " PM";
  }

  // 数据整合，HH:MM :SS MM-DD 农历
  const time = hour + ":" + minute;
  const time12 = hour12 + ":" + minute;
  const secondTime = ":" + second;
  const dateMD = month + "-" + day;
  const lunar = getLunar(year, month, day);
  const data = {
    time: time,
    time12: time12,
    secondTime: secondTime,
    apm: apm,
    date: dateMD,
    lunar: lunar.dateStr,
  };
  function check(i) {
    const num = i < 10 ? "0" + i : i;
    return num;
  }
  return data;
};
