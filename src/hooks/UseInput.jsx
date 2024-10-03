import { useState } from 'react';

function useInput(defaultValue = '') {
  const [value, setValue] = useState(defaultValue);

  const onValueChangeHandler = (event) => {
    let text = event.target.value ?? event.target.innerHTML;
    setValue(text);
  };

  return [value, onValueChangeHandler, setValue];
}

export default useInput;