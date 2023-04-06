import { useCallback, useState } from 'react';

const useForm = (onSubmit, initialState = {}) => {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleInputChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    await onSubmit?.(formData);
    setLoading(false);
  };

  const handleReset = useCallback(() => setFormData(initialState), [initialState]);

  return {
    formData,
    handleInputChange,
    handleReset,
    handleSubmit,
    loading,
    setFormData,
  };
};

export default useForm;
