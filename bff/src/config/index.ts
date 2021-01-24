export const NODE_ENV = process.env.NODE_ENV || "production";

export const PORT = parseInt(process.env.PORT || "3000", 10);

export const JOB_API_BASEURL = process.env.API_URL || "http://api:3333";

export const USE_PLAYGROUND = NODE_ENV === "development";
