import React from 'react';
import {
  useEditorReducer,
  EditorState,
  EditorDispatch,
} from './editor-reducer';

export const EditorStateContext = React.createContext<EditorState | undefined>(
  undefined,
);

export const EditorDispatchContext = React.createContext<
  EditorDispatch | undefined
>(undefined);

export interface EditorProviderProps {
  initialState?: EditorState;
  children: React.ReactNode;
}

export const EditorProvider = ({
  initialState,
  children,
}: EditorProviderProps) => {
  const [state, dispatch] = useEditorReducer(initialState);
  return (
    <EditorStateContext.Provider value={state}>
      <EditorDispatchContext.Provider value={dispatch}>
        {children}
      </EditorDispatchContext.Provider>
    </EditorStateContext.Provider>
  );
};

export function useEditorState(): EditorState {
  const context = React.useContext(EditorStateContext);

  if (context === undefined) {
    throw new Error('useEditorState must be used within a EditorProvider');
  }

  return context;
}

export function useEditorDispatch() {
  const context = React.useContext(EditorDispatchContext);

  if (context === undefined) {
    throw new Error('useEditorDispatch must be used within a EditorProvider');
  }

  return context;
}
