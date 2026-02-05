import { useState } from 'react';

export const useInlineEdit = (
  initialValue: string,
  onSave: (value: string) => void
) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);

  const startEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
    setValue(initialValue);
  };

  const save = (e?: React.MouseEvent | React.FocusEvent) => {
    e?.stopPropagation();
    if (value.trim()) {
      onSave(value.trim());
    } else {
      setValue(initialValue);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') save();
  };

  return { isEditing, value, setValue, startEdit, save, handleKeyDown };
};
