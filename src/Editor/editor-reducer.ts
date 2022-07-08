import { useReducer } from 'react';

export type EditorInputAction = { type: 'INPUT'; payload: string };
export type EditorOutputAction =
  | { type: 'OUTPUT'; payload: string; error?: false }
  | {
      type: 'OUTPUT';
      payload: Error;
      error: true;
    };
export type EditorAction = EditorInputAction | EditorOutputAction;
export type EditorDispatch = React.Dispatch<EditorAction>;

export interface EditorState {
  input: string;
  output: string;
  error?: Error;
}

export const defaultEditorState: EditorState = {
  input: '',
  output: '',
};

export const editorReducer: React.Reducer<EditorState, EditorAction> = (
  state,
  action,
) => {
  switch (action.type) {
    case 'INPUT':
      return { ...state, input: action.payload };
    case 'OUTPUT': {
      return {
        ...state,
        output: action.error ? state.output : action.payload,
        error: action.error ? action.payload : undefined,
      };
    }
    default:
      throw new Error(`Invalid action type "${(action as any).type}".`);
  }
};

export function useEditorReducer(
  initialState: EditorState = defaultEditorState,
) {
  return useReducer(editorReducer, initialState);
}
