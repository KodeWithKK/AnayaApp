export function convertToFormData(
  data: Record<string, any>,
  formData = new FormData(),
  parentKey = "",
): FormData {
  Object.entries(data).forEach(([key, value]) => {
    const formKey = parentKey ? `${parentKey}[${key}]` : key;

    if (
      value &&
      typeof value === "object" &&
      !(value instanceof File) &&
      !(value instanceof Blob)
    ) {
      if (value?.uri) {
        // File-like structure
        formData.append(formKey, {
          uri: value.uri,
          name: value.name || "file",
          type: value?.type || "application/octet-stream",
        } as any);
      } else {
        // Nested object
        convertToFormData(value, formData, formKey);
      }
    } else if (value !== undefined && value !== null) {
      // Primitive values
      formData.append(formKey, value);
    }
  });

  return formData;
}
