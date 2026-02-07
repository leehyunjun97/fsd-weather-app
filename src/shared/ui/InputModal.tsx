import { useEffect, useState, useRef } from 'react';
import { X } from 'lucide-react';

interface InputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (value: string) => void;
  title: string;
  description?: string;
  initialValue?: string;
  placeholder?: string;
  confirmLabel?: string;
}

export const InputModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  initialValue = '',
  placeholder = '입력해주세요',
  confirmLabel = '저장',
}: InputModalProps) => {
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!value.trim()) return;
    onConfirm(value.trim());
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
      <div
        className='absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity'
        onClick={onClose}
      />

      <div className='relative w-full max-w-sm bg-white rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200'>
        <div className='flex items-center justify-between px-6 pt-6 pb-2'>
          <h3 className='text-xl font-bold text-gray-800'>{title}</h3>
          <button
            onClick={onClose}
            className='p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors'
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className='px-6 py-4'>
          {description && (
            <p className='text-sm text-gray-500 mb-4'>{description}</p>
          )}

          <input
            ref={inputRef}
            type='text'
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            className='w-full px-4 py-3 text-lg bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-800 placeholder:text-gray-400'
          />

          <div className='flex gap-3 mt-8 mb-2'>
            <button
              type='submit'
              disabled={!value.trim()}
              className='flex-1 py-3 px-4 rounded-xl text-white bg-black hover:bg-gray-800 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {confirmLabel}
            </button>
            <button
              type='button'
              onClick={onClose}
              className='flex-1 py-3 px-4 rounded-xl text-gray-600 bg-gray-100 hover:bg-gray-200 font-medium transition-colors'
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
