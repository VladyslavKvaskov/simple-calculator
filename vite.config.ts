import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env file
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const base = process.env.BASE_URL || "/"

console.log('BASE',base);
// https://vite.dev/config/
export default defineConfig({
  base: base,
  plugins: [react()],
});
