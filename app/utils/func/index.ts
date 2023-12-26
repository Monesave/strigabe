import crypto from "crypto";
export const api = (path: string) => {
  return process.env.baseurl + path;
};

export const authorizationHeader = (
  body: any,
  path: any,
  method: "POST" | "GET" | "PATCH"
) => {
  const hmac = crypto.createHmac("sha256", process.env.api_secret!);
  const time = Date.now().toString();

  hmac.update(time);
  hmac.update(method);
  hmac.update(path);

  const contentHash = crypto.createHash("md5");
  contentHash.update(JSON.stringify(body));

  hmac.update(contentHash.digest("hex"));

  return `HMAC ${time}:${hmac.digest("hex")}`;
};

export const postConfig = (body: any, path: string) => {
  return {
    headers: {
      "api-key": process.env.api_key,
      "Content-Type": "application/json",
      Authorization: authorizationHeader(body, path, "POST"),
    },
  };
};

export const getConfig = (path: string) => {
  return {
    headers: {
      "api-key": process.env.api_key,
      "Content-Type": "application/json",
      Authorization: authorizationHeader({}, path, "GET"),
    },
  };
};

export const patchConfig = (body: any, path: string) => {
  return {
    headers: {
      "api-key": process.env.api_key,
      "Content-Type": "application/json",
      Authorization: authorizationHeader(body, path, "PATCH"),
    },
  };
};
