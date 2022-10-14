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

  var maxValue = fun(resultArr);

  return res.status(200).json({
    message: resultArr[maxValue].item,
  });
};

const getBestSellingCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

  var maxValue = fun(resultArr);

  const sellingcategory: any = employee.Items.find(
    (record) => record.name === resultArr[maxValue].item
  );

  return res.status(200).json({
    message: sellingcategory.type,
  });
};

const getRPC = async (req: Request, res: Response, next: NextFunction) => {
  const bestsellings: any = employee.Transaction;
  const resultArr: any = [];
  const resultArr2: any = [];

  for (let x in bestsellings) {
    const cariItem: any = employee.Items.find(
      (record) => record.name === bestsellings[x].item
    )?.prices;

    const cariBuyers = employee.Buyers.find(
      (record) => record.name === bestsellings[x].buyer
    )?.type;

    const cariPrices = cariItem.find(
      (record: any) => record.priceFor === cariBuyers
    )?.price;

    var revenue = cariPrices * bestsellings[x].qty;

    resultArr.push({
      category: employee.Items.find(
        (record) => record.name === bestsellings[x].item
      )?.type,
      revenue: revenue,
    });
  }

  const groupByCategory = resultArr.reduce((group: any, items: any) => {
    const { category } = items;
    group[category] = group[category] ?? [];
    group[category].push(items.revenue);
    return group;
  }, {});

  // Finally calculating the sum based on the location array we have.
  Object.keys(groupByCategory).forEach((items: any) => {
    groupByCategory[items] = groupByCategory[items].reduce(
      (a: any, b: any) => a + b
    );
    resultArr2.push({
      item: items,
      revenue: groupByCategory[items],
    });
  });

  return res.status(200).json({
    message: resultArr2,
  });
};

const getRevenue = async (req: Request, res: Response, next: NextFunction) => {
  const bestsellings: any = employee.Transaction;
  const resultArr: any = [];
  const resultArr2: any = [];

  for (let x in bestsellings) {
    const cariItem: any = employee.Items.find(
      (record) => record.name === bestsellings[x].item
    )?.prices;

    const cariBuyers = employee.Buyers.find(
      (record) => record.name === bestsellings[x].buyer
    )?.type;

    const cariPrices = cariItem.find(
      (record: any) => record.priceFor === cariBuyers
    )?.price;

    var revenue = cariPrices * bestsellings[x].qty;

    resultArr.push({
      category: employee.Items.find(
        (record) => record.name === bestsellings[x].item
      )?.type,
      revenue: revenue,
    });
  }

  const groupByCategory = resultArr.reduce((group: any, items: any) => {
    const { category } = items;
    group[category] = group[category] ?? [];
    group[category].push(items.revenue);
    return group;
  }, {});

  // Finally calculating the sum based on the location array we have.
  Object.keys(groupByCategory).forEach((items: any) => {
    groupByCategory[items] = groupByCategory[items].reduce(
      (a: any, b: any) => a + b
    );
    resultArr2.push({
      item: items,
      revenue: groupByCategory[items],
    });
  });

  let sumjo = 0;

  for (let el of resultArr) {
    sumjo += el.revenue;
  }

  return res.status(200).json({
    message: sumjo,
  });
};

const getBestSpenders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export default {
  getTotalTransactions,
  getBestSellingItem,
  getBestSellingCategory,
  getRPC,
  getRevenue,
};
