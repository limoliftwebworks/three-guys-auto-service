import React from 'react';
import * as Icons from './index';

const SocialMediaIconsDemo: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Social Media Icons Demo</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Facebook */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Facebook Icons</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 mb-2">
                <Icons.FacebookIcon />
              </div>
              <span className="text-sm text-center">FacebookIcon</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 mb-2">
                <Icons.FacebookBlueIcon />
              </div>
              <span className="text-sm text-center">FacebookBlueIcon</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 mb-2">
                <Icons.FacebookBlackIcon />
              </div>
              <span className="text-sm text-center">FacebookBlackIcon</span>
            </div>
          </div>
        </div>
        
        {/* Twitter/X */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Twitter/X Icons</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 mb-2">
                <Icons.TwitterIcon />
              </div>
              <span className="text-sm text-center">TwitterIcon</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 mb-2">
                <Icons.TwitterBlueIcon />
              </div>
              <span className="text-sm text-center">TwitterBlueIcon</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 mb-2">
                <Icons.TwitterBlackIcon />
              </div>
              <span className="text-sm text-center">TwitterBlackIcon</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 mb-2">
                <Icons.XIcon />
              </div>
              <span className="text-sm text-center">XIcon</span>
            </div>
          </div>
        </div>
        
        {/* Instagram */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Instagram Icons</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 mb-2">
                <Icons.InstagramIcon />
              </div>
              <span className="text-sm text-center">InstagramIcon</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 mb-2">
                <Icons.InstagramColorIcon />
              </div>
              <span className="text-sm text-center">InstagramColorIcon</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 mb-2">
                <Icons.InstagramBlackIcon />
              </div>
              <span className="text-sm text-center">InstagramBlackIcon</span>
            </div>
          </div>
        </div>
        
        {/* LinkedIn */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">LinkedIn Icons</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 mb-2">
                <Icons.LinkedInIcon />
              </div>
              <span className="text-sm text-center">LinkedInIcon</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 mb-2">
                <Icons.LinkedInBlueIcon />
              </div>
              <span className="text-sm text-center">LinkedInBlueIcon</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 mb-2">
                <Icons.LinkedInBlackIcon />
              </div>
              <span className="text-sm text-center">LinkedInBlackIcon</span>
            </div>
          </div>
        </div>
        
        {/* YouTube */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">YouTube Icons</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 mb-2">
                <Icons.YouTubeIcon />
              </div>
              <span className="text-sm text-center">YouTubeIcon</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 mb-2">
                <Icons.YouTubeRedIcon />
              </div>
              <span className="text-sm text-center">YouTubeRedIcon</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 mb-2">
                <Icons.YouTubeBlackIcon />
              </div>
              <span className="text-sm text-center">YouTubeBlackIcon</span>
            </div>
          </div>
        </div>
        
        {/* Pinterest */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Pinterest Icons</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 mb-2">
                <Icons.PinterestIcon />
              </div>
              <span className="text-sm text-center">PinterestIcon</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 mb-2">
                <Icons.PinterestRedIcon />
              </div>
              <span className="text-sm text-center">PinterestRedIcon</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 mb-2">
                <Icons.PinterestBlackIcon />
              </div>
              <span className="text-sm text-center">PinterestBlackIcon</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h2 className="text-xl font-semibold mb-4">Usage Example</h2>
        <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto">
          {`import { FacebookIcon, TwitterBlueIcon, InstagramIcon } from '../components/icons';

const SocialLinks = () => {
  return (
    <div className="flex space-x-4">
      <a href="https://facebook.com" className="text-blue-600 w-6 h-6">
        <FacebookIcon />
      </a>
      <a href="https://twitter.com" className="text-blue-400 w-6 h-6">
        <TwitterBlueIcon />
      </a>
      <a href="https://instagram.com" className="w-6 h-6">
        <InstagramIcon />
      </a>
    </div>
  );
};`}
        </pre>
      </div>
    </div>
  );
};

export default SocialMediaIconsDemo; 