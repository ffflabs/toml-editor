import React from 'react';
import monaco from 'monaco-editor';
import Editor from '@monaco-editor/react';

import { useEditorState } from './editor-context';

const editorOptions: monaco.editor.IEditorConstructionOptions = {
  readOnly: true,
};

export default function PreviewEditor() {
  const { output } = useEditorState();

  return (
    <Editor
      value={output}
      options={editorOptions}
      height="100%"
      language="json"
    />
  );
}
