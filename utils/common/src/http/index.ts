export const concatParams = (params: any) => {
  const tempParams: any = {};
  for (const key in params) {
    if (params[key] !== undefined) {
      tempParams[key] = params[key];
    }
  }
  const keys = Object.keys(tempParams);
  let paramStr = "";
  if (keys && keys.length > 0) {
    keys.forEach((item, index) => {
      if (index === 0) {
        paramStr += `${item}=${params[item]}`;
      } else {
        paramStr += `&${item}=${params[item]}`;
      }
    });
  }
  return paramStr;
};
