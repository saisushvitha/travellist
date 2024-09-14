import { useEffect, useState } from "react";
import countriee from './countries'; 

interface Country {
  name: string;
  visited: boolean;
}

const BucketList: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>(countriee);

  // Load countries on first render
  useEffect(() => {
    const storageCN = localStorage.getItem('coun');
    if (storageCN) {
      setCountries(JSON.parse(storageCN));
    }
  }, []);

  const toggleVisited = (index: number) => {
    const updatedCountries = [...countries];
    updatedCountries[index].visited = !updatedCountries[index].visited;
    setCountries(updatedCountries);
    localStorage.setItem('coun', JSON.stringify(updatedCountries));
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center"
         style={{ backgroundImage: `url('/images/travel.jpg')`, backgroundSize: 'cover' }}>
      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-black opacity-60"></div>
      
      {/* Title and main content */}
      <div className="relative p-10 w-full max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-white mb-12">
          The Ultimate Travel Checklist
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {countries.map((country, index) => (
            <div
              key={index}
              className={`relative p-4 rounded-lg cursor-pointer transition-shadow duration-300 ease-in-out transform ${country.visited ? 'bg-green-100 text-gray-800' : 'bg-white text-gray-800'} shadow-2xl hover:shadow-3xl`}
              onClick={() => toggleVisited(index)}
              style={{ 
                opacity: 0.9, // Slightly reduced opacity for background effect
                height: 'auto',
                width: '220px', // Card width
                transform: 'translateZ(40px) rotateX(8deg) rotateY(8deg) scale(1.05)', // Enhanced 3D effect
                perspective: '1500px', // Increased perspective for depth
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.4), 0 4px 8px rgba(0, 0, 0, 0.2)', // Reduced inner shadow for balance
                margin: '0 auto', // Center the cards
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                background: country.visited ? 'linear-gradient(to bottom right, rgba(144, 238, 144, 0.8), rgba(144, 238, 144, 0.1))' : 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.1))' // Light green gradient when visited
              }}
            >
              <div className="flex items-center justify-between">
                <span className={`text-lg font-semibold ${country.visited ? 'line-through text-gray-900' : ''}`}>
                  {country.name}
                </span>
                <input
                  type="checkbox"
                  checked={country.visited}
                  onChange={() => toggleVisited(index)}
                  className="h-6 w-6 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 transition-transform duration-300 ease-in-out cursor-pointer"
                  style={{ transform: country.visited ? 'scale(1.2)' : 'scale(1)' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BucketList;
