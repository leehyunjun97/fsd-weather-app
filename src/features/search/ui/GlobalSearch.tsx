import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import districts from '../../../shared/data/korea_districts.json';
import { MapPin, Search } from 'lucide-react';
import { fetchCoordinates } from '../../../shared/api/weatherApi';

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GlobalSearch({ isOpen, onClose }: GlobalSearchProps) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const filteredDistricts = useMemo(() => {
    if (!searchTerm) return [];

    return districts
      .map((name: string) => name.replace(/-/g, ' '))
      .filter((name: string) => name.includes(searchTerm))
      .slice(0, 20);
  }, [searchTerm]);

  const handleSelectLocation = async (districtName: string) => {
    setIsSearching(true);
    const coords = await fetchCoordinates(districtName);

    if (coords) {
      onClose();
      setSearchTerm('');
      navigate(`/detail/${districtName.replace(/\s+/g, '-')}`, {
        state: { lat: coords.lat, lon: coords.lon },
      });
    } else {
      alert('위치 정보를 찾을 수 없습니다.');
    }
    setIsSearching(false);
  };

  if (!isOpen) return null;

  return (
    <div className='w-full'>
      <div className='pb-4 animate-in fade-in slide-in-from-top-2 duration-200'>
        <div className='relative'>
          <input
            autoFocus
            type='text'
            placeholder='장소를 검색해주세요.'
            className='w-full rounded-lg bg-gray-100/80 px-4 py-3 pl-10 text-base outline-none focus:ring-2 focus:ring-gray-500/20 focus:bg-white transition-all shadow-inner'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className='absolute left-3 top-3.5 text-gray-400' size={18} />
        </div>
      </div>

      {searchTerm && (
        <div className='absolute left-0 w-full border-t border-gray-100 bg-white/95 backdrop-blur-xl shadow-xl z-50'>
          <div className='layout-width max-h-[60vh] overflow-y-auto'>
            {isSearching ? (
              <div className='p-8 text-center text-sm text-gray-500'>
                좌표를 찾는 중...
              </div>
            ) : filteredDistricts.length > 0 ? (
              <ul>
                {filteredDistricts.map((item, idx) => (
                  <li
                    key={idx}
                    onClick={() => handleSelectLocation(item)}
                    className='flex items-center gap-3 px-6 py-3.5 text-sm text-gray-700 hover:bg-blue-50 cursor-pointer border-b border-gray-50 last:border-none active:bg-blue-100 transition-colors'
                  >
                    <MapPin size={16} className='text-gray-400' />
                    <span>
                      {item.split(searchTerm).map((part, i) => (
                        <span key={i}>
                          {part}
                          {i !== item.split(searchTerm).length - 1 && (
                            <span className='text-blue-600 font-bold'>
                              {searchTerm}
                            </span>
                          )}
                        </span>
                      ))}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className='py-8 text-center text-sm text-gray-400'>
                검색 결과가 없습니다.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
