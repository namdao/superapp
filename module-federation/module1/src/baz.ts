let counter = 3;

async function baz() {
  if (counter <= 0) {
    return 'end';
  }

  // eslint-disable-next-line import/no-unresolved
  const { foo } = await import('app1/foo');

  counter--;
  return `baz + ${await foo()}`;
}

function resetBaz() {
  counter = 3;
}

const bazData = {
  baz,
  resetBaz,
};
export default bazData;
