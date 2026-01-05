import path from "path"
import fs from "fs"
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const visaConfig = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/visas.json"), "utf-8")
);

export default visaConfig;