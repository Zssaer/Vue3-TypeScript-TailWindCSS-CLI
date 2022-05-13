import { MockMethod } from "vite-plugin-mock";

export default [
  {
    url: "/home",
    method: "get",
    response: () => {
      return {
        code: 20000,
        msg: "success",
        data: ["This is Home Page Response!"],
      };
    },
  },
] as MockMethod[];
