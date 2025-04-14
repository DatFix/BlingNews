import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';

type TagInputProps = {
  onChange?: (tags: string[]) => void;
};

const TagInput = ({ onChange }: TagInputProps) => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const tagRegex = /^[a-z0-9]+$/;
  const maxTags = 5; // Giới hạn số lượng tag

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',') && inputValue.trim()) {
      e.preventDefault();
      const newTag = inputValue.trim();

      if (!tagRegex.test(newTag)) {
        setError('Tag phải bắt đầu bằng "#" và chỉ chứa chữ thường/số, không dấu cách');
        return;
      }

      if (tags.length >= maxTags) {
        setError(`Chỉ được tối đa ${maxTags} tag.`);
        return; // Không thêm tag nếu đã đủ
      }

      if (!tags.includes(newTag)) {
        const updatedTags = [...tags, newTag];
        setTags(updatedTags);
        onChange?.(updatedTags); // trả value ra ngoài
      }

      setInputValue('');
      setError('');
    } else if (e.key === 'Backspace' && !inputValue) {
      const updatedTags = tags.slice(0, -1);
      setTags(updatedTags);
      onChange?.(updatedTags);
    }
  };

  const removeTag = (indexToRemove: number) => {
    const updated = tags.filter((_, index) => index !== indexToRemove);
    setTags(updated);
    onChange?.(updated);
  };

  return (
    <div className="w-full">
      <div className="p-3 rounded-xl bg-base-100 shadow flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center bg-primary badge-sm text-primary-content px-3 py-1 rounded-full gap-1"
          >
            <span>{tag}</span>
            <button onClick={() => removeTag(index)} className="hover:text-error">
              <IoMdClose />
            </button>
          </div>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-grow bg-transparent outline-none text-base-content placeholder:text-base-content/50 text-sm"
          placeholder="Nhập tag như #du+lich"
        />
      </div>
      {error && <div className="text-error text-[12px] mt-1">{error}</div>}
    </div>
  );
};

export default TagInput;
