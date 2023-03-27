import { defineStore } from "pinia";
import { websiteData } from "../js/data";

const localData = localStorage.getItem("Website");

const websiteStore = defineStore("website", {
  state: () => {
    if (localData)
      return { item: JSON.parse(localData), origin: [], del: [], add: [] };
    else return { item: websiteData, origin: [], del: [], add: [] };
  },
});
export default websiteStore;
