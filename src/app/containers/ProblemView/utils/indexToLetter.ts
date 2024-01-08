export const indexToLetter = (idx: number) => {
  return ['A', 'B', 'C', 'D', 'E', 'F', 'G'].at(idx) || String(idx);
};
