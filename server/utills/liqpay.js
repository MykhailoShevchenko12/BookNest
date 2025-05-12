import crypto from "crypto";

function base64(str) {
  return Buffer.from(str).toString("base64");
}

function sha1(string) {
  return crypto.createHash("sha1").update(string).digest();
}

function str_to_sign(str) {
  return base64(sha1(str));
}

function liqpayDataAndSignature(params, private_key) {
  const json_string = JSON.stringify(params);
  const data = base64(json_string);
  const signature = str_to_sign(private_key + data + private_key);

  return { data, signature };
}

export default liqpayDataAndSignature;
