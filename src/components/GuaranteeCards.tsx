interface Guarantee {
  title: string;
  description: string;
  icon?: string;
}

interface GuaranteeCardsProps {
  guarantees: Guarantee[];
}

export default function GuaranteeCards({ guarantees }: GuaranteeCardsProps) {
  if (!guarantees || guarantees.length === 0) {
    return null;
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {guarantees.map((guarantee, index) => (
        <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center">
          {guarantee.icon && (
            <div className="text-purple-600 text-4xl mb-4">
              <span dangerouslySetInnerHTML={{ __html: guarantee.icon }} />
            </div>
          )}
          <h3 className="text-xl font-bold mb-3 text-gray-800">{guarantee.title}</h3>
          <p className="text-gray-600">{guarantee.description}</p>
        </div>
      ))}
    </div>
  );
} 