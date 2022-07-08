import React from 'react';

import { HStack } from './Layout';
import { InputEditor, PreviewEditor, EditorProvider } from './Editor';
import './styles.css';

export default function App() {
  return (
    <EditorProvider>
      <HStack>
        <InputEditor />
        <PreviewEditor />
      </HStack>
    </EditorProvider>
  );
}
