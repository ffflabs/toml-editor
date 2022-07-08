import styled from '@emotion/styled/macro';

export const Stack = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

/**
 * A view that arranges its children in a horizontal line.
 */
export const HStack = styled(Stack)`
  flex-direction: row;
`;

/**
 * A view that arranges its children in a vertical line.
 */
export const VStack = styled(Stack)`
  flex-direction: column;
`;

export const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
