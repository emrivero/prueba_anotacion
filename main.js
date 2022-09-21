// a function that receives a string as a parameter and returns an array of strings resulting from splitting the string with the pattern "/"" and filtering the empty strings
const getBreadCrumbs = (path) => {
  const ArrayOfPaths = path.split('/');
  return ArrayOfPaths.filter(() => path.trim() !== '');
};
