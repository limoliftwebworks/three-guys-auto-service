import Link from 'next/link';
import Image from 'next/image';

interface NavBarProps {
  config: any;
}

export default function NavBar({ config }: NavBarProps) {
  const navConfig = config.navBar;
  
  // Function to ensure image URLs are properly formatted
  const getImageUrl = (src: string) => {
    if (!src) return '';
    // If it's a data URL or absolute URL, return as is
    if (src.startsWith('data:') || src.startsWith('http://') || src.startsWith('https://')) {
      return src;
    }
    // For relative URLs, ensure they start with a slash
    return src.startsWith('/') ? src : `/${src}`;
  };
  
  return (
    <nav className="w-full" style={{ backgroundColor: navConfig.backgroundColor }}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          {navConfig.logo && (
            <div className="w-12 h-12 mr-2">
              {/* Use a regular img tag instead of Image component to avoid Next.js image optimization issues */}
              <img
                src={getImageUrl(navConfig.logo)}
                alt={config.companyInfo?.name || 'Logo'}
                className="w-full h-full object-contain"
              />
            </div>
          )}
          
          <span 
            className="text-xl font-bold"
            style={{ 
              background: `linear-gradient(to right, ${navConfig.siteTitleGradientFrom || '#7c3aed'}, ${navConfig.siteTitleGradientTo || '#a78bfa'})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            {navConfig.siteTitle}
          </span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          {navConfig.navLinks && navConfig.navLinks.map((link: { path: string; label: string }, index: number) => (
            <Link 
              key={index} 
              href={link.path}
              className="font-medium transition-colors" 
              style={{ color: navConfig.textColor }}
            >
              {link.label}
            </Link>
          ))}
          
          <button
            className="px-4 py-2 rounded font-medium transition-colors"
            style={{ backgroundColor: navConfig.scheduleButtonColor, color: '#ffffff' }}
          >
            {navConfig.scheduleButtonText || 'Schedule Now'}
          </button>
        </div>
        
        <div className="md:hidden">
          <button className="p-2" style={{ color: navConfig.textColor }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
} 