import { fileURLToPath } from "url";
import path from "path";

// шлях до файлу utils/dirname.js
const __filename = fileURLToPath(import.meta.url);

// dirname вкаже на /utils
const localDirname = path.dirname(__filename);

// а от rootDir — на корінь проєкту
export const rootDir = path.resolve(localDirname, "..");
