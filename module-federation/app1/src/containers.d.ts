declare module 'module1/baz' {
  function baz(): Promise<string>;
  function resetBaz(): Promise<void>;
  function getNavigate(): Promise<void>;
  export { baz, resetBaz, getNavigate };
}

declare module 'module1/Root' {
  const Text: React.ComponentType;
  export default Text;
}
declare module 'module1/Payment' {
  const PaymentBtn: React.ComponentType;
  export default PaymentBtn;
}
declare module 'module1/RootNavigator' {
  const RootNavigator;
  export { RootNavigator };
}
