import fs from "fs";

const DATA = "./data.json";

export const readData = () =>
    JSON.parse(fs.readFileSync(DATA, "utf-8"));

export const writeData = (data) =>
    fs.writeFileSync(DATA, JSON.stringify(data, null, 2));