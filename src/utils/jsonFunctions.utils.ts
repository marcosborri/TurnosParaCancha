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
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify([]));
      return [];
    }
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    if (!fileContent) {
      await fs.promises.writeFile(filePath, "[]");
      return [];
    }

    return JSON.parse(fileContent);
  }