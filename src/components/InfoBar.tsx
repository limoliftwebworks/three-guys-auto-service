import { FaPhone, FaMapMarkerAlt, FaClock, FaInfoCircle } from 'react-icons/fa';

interface InfoBarProps {
  config: any;
}

export default function InfoBar({ config }: InfoBarProps) {
  const infoBarConfig = config.infoBar || {};
  const companyInfo = config.companyInfo || {};
  
  if (!infoBarConfig.enabled) {
    return null;
  }
  
  return (
    <div 
      className="w-full py-3"
      style={{ backgroundColor: infoBarConfig.backgroundColor || '#f9fafb' }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center md:justify-between gap-4 items-center">
          {infoBarConfig.message && (
            <div className="flex items-center" style={{ color: infoBarConfig.textColor || '#4b5563' }}>
              <FaInfoCircle className="mr-2" />
              <span>{infoBarConfig.message}</span>
            </div>
          )}
          
          {infoBarConfig.showPhone && companyInfo.phone && (
            <div className="flex items-center" style={{ color: infoBarConfig.textColor || '#4b5563' }}>
              <FaPhone className="mr-2" />
              <span>{companyInfo.phone}</span>
            </div>
          )}
          
          {infoBarConfig.showLocation && companyInfo.address && (
            <div className="flex items-center" style={{ color: infoBarConfig.textColor || '#4b5563' }}>
              <FaMapMarkerAlt className="mr-2" />
              <span>{companyInfo.address}</span>
            </div>
          )}
          
          {infoBarConfig.showHours && companyInfo.hours && (
            <div className="flex items-center" style={{ color: infoBarConfig.textColor || '#4b5563' }}>
              <FaClock className="mr-2" />
              <span>{companyInfo.hours}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 