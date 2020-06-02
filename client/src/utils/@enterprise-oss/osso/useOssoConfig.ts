import React, {useState, FormEvent, ChangeEvent } from 'react';

const useOssoConfig = <T>(initialState: T) => {
  const [inputs, setInputs] = useState<T>(initialState);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault();
    }
  };
  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    event.persist();
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
  };
  return {
    handleSubmit,
    handleInputChange,
    inputs,
  };
};

export default useOssoConfig;