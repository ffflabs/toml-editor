import React from 'react';
import monaco from 'monaco-editor';
import {
  ControlledEditor,
  ControlledEditorProps,
  ControlledEditorOnChange,
  EditorDidMount,
  monaco as monacoEditor,
} from '@monaco-editor/react';

import { getMarkersFromError, isParseError, parseToJSON } from './utils';
import { useEditorState, useEditorDispatch } from './editor-context';

function useControlledEditor() {
  const editorRef = React.useRef<monaco.editor.IStandaloneCodeEditor>();
  const [ready, setReady] = React.useState(false);
  const { input, error } = useEditorState();
  const dispatch = useEditorDispatch();

  const editorDidMount = React.useCallback<EditorDidMount>((_, editor) => {
    editorRef.current = editor;
    setReady(true);
    editor.focus();
  }, []);

  React.useLayoutEffect(() => {
    const handleResize = () => {
      console.log('layout');
      editorRef.current!.layout();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  React.useEffect(() => {
    async function initEditor() {
      const monacoInstance = await monacoEditor.init();
      const toml = await import('./languages/toml');
      monacoInstance.languages.register({ id: 'toml' });
      monacoInstance.languages.setLanguageConfiguration('toml', toml.conf);
      monacoInstance.languages.setMonarchTokensProvider('toml', toml.language);
    }

    initEditor();
  }, []);

  React.useLayoutEffect(() => {
    const localEditor = editorRef.current;

    async function setErrors() {
      if (localEditor) {
        const monacoInstance = await monacoEditor.init();
        const markers = isParseError(error) ? getMarkersFromError(error) : [];
        monacoInstance.editor.setModelMarkers(
          localEditor.getModel()!,
          'toml',
          markers,
        );
      }
    }

    setErrors();
  }, [error]);

  React.useEffect(() => {
    if (ready) {
      try {
        const payload = parseToJSON(input);
        dispatch({ type: 'OUTPUT', payload });
      } catch (error) {
        dispatch({
          type: 'OUTPUT',
          error: true,
          payload: error,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, ready]);

  const onChange = React.useCallback<ControlledEditorOnChange>(
    (_, value) => {
      dispatch({ type: 'INPUT', payload: value || '' });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return { editorDidMount, onChange, value: input };
}

export interface EditorProps extends ControlledEditorProps {}

export default function InputEditor(props: EditorProps) {
  const editorProps = useControlledEditor();
  return (
    <ControlledEditor
      {...editorProps}
      theme="krTheme"
      height="100%"
      language="toml"
    />
  );
}
