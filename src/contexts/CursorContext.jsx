import { createContext, useContext, useState, useCallback } from 'react';

const CursorContext = createContext({
  cursorType: 'default',
  cursorLabel: '',
  setCursorType: () => {},
  setCursorLabel: () => {},
  onMouseEnterInteractive: () => {},
  onMouseLeaveInteractive: () => {},
  onMouseEnterLabeled: () => {},
  onMouseLeaveLabeled: () => {},
});

export function CursorProvider({ children }) {
  const [cursorType, setCursorType] = useState('default');
  const [cursorLabel, setCursorLabel] = useState('');

  const onMouseEnterInteractive = useCallback(() => {
    setCursorType('expanded');
  }, []);

  const onMouseLeaveInteractive = useCallback(() => {
    setCursorType('default');
    setCursorLabel('');
  }, []);

  const onMouseEnterLabeled = useCallback((label) => {
    setCursorType('labeled');
    setCursorLabel(label);
  }, []);

  const onMouseLeaveLabeled = useCallback(() => {
    setCursorType('default');
    setCursorLabel('');
  }, []);

  return (
    <CursorContext.Provider value={{
      cursorType,
      cursorLabel,
      setCursorType,
      setCursorLabel,
      onMouseEnterInteractive,
      onMouseLeaveInteractive,
      onMouseEnterLabeled,
      onMouseLeaveLabeled,
    }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  return useContext(CursorContext);
}

export default CursorContext;
