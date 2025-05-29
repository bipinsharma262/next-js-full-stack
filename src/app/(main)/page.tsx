import GradientBackground from '@/app/(main)/components/GradientBackground';
import HomeContent from './components/HomeContent';

export default async function Home() {
  return (
    <main className="flex-grow pt-2 px-4 sm:px-6 md:px-8">
      <section className="relative min-h-[90vh] flex items-center pt-20 md:pt-0">
        <GradientBackground />
        <HomeContent />
      </section>
    </main>
  );
}
