declare module '@babel/generator' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const generate: (ast: any, options?: Record<string, any>, code?: string) => { code: string; map?: unknown };
  export default generate;
}
