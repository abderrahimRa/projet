declare module 'table2excel' {
    class Table2Excel {
      constructor(options?: any);
      export(table: HTMLElement, filename?: string): void;
    }
  
    export = Table2Excel;
  }