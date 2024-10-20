export const parse = (responseErrors: Record<string, string[]>) => {
  const errors = Object.entries(responseErrors).reduce(
    (prev, [key, value]) => {
      prev[key] = value[0];
      return prev;
    },
    {} as Record<string, string>,
  );
  return Object.values(errors);
};

/**
 * 上传图片之后呈现图片预览
 * @param file
 */
export function preview(
  file: any,
  callback: (file: any) => Promise<void>,
  target: any,
) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (e) => {
    const url = e.target?.result;
    Object.assign(target, { image: url });
    callback(file);
  };
}
