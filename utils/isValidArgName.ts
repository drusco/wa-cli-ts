const isValidArgName = (arg: string, validArgs: string[]): boolean => {
  for (const name of validArgs) {
    if (new RegExp(`^(-{1,2}|–)${name}$`).test(arg)) {
      return true;
    }
  }
  return false;
};

export default isValidArgName;
