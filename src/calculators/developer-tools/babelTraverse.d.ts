declare module '@babel/traverse' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const traverse: (ast: any, visitor: Record<string, any>) => void;
  export default traverse;
}
