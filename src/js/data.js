// 搜索引擎数据
export const engineData = {
  baidu: {
    engine: "baidu",
    name: "百度搜索",
    url: "https://www.baidu.com/s?ie=utf-8&wd=",
    icon: "baidu.png",
  },
  sogou: {
    engine: "sogou",
    name: "搜狗搜索",
    url: "https://www.sogou.com/web?query=",
    icon: "sogou.png",
  },
  bing: {
    engine: "bing",
    name: "必应搜索",
    url: "https://cn.bing.com/search?q=",
    icon: "bing.png",
  },
  google: {
    engine: "google",
    name: "谷歌搜索",
    url: "https://www.google.com/search?q=",
    icon: "google.png",
  },
};
// 个性化设置数据
export const optionData = {
  background: {
    name: "背景",
    value: "background",
    options: {
      mask: {
        name: "遮罩层",
        type: "slider",
        unit: "%",
        value: 18,
        min: 0,
        max: 100,
      },
      blur: {
        name: "毛玻璃",
        type: "slider",
        unit: "%",
        value: 24,
        min: 0,
        max: 100,
      },
      img: {
        name: "背景",
        type: "button",
        text: "更换",
        value:
          "https://cn.bing.com///th?id=OHR.LowerAntelopeAZ_ZH-CN4758496750_UHD.jpg&rf=LaDigue_1920x1080.jpg&pid=hp",
      },
    },
  },
  clock: {
    name: "时间",
    value: "clock",
    options: {
      display: {
        name: "显示时间",
        type: "switch",
        value: true,
      },
      second: {
        name: "显示秒数",
        type: "switch",
        value: true,
      },
      opacity: {
        name: "不透明度",
        type: "slider",
        unit: "%",
        value: 85,
        min: 10,
        max: 100,
      },
    },
  },
  searchBox: {
    name: "搜索框",
    value: "searchBox",
    options: {
      opacity: {
        value: 80,
        name: "不透明度",
        type: "slider",
        unit: "%",
        min: 10,
        max: 100,
      },
      width: {
        value: 70,
        name: "宽度占比",
        type: "slider",
        unit: "%",
        min: 40,
        max: 100,
      },
      height: {
        value: 55,
        name: "高度值",
        type: "slider",
        unit: "px",
        min: 40,
        max: 60,
      },
      radius: {
        value: 25,
        name: "圆角大小",
        type: "slider",
        unit: "%",
        min: 0,
        max: 50,
      },
    },
  },
  websiteBar: {
    name: "导航栏",
    value: "websiteBar",
    options: {
      opacity: {
        value: 100,
        name: "不透明度",
        type: "slider",
        unit: "%",
        min: 10,
        max: 100,
      },
      width: {
        value: 70,
        name: "宽度占比",
        type: "slider",
        unit: "%",
        min: 30,
        max: 100,
      },
      size: {
        value: 70,
        name: "图标大小",
        type: "slider",
        unit: "px",
        min: 40,
        max: 80,
      },
      radius: {
        value: 25,
        name: "图标圆角",
        type: "slider",
        unit: "%",
        min: 0,
        max: 50,
      },
      hSpacing: {
        value: 32,
        name: "左右间距",
        type: "slider",
        unit: "px",
        min: 15,
        max: 50,
      },
      vSpacing: {
        value: 20,
        name: "上下间距",
        type: "slider",
        unit: "px",
        min: 15,
        max: 50,
      },
      edit: {
        name: "网站导航",
        type: "button",
        text: "编辑",
      },
    },
  },
  other: {
    name: "其他选项",
    value: "other",
    options: {
      width: {
        value: 1200,
        name: "总宽度",
        type: "slider",
        unit: "px",
        min: 300,
        max: 2000,
      },
      spacing: {
        value: 50,
        name: "搜索框，导航栏间距",
        type: "slider",
        unit: "px",
        min: 50,
        max: 400,
      },
      reset: {
        name: "默认预设",
        type: "button",
        text: "恢复默认",
      },
    },
  },
};
// 导航栏数据
export const websiteData = [
  {
    name: "网易云",
    type: "origin",
    icon: "music163.svg",
    url: "https://y.music.163.com",
  },
  {
    name: "天猫",
    type: "origin",
    icon: "tmall.svg",
    url: "https://www.tmall.com",
  },
  {
    name: "淘宝",
    type: "origin",
    icon: "taobao.png",
    url: "https://taobao.com",
  },
  {
    name: "京东",
    type: "origin",
    icon: "jd.svg",
    url: "https://jd.com",
  },
  {
    name: "哔哩哔哩",
    type: "origin",
    icon: "bilibili.svg",
    url: "https://www.bilibili.com/",
  },
  {
    name: "抖音",
    type: "origin",
    icon: "douyin.svg",
    url: "https://douyin.com",
  },
  {
    name: "蒸汽平台",
    type: "origin",
    icon: "steam.png",
    url: "https://store.steampowered.com",
  },
  {
    name: "微博",
    type: "origin",
    icon: "weibo.svg",
    url: "https://weibo.com",
  },
  {
    name: "油管",
    type: "origin",
    icon: "youtube.png",
    url: "https://www.youtube.com",
  },
  {
    name: "知乎",
    type: "origin",
    icon: "zhihu.svg",
    url: "https://www.zhihu.com",
  },
];
