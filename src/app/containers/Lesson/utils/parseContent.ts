export const parseContent = (input: string) => {
  const urlRegex =
    /\b(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})+(?:\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?\b/g;

  const matches = input.match(urlRegex);

  let output = input;

  if (matches) {
    for (const match of matches) {
      output = output.replace(match, `<a href="https://${match}">${match}</a>`);
    }
  }

  return output;
};
