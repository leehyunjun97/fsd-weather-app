import { X } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  isDestructive?: boolean;
}

export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = '확인',
  isDestructive = false,
}: ConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
      <div
        className='absolute inset-0 bg-black/40 backdrop-blur-sm'
        onClick={onClose}
      />
      <div className='relative w-full max-w-sm bg-white rounded-3xl shadow-2xl p-6 animate-in fade-in zoom-in-95'>
        <div className='flex justify-between items-center mb-4'>
          <h3 className='text-xl font-bold'>{title}</h3>
          <button onClick={onClose}>
            <X size={20} className='text-gray-400' />
          </button>
        </div>

        {description && <p className='text-gray-600 mb-6'>{description}</p>}

        <div className='flex gap-3'>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`flex-1 py-3 rounded-xl text-white font-medium ${
              isDestructive
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-black hover:bg-gray-800'
            }`}
          >
            {confirmLabel}
          </button>
          <button
            onClick={onClose}
            className='flex-1 py-3 bg-gray-100 rounded-xl font-medium'
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};
