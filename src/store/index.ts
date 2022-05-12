import { defineStore } from "pinia";

export const userStore = defineStore("main", {
  state: () => {
    return {
      task: "Hello pinia!",
      counter: 0,
    };
  },
  getters: {
    getTask(): string {
      return 'This task is "' + this.task + '"';
    },
  },
  actions: {
    increment() {
      this.counter++;
    },
  },
});
