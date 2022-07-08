type JsonArray = boolean[] | number[] | string[] | JsonMap[] | Date[];
type AnyJson =
  | boolean
  | number
  | string
  | JsonMap
  | Date
  | JsonArray
  | JsonArray[];

interface JsonMap {
  [key: string]: AnyJson;
}

interface ParseOptions {
  /**
   * The amount text to parser per pass through the event loop. Defaults to 40kb (`40000`).
   */
  blocksize: number;
}

declare module '@iarna/toml' {
  export interface ParserError extends Error {
    (msg: string, filename: string, linenumber: number): void;
    name: 'ParserError';
    code: 'ParserError';
  }

  export interface TomlError extends Error {
    name: 'TomlError';
    fromTOML: boolean;
    wrapped: Error | null;
    code?: number;
    line: number;
    col: number;
    pos: number;
  }
}

declare module '@iarna/toml/parse-string' {
  export default function parseString(toml: string): JsonMap;
}

declare module '@iarna/toml/parse-async' {
  export default function parseAsync(
    str: string,
    opts: ParseOptions,
  ): Promise<JsonMap>;
}

declare module '@iarna/toml/parse-pretty-error' {
  import { ParseError } from '@iarna/toml';

  export default function parsePrettyError(
    err: Error | ParseError,
    sourceString: string,
  ): ParseError;
}

declare module '@iarna/toml/stringify' {
  export default function stringify(
    obj: JsonMap | { toJSON(): string },
  ): string;
}
