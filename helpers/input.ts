export function highlightInputNotation(input: string) {
  const lightRegex = new RegExp(/\S*L(?!M|H)[^,]?/, "g");
  const mediumRegex = new RegExp(/\S*(?<!L)M(?!H)[^,]?/, "g");
  const heavyRegex = new RegExp(/\S*(?<!L|M)H[^,]?/, "g");
  const specialRegex = new RegExp(/\S*S[^,]?/, "g");

  return input
    .replace(lightRegex, '<span class="text-blue-500">$&</span>')
    .replace(mediumRegex, '<span class="text-yellow-400">$&</span>')
    .replace(heavyRegex, '<span class="text-red-400">$&</span>')
    .replace(specialRegex, '<span class="text-green-500">$&</span>');
}
