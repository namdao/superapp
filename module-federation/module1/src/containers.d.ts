declare module 'app1/Text' {
  const Text: React.ComponentType<{ children: string }>;
  export default Text;
}

declare module 'app1/App' {
  const App1: React.Component<{ children: any }>;
  export default App1;
}
declare module 'app1/foo' {
  function foo(): Promise<string>;
  export { foo };
}
