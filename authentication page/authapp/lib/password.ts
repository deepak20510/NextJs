import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(scryptCallback);
const HASH_PREFIX = "scrypt";
const KEY_LENGTH = 64;

export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = (await scrypt(password, salt, KEY_LENGTH)) as Buffer;

  return `${HASH_PREFIX}$${salt}$${derivedKey.toString("hex")}`;
}

export async function verifyPassword(password: string, storedPassword: string) {
  const [scheme, salt, hashedValue] = storedPassword.split("$");

  if (scheme !== HASH_PREFIX || !salt || !hashedValue) {
    return {
      isValid: password === storedPassword,
      needsRehash: true,
    };
  }

  const derivedKey = (await scrypt(password, salt, KEY_LENGTH)) as Buffer;
  const storedKey = Buffer.from(hashedValue, "hex");

  if (storedKey.length !== derivedKey.length) {
    return {
      isValid: false,
      needsRehash: false,
    };
  }

  return {
    isValid: timingSafeEqual(storedKey, derivedKey),
    needsRehash: false,
  };
}
