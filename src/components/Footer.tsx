const Footer = () => (
  <footer className="border-t border-border py-8 px-4">
    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
      <span className="font-mono text-xs text-muted-foreground">
        Simulated Satellite Edge Computing System
      </span>
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-accent animate-pulse-glow" />
        <span className="font-mono text-xs text-muted-foreground">ALL SYSTEMS NOMINAL</span>
      </div>
    </div>
  </footer>
);

export default Footer;
