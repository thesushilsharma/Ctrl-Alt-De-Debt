import type { Debt } from "../types";

export const sampleDebts: Debt[] = [
  {
    id: "1",
    personName: "Purna Mama",
    amount: 102.9,
    currency: "GBP",
    type: "owed_to_me",
    date: new Date("2018-07-17T00:00:00.000Z"),
    historicalNprRate: 145.937, // GBP to NPR rate for July 2018
  },
  {
    id: "2",
    personName: "Purna Mama",
    amount: 1460.0,
    currency: "GBP",
    type: "owed_to_me",
    date: new Date("2019-07-02T00:00:00.000Z"),
    historicalNprRate: 140.171, // GBP to NPR rate for July 2019
  },
  {
    id: "3",
    personName: "Purna Mama",
    amount: 1050.0,
    currency: "GBP",
    type: "owed_to_me",
    date: new Date("2019-10-26T00:00:00.000Z"),
    historicalNprRate: 148.206, // GBP to NPR rate for October 2019
  },
  {
    id: "4",
    personName: "Purna Mama",
    amount: 2005.0,
    currency: "GBP",
    type: "owed_to_me",
    date: new Date("2020-02-13T00:00:00.000Z"),
    historicalNprRate: 148.605, // GBP to NPR rate for February 2020
  },
  {
    id: "5",
    personName: "Purna Mama",
    amount: 561.81,
    currency: "GBP",
    type: "owed_to_me",
    date: new Date("2020-03-13T00:00:00.000Z"),
    historicalNprRate: 151.079, // GBP to NPR rate for March 2020 (COVID impact)
  },
  {
    id: "6",
    personName: "Purna Mama",
    amount: 2100.0,
    currency: "GBP",
    type: "owed_to_me",
    date: new Date("2020-09-23T00:00:00.000Z"),
    historicalNprRate: 150.577, // GBP to NPR rate for September 2020
  },
  {
    id: "7",
    personName: "Purna Mama",
    amount: 2111.0,
    currency: "GBP",
    type: "owed_to_me",
    date: new Date("2020-12-15T00:00:00.000Z"),
    historicalNprRate: 158.205, // GBP to NPR rate for December 2020
  },
  {
    id: "8",
    personName: "Purna Mama",
    amount: 615.0,
    currency: "GBP",
    type: "owed_to_me",
    date: new Date("2021-05-06T00:00:00.000Z"),
    historicalNprRate: 165.008, // GBP to NPR rate for May 2021
  },
  {
    id: "9",
    personName: "Purna Mama",
    amount: 600.0,
    currency: "GBP",
    type: "owed_to_me",
    date: new Date("2021-05-06T00:00:00.000Z"),
    historicalNprRate: 165.008, // GBP to NPR rate for May 2021 (same date as above)
  },
  {
    id: "10",
    personName: "Purna Mama",
    amount: 1000.0,
    currency: "GBP",
    type: "owed_to_me",
    date: new Date("2021-09-15T00:00:00.000Z"),
    historicalNprRate: 163.486, // GBP to NPR rate for September 2021
  },
  {
    id: "11",
    personName: "Purna Mama",
    amount: 1200.0,
    currency: "GBP",
    type: "owed_to_me",
    date: new Date("2021-09-16T00:00:00.000Z"),
    historicalNprRate: 163.514, // GBP to NPR rate for September 2021
  },
  {
    id: "12",
    personName: "Purna Mama",
    amount: 1600.0,
    currency: "GBP",
    type: "owed_to_me",
    date: new Date("2022-01-10T00:00:00.000Z"),
    historicalNprRate: 161.588, // GBP to NPR rate for January 2022
  },
  {
    id: "13",
    personName: "Purna Mama",
    amount: 1500.0,
    currency: "GBP",
    type: "owed_to_me",
    date: new Date("2022-01-10T00:00:00.000Z"),
    historicalNprRate: 161.588, // GBP to NPR rate for January 2022 (same date as above)
  },
  {
    id: "14",
    personName: "Purna Mama",
    amount: 1600.0,
    currency: "GBP",
    type: "owed_to_me",
    date: new Date("2022-05-09T00:00:00.000Z"),
    historicalNprRate: 151.877, // GBP to NPR rate for May 2022
  },
  {
    id: "15",
    personName: "Purna Mama",
    amount: 2000.0,
    currency: "GBP",
    type: "owed_to_me",
    date: new Date("2022-05-10T00:00:00.000Z"),
    historicalNprRate: 152.807, // GBP to NPR rate for May 2022
  },
  {
    id: "16",
    personName: "Purna Mama",
    amount: 1300.0,
    currency: "GBP",
    type: "owed_to_me",
    date: new Date("2022-10-18T00:00:00.000Z"),
    historicalNprRate: 149.392, // GBP to NPR rate for October 2022
  },
  {
    id: "17",
    personName: "Purna Mama",
    amount: 1350.0,
    currency: "GBP",
    type: "owed_to_me",
    date: new Date("2022-10-18T00:00:00.000Z"),
    historicalNprRate: 149.392, // GBP to NPR rate for October 2022 (same date as above)
  },
  {
    id: "18",
    personName: "Purna Mama",
    amount: 11000.0,
    currency: "AED",
    type: "owed_to_me",
    date: new Date("2021-05-02T00:00:00.000Z"),
    historicalNprRate: 33.3519, // AED to NPR rate for May 2021
  },
  {
    id: "19",
    personName: "Purna Mama",
    amount: 600000.0,
    currency: "NPR",
    type: "owed_to_me",
    date: new Date("2019-02-19T00:00:00.000Z"),
    historicalNprRate: 1.0, // NPR to NPR rate is always 1.0
  },
  {
    id: "20",
    personName: "Purna Mama",
    amount: 10000.0,
    currency: "AED",
    type: "i_owe",
    date: new Date("2025-06-05T00:00:00.000Z"),
    historicalNprRate: 37.9, // AED to NPR rate for June 2025
  },
  {
    id: "21",
    personName: "Shiva Mama",
    amount: 125000.0,
    currency: "JPY",
    type: "owed_to_me",
    date: new Date("2018-09-13T00:00:00.000Z"),
    historicalNprRate: 1.03994, // JPY to NPR rate for September 2018
  },
  {
    id: "22",
    personName: "Shiva Mama",
    amount: 299830.0,
    currency: "JPY",
    type: "owed_to_me",
    date: new Date("2019-07-02T00:00:00.000Z"),
    historicalNprRate: 1.02306, // JPY to NPR rate for July 2019
  },
  {
    id: "23",
    personName: "Krishna Mama",
    amount: 200000.0,
    currency: "NPR",
    type: "owed_to_me",
    date: new Date("2022-11-18T00:00:00.000Z"),
    notes: "",
    historicalNprRate: 1.0, // NPR to NPR rate is always 1.0
  },
  {
    id: "24",
    personName: "Keshav Dai",
    amount: 1821.0,
    currency: "AED",
    type: "owed_to_me",
    date: new Date("2019-11-06T00:00:00.000Z"),
    historicalNprRate: 31.0078, // AED to NPR rate for November 2019
  },
  {
    id: "25",
    personName: "Keshav Dai",
    amount: 3183.0,
    currency: "AED",
    type: "owed_to_me",
    date: new Date("2020-02-05T00:00:00.000Z"),
    historicalNprRate: 31.1524, // AED to NPR rate for February 2020
  },
  {
    id: "26",
    personName: "Keshav Dai",
    amount: 1521.0,
    currency: "AED",
    type: "owed_to_me",
    date: new Date("2020-12-14T00:00:00.000Z"),
    historicalNprRate: 32.2759, // AED to NPR rate for December 2020
  },
  {
    id: "27",
    personName: "Purna Mama",
    amount: 5000.0,
    currency: "AED",
    type: "i_owe",
    date: new Date("2025-09-25T00:00:00.000Z"),
    historicalNprRate: 38.5175667, // AED to NPR rate for AUG 2025
  },
  {
    id: "28",
    personName: "Purna Mama",
    amount: 5000.0,
    currency: "AED",
    type: "i_owe",
    date: new Date("2025-09-27T00:00:00.000Z"),
    historicalNprRate: 38.5202819, // AED to NPR rate for June 2025
  },
  {
    id: "29",
    personName: "Purna Mama",
    amount: 5000.0,
    currency: "AED",
    type: "i_owe",
    date: new Date("2025-08-18T00:00:00.000Z"),
    historicalNprRate: 37.98104, // AED to NPR rate for June 2025
  },
  {
    id: "30",
    personName: "Purna Mama",
    amount: 5000.0,
    currency: "AED",
    type: "i_owe",
    date: new Date("2025-10-22T00:00:00.000Z"),
    historicalNprRate: 38.18264, // AED to NPR rate for OCT 2025
  },
  {
    id: "31",
    personName: "Purna Mama",
    amount: 2441.0,
    currency: "AED",
    type: "i_owe",
    date: new Date("2025-10-22T00:00:00.000Z"),
    historicalNprRate: 38.18264, // AED to NPR rate for OCT 2025
  },
  {
    id: "32",
    personName: "Purna Mama",
    amount: 100000.0,
    currency: "NPR",
    type: "i_owe",
    date: new Date("2025-06-05T00:00:00.000Z"),
    historicalNprRate: 1, // NPR to NPR rate for June 2025
  },
  {
    id: "33",
    personName: "Purna Mama",
    amount: 100000.0,
    currency: "NPR",
    type: "i_owe",
    date: new Date("2025-06-05T00:00:00.000Z"),
    historicalNprRate: 1, // NPR to NPR rate for June 2025
  },
];
