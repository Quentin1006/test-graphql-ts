import path from "path";

export const fileInfo = {
  level: "info",
  filename: path.resolve(__dirname, "../../", "/logs/app.log"),
  handleExceptions: true,
  json: true,
  maxsize: 5242880, // 5MB
  maxFiles: 5,
  colorize: false,
};

export const fileError = {
  ...fileInfo,
  level: "error",
  filename: path.resolve(__dirname, "../../", "/logs/error.log"),
};

export const console = {
  level: "debug",
  handleExceptions: true,
  json: false,
  colorize: true,
};
