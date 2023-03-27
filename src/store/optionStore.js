import { defineStore } from "pinia";
import { optionData } from "../js/data";

const localData = localStorage.getItem("Option");

const optionStore = defineStore("option", {
  state: () => {
    if (localData) return JSON.parse(localData);
    else return optionData;
  },
});
export default optionStore;
