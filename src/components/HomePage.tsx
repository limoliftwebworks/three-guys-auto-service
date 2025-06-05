// src/components/HomePage.tsx
'use client';

import { useConfig } from '@/context/ConfigContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// No props are expected since we're using useConfig
export default function HomePage() {
  const config = useConfig();
  const home = config?.pages?.Home || { title: '', heroImage: '', content: '' };

  return (
    <div>
      <Header />
      <main className="p-6">
        <h1 className="text-3xl font-bold mb-4">{home.title}</h1>
        {home.heroImage && (
          <img
            src={home.heroImage}
            alt={home.title}
            className="w-full h-64 object-cover mb-4 rounded"
          />
        )}
        <div
          dangerouslySetInnerHTML={{ __html: home.content }}
          className="prose"
        />
      </main>
      <Footer />
    </div>
  );
}