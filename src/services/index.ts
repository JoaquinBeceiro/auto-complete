import companies from "./companies.json";
import { KeyValueType } from "./types";

const generateRandomTime = () =>
  Math.floor(Math.random() * (1000 - 300 + 1) + 300);

const cache: { [key: string]: KeyValueType[] } = {};

const fakeApiCall = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const randomReject = Math.random() > 0.9;
      if (randomReject) {
        reject();
      } else {
        resolve("ok");
      }
    }, generateRandomTime());
  });

export const searchItems = async (value: string) => {
  if (value in cache) {
    return cache[value];
  } else {
    const searchCompanies = companies.filter(({ company_name }) =>
      company_name.toUpperCase().includes(value.toUpperCase())
    );
    await fakeApiCall();
    const result = searchCompanies.map(({ company_name, id }) => ({
      key: id,
      value: company_name,
    }));
    cache[value] = result;
    return result;
  }
};
