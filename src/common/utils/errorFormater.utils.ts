// capitalize the first letter of the error message and un camal case the rest of the message
export function toTitleCase(inputString: string): string {
  const words = inputString.toLowerCase().split(' ');

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].substring(1);
  }

  return words.join(' ');
}

export const formatErrorMessage = (message: string) => {
  const [firstWord, ...rest] = message.split(' ');
  const words = firstWord.split(/(?=[A-Z])/);
  return `${words.map((w) => toTitleCase(w)).join(' ')} ${rest.join(' ')}`;
};

export default {
  formatErrorMessage,
};
