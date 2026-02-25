import { SatelliteData } from '@/hooks/useSatelliteData';

interface Props {
  data: SatelliteData;
  loading: boolean;
}

const DataCard = ({ label, value, unit, status, statusColor }: {
  label: string;
  value: string | number;
  unit: string;
  status?: string;
  statusColor?: string;
}) => (
  <div className="border-glow rounded-md p-4 bg-card/50">
    <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-1">{label}</div>
    <div className="font-display text-xl font-bold text-foreground">
      {value} <span className="text-sm text-muted-foreground">{unit}</span>
    </div>
    {status && (
      <div className="flex items-center gap-2 mt-2">
        <span className={`w-2 h-2 rounded-full ${statusColor || 'bg-accent'} animate-pulse-glow`} />
        <span className="font-mono text-xs text-muted-foreground uppercase">{status}</span>
      </div>
    )}
  </div>
);

const BandwidthGauge = ({ percentage }: { percentage: number }) => {
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-36 h-36">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" fill="none" stroke="hsl(215 40% 16%)" strokeWidth="8" />
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="hsl(185 100% 50%)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-1000 ease-out"
            style={{ filter: 'drop-shadow(0 0 8px hsl(185 100% 50% / 0.5))' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-2xl font-bold text-primary glow-text">{percentage}%</span>
        </div>
      </div>
      <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">Bandwidth Saved</span>
    </div>
  );
};

const VideoCompressionSection = ({ data, loading }: Props) => {
  return (
    <section id="video" className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="font-mono text-xs text-primary uppercase tracking-widest">Module 01</span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mt-2">
            Video Compression Analysis
          </h2>
          <div className="w-20 h-0.5 bg-primary/50 mx-auto mt-4" />
        </div>

        {/* Transfer indicator */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="font-mono text-xs text-muted-foreground flex items-center gap-2">
            <span className="inline-block w-3 h-3 border border-primary/50 rounded-sm" />
            SATELLITE
          </div>
          <div className="flex-1 max-w-xs h-px bg-gradient-to-r from-primary/50 via-primary to-primary/50 relative">
            <div
              className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary glow-primary"
              style={{ animation: 'data-stream 2s linear infinite', left: 0 }}
            />
          </div>
          <div className="font-mono text-xs text-muted-foreground flex items-center gap-2">
            <span className="inline-block w-3 h-3 border border-accent/50 rounded-sm" />
            GROUND STATION
          </div>
        </div>

        {/* Split screen */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          
          {/* Uncompressed Feed Panel */}
          <div className="border-glow rounded-lg p-6 bg-card/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-destructive animate-pulse-glow" />
              <h3 className="font-display text-sm font-semibold text-foreground uppercase tracking-wider">
                Uncompressed Satellite Feed
              </h3>
            </div>
            
            {/* LIVE RAW VIDEO PLAYER INJECTION */}
            <div className="aspect-video bg-black rounded-md border border-border flex items-center justify-center mb-4 overflow-hidden relative">
              <video 
                className="w-full h-full object-cover" 
                controls 
                autoPlay 
                loop 
                muted
              >
                {/* IMPORTANT: Put your Ground Station's External IP below! */}
                <source src="http://35.207.224.156/raw_earth_feed.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <DataCard
                label="File Size"
                value={data.rawVideoSize}
                unit="MB"
                status={loading ? 'Fetching...' : 'Streaming'}
                statusColor="bg-destructive"
              />
              <DataCard
                label="Transmission"
                value={data.transmissionStatus.toUpperCase()}
                unit=""
                status="Standard Link"
                statusColor="bg-warning"
              />
            </div>
          </div>

          {/* Compressed Feed Panel */}
          <div className="border-glow rounded-lg p-6 bg-card/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-accent animate-pulse-glow" />
              <h3 className="font-display text-sm font-semibold text-foreground uppercase tracking-wider">
                Edge-Compressed Satellite Feed
              </h3>
            </div>
            
            {/* LIVE COMPRESSED VIDEO PLAYER INJECTION */}
            <div className="aspect-video bg-black rounded-md border border-accent/20 flex items-center justify-center mb-4 overflow-hidden relative">
              <video 
                className="w-full h-full object-cover" 
                controls 
                autoPlay 
                loop 
                muted
              >
                {/* IMPORTANT: Put your Ground Station's External IP below! */}
                <source src="http://35.207.224.156/compressed_payload.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <DataCard
                label="File Size"
                value={data.compressedVideoSize}
                unit="MB"
                status={loading ? 'Fetching...' : 'Optimized'}
                statusColor="bg-accent"
              />
              <DataCard
                label="Transmission"
                value={data.optimizedStatus.toUpperCase()}
                unit=""
                status="Edge Processed"
                statusColor="bg-accent"
              />
            </div>
          </div>

        </div>

        {/* Bandwidth saved */}
        <div className="border-glow rounded-lg p-8 bg-card/30 flex flex-col items-center">
          <BandwidthGauge percentage={data.videoBandwidthSaved} />
          <p className="font-mono text-xs text-muted-foreground mt-4 text-center max-w-md">
            Edge computing reduces raw satellite video throughput by{' '}
            <span className="text-primary font-semibold">{data.videoBandwidthSaved}%</span>, enabling real-time
            transmission over limited downlink channels.
          </p>
        </div>
      </div>
    </section>
  );
};

export default VideoCompressionSection;