import { Request, Response, NextFunction, request } from "express";
import axios, { AxiosResponse } from "axios";
import employee from "./input-example.json";
import { from } from "linq-to-typescript";
interface Summary {
  totalTransaction: Number;
  bestSellingItem: String;
  bestSellingCategory: String;
  revenue: Number;
}

function fun(arr: any) {
  var maxValue = Number.MIN_VALUE;

  for (var i = 0; i < arr.length; i++) {
    if (arr[i].qty > maxValue) {
      maxValue = i;
    }
  }
  return maxValue;
}

// getting all posts
const getTotalTransactions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // get some posts
  let transactions = employee.Transaction;

  return res.status(200).json({
    message: Object.keys(transactions).length,
  });
};

const getBestSellingItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  var gokil = {
    selling: [],
  };
  const bestsellings: any = employee.Transaction;

  const resultArr: any = [];

  // grouping by location and resulting with an object using Array.reduce() method
  const groupByItem = bestsellings.reduce((group: any, items: any) => {
    const { item } = items;
    group[item] = group[item] ?? [];
    group[item].push(items.qty);
    return group;
  }, {});

  // Finally calculating the sum based on the location array we have.
  Object.keys(groupByItem).forEach((items: any) => {
    groupByItem[items] = groupByItem[items].reduce((a: any, b: any) => a + b);
    resultArr.push({
      item: items,
      qty: groupByItem[items],
    });
  });

  // const result: any = [];
  // bestsellings.reduce(function (res: any, value: any) {
  //   if (!res[value.item]) {
  //     res[value.item] = { item: value.item, qty: 0 };
  //     result.push(res[value.qty]);
  //   }
  //   res[value.item].qty += value.qty;
  //   return res;
  // }, {});

  var maxValue = fun(resultArr);

  return res.status(200).json({
    message: resultArr[maxValue].item,
  });
};

// const getBestSellingCategory = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {};

// const getRPC = async (req: Request, res: Response, next: NextFunction) => {};

// const getRevenue = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {};

// const getBestSpenders = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {};

// // getting a single post
// const getTransactions = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   // get the post id from the req
//   let id: string = req.params.id;
//   // get the post
//   let result: AxiosResponse = await axios.get(
//     `https://jsonplaceholder.typicode.com/posts/${id}`
//   );
//   let summary: Summary = result.data;
//   return res.status(200).json({
//     message: summary,
//   });
// };

// const getSummaryTransaction = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {};

// // updating a post
// const updateTransactions = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   // get the post id from the req.params
//   let id: string = req.params.id;
//   // get the data from req.body
//   let title: string = req.body.title ?? null;
//   let body: string = req.body.body ?? null;
//   // update the post
//   let response: AxiosResponse = await axios.put(
//     `https://jsonplaceholder.typicode.com/posts/${id}`,
//     {
//       ...(title && { title }),
//       ...(body && { body }),
//     }
//   );
//   // return response
//   return res.status(200).json({
//     message: response.data,
//   });
// };

// // deleting a post
// const deleteTransactions = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   // get the post id from req.params
//   let id: string = req.params.id;
//   // delete the post
//   let response: AxiosResponse = await axios.delete(
//     `https://jsonplaceholder.typicode.com/posts/${id}`
//   );
//   // return response
//   return res.status(200).json({
//     message: "post deleted successfully",
//   });
// };

// // adding a post
// const addTransactions = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   // get the data from req.body
//   let title: string = req.body.title;
//   let body: string = req.body.body;
//   // add the post
//   let response: AxiosResponse = await axios.post(
//     `https://jsonplaceholder.typicode.com/posts`,
//     {
//       title,
//       body,
//     }
//   );
//   // return response
//   return res.status(200).json({
//     message: response.data,
//   });
// };

export default { getTotalTransactions, getBestSellingItem };
