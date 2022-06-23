export const generatedId = function (data = "newData") {
  return (
    data +
    Math.random().toString(36).substring(2) +
    new Date().getTime().toString(36)
  );
};
