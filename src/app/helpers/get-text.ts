export function getText(): string {
  const s = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesentsed ' +
    'metus at dui suscipit vestibulum. Suspendisse eu felis ullamcorper, congue leo nec, ' +
    'congue dolor. Integer vel dui cursus mi laoreet';
  return s.split(' ')
    .sort(() => Math.floor(Math.random() * Math.floor(3)) - 1)
    .join(' ');
}
