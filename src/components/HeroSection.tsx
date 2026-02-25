import OrbitalBackground from './OrbitalBackground';

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <OrbitalBackground />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background z-[1]" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
          <span className="font-mono text-xs text-primary uppercase tracking-widest">System Online</span>
        </div>

        <h1
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 animate-fade-in"
          style={{ animationDelay: '0.2s', opacity: 0 }}
        >
          Satellite Edge Computing &{' '}
          <span className="text-primary glow-text">Bandwidth Optimization</span>{' '}
          System
        </h1>

        <p
          className="font-mono text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in"
          style={{ animationDelay: '0.4s', opacity: 0 }}
        >
          Real-time compression and optimized space-to-ground data transmission
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in"
          style={{ animationDelay: '0.6s', opacity: 0 }}
        >
          <a
            href="#video"
            className="px-6 py-3 rounded-md bg-primary text-primary-foreground font-mono text-sm font-semibold tracking-wider uppercase glow-primary hover:brightness-110 transition-all"
          >
            Video Compression →
          </a>
          <a
            href="#telemetry"
            className="px-6 py-3 rounded-md border border-primary/30 text-primary font-mono text-sm font-semibold tracking-wider uppercase hover:bg-primary/10 transition-all"
          >
            Telemetry Data →
          </a>
        </div>

        {/* Data stream indicator */}
        <div
          className="mt-16 flex items-center justify-center gap-8 text-xs font-mono text-muted-foreground animate-fade-in"
          style={{ animationDelay: '0.8s', opacity: 0 }}
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            SAT-7 CONNECTED
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
            DOWNLINK: 2.4 Mbps
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-warning" />
            ORBIT: LEO 542km
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-float">
        <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex justify-center pt-2">
          <div className="w-1 h-2 rounded-full bg-primary animate-pulse-glow" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
