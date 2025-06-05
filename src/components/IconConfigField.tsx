import React from 'react';
import IconSelector from './IconSelector';

interface IconConfigFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const IconConfigField: React.FC<IconConfigFieldProps> = ({
  label,
  value,
  onChange,
  className = '',
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-sm font-medium mb-2">{label}</label>
      <div className="flex items-start">
        <div className="flex-1">
          <IconSelector 
            value={value} 
            onChange={onChange} 
          />
        </div>
        
        {/* Preview */}
        {value && (
          <div className="ml-4 w-10 h-10 flex items-center justify-center border rounded bg-white">
            <div className="w-6 h-6" dangerouslySetInnerHTML={{ __html: value }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default IconConfigField; 