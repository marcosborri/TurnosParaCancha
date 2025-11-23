import fs from "fs";

export async function saveData(data: Array<any> | any, filePath: string) {
    const jsonData = JSON.stringify(data, null, 2);
    try {
        await fs.promises.writeFile(filePath, jsonData);
    } catch (err) {
        console.error(err);
    }
  }

export async function loadData(filePath: string) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent);
  }