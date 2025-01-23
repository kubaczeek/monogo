import fs from "fs-extra";

export async function readUsersData() {
  return await FileHelper.readJsonFile(
    `data/${process.env.ENV_FILE}/users.json`
  );
}

class FileHelper {
  public static async readJsonFile(filePath: string): Promise<any> {
    try {
      const jsonData = await fs.readJson(filePath);

      return jsonData;
    } catch (error) {
      console.error(`Error reading JSON file: ${error}`);
      throw error;
    }
  }
}
