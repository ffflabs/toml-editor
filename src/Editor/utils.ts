import monaco from 'monaco-editor';
import { TomlError } from '@iarna/toml';
import parseString from '@iarna/toml/parse-string';

export const isParseError = (err: unknown): err is TomlError => {
  return Boolean(err && (err as TomlError).name === 'TomlError');
};

export function getMarkersFromError(
  error: TomlError,
): monaco.editor.IMarkerData[] {
  const line = error.line + 1;
  const column = error.col + 1;

  return [
    {
      startColumn: column,
      startLineNumber: line,
      endColumn: column,
      endLineNumber: line,
      message: error.message,
      severity: 0,
    },
  ];
}

export function parseToJSON(source: string): string {
  const data = parseString(source);
  const json = JSON.stringify(data, null, 2);
  return json;
}
