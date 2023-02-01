// eslint-disable-next-line import/no-unresolved
import appBaz from 'module1/baz';

export async function foo() {
  // return 'foo';
  return `foo + ${await appBaz.baz()}`;
}
