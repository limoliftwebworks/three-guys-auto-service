import React, { useState } from 'react';
import ColorSelectorInput from '../ColorSelectorInput';

interface GuaranteeCard {
  title: string;
  description: string;
  icon: string;
  color: string;
}

interface EditableGuaranteeCardsProps {
  guaranteeCards: GuaranteeCard[];
  onChange: (cards: GuaranteeCard[]) => void;
}

const EditableGuaranteeCards: React.FC<EditableGuaranteeCardsProps> = ({ guaranteeCards, onChange }) => {
  const [expanded, setExpanded] = useState(false);

  const handleUpdateCard = (index: number, field: keyof GuaranteeCard, value: string) => {
    const updatedCards = [...guaranteeCards];
    updatedCards[index] = { ...updatedCards[index], [field]: value };
    onChange(updatedCards);
  };

  const handleAddCard = () => {
    onChange([
      ...guaranteeCards,
      {
        title: 'New Guarantee',
        description: 'Description of the guarantee',
        icon: 'check-circle',
        color: '#4f46e5'
      }
    ]);
  };

  const handleRemoveCard = (index: number) => {
    const updatedCards = [...guaranteeCards];
    updatedCards.splice(index, 1);
    onChange(updatedCards);
  };

  // List of available icons
  const iconOptions = [
    { value: 'check-circle', label: 'Check Circle' },
    { value: 'shield', label: 'Shield' },
    { value: 'star', label: 'Star' },
    { value: 'thumb-up', label: 'Thumb Up' },
    { value: 'clock', label: 'Clock' },
    { value: 'heart', label: 'Heart' },
    { value: 'badge-check', label: 'Badge Check' },
    { value: 'lightning-bolt', label: 'Lightning Bolt' }
  ];

  return (
    <div className="border border-gray-200 rounded-lg shadow-sm mb-4 overflow-hidden">
      <div 
        className="p-4 bg-gray-50 flex justify-between items-center cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <h3 className="text-lg font-medium text-gray-900">Guarantee Cards</h3>
        <span>{expanded ? '▼' : '►'}</span>
      </div>
      
      {expanded && (
        <div className="p-4">
          {guaranteeCards.map((card, index) => (
            <div key={index} className="mb-6 border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium text-gray-900">Card #{index + 1}</h4>
                <button
                  type="button"
                  onClick={() => handleRemoveCard(index)}
                  className="p-1 bg-red-100 text-red-700 rounded hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Remove
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={card.title}
                    onChange={(e) => handleUpdateCard(index, 'title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Icon
                  </label>
                  <select
                    value={card.icon}
                    onChange={(e) => handleUpdateCard(index, 'icon', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    {iconOptions.map((icon) => (
                      <option key={icon.value} value={icon.value}>
                        {icon.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <ColorSelectorInput
                    label="Color"
                    value={card.color}
                    onChange={(value) => handleUpdateCard(index, 'color', value)}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={card.description}
                    onChange={(e) => handleUpdateCard(index, 'description', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>
          ))}
          
          <button
            type="button"
            onClick={handleAddCard}
            className="mt-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Guarantee Card
          </button>
        </div>
      )}
    </div>
  );
};

export default EditableGuaranteeCards; 