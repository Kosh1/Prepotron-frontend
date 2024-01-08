export const MathjaxRefresh = () => {
  if (typeof window?.MathJax !== 'undefined') {
    window.MathJax.typeset();
  }
};
