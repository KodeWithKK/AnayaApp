export function encodeStringToUrlSafeBase64(text: string): string {
  const encoder = new TextEncoder();
  const byteArray = encoder.encode(text);
  const base64String = btoa(String.fromCharCode(...byteArray));
  const urlSafeBase64 = base64String
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
  return urlSafeBase64;
}

export function decodeUrlSafeBase64ToNormalString(
  encodedData: string,
): string | null {
  try {
    const base64String = encodedData
      .replace(/-/g, "+")
      .replace(/_/g, "/")
      .padEnd(encodedData.length + ((4 - (encodedData.length % 4)) % 4), "=");
    return atob(base64String);
  } catch (error) {
    console.error("Error decoding Base64 string:", error);
    return null;
  }
}
