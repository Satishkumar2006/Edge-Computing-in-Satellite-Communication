import { SatelliteData } from '@/hooks/useSatelliteData';

interface Props {
  data: SatelliteData;
  loading: boolean;
}

const TelemetrySection = ({ data, loading }: Props) => {
  const rawLines = data.rawTelemetry.split('\n');
  const filteredLines = data.filteredTelemetry.split('\n');

  const getLineColor = (line: string) => {
    if (line.includes('CRITICAL')) return 'text-destructive';
    if (line.includes('WARNING') || line.includes('⚠')) return 'text-warning';
    if (line.includes('ALERT')) return 'text-primary';
    if (line.includes('INFO')) return 'text-accent';
    return 'text-foreground/70';
  };

  return (
    <section id="telemetry" className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="font-mono text-xs text-accent uppercase tracking-widest">Module 02</span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mt-2">
            Telemetry Data Compression
          </h2>
          <div className="w-20 h-0.5 bg-accent/50 mx-auto mt-4" />
        </div>

        {/* Side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {/* Raw */}
          <div className="border-glow rounded-lg p-6 bg-card/30">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-warning animate-pulse-glow" />
                <h3 className="font-display text-sm font-semibold text-foreground uppercase tracking-wider">
                  Unfiltered Telemetry
                </h3>
              </div>
              <span className="font-mono text-xs text-muted-foreground">{data.rawTelemetrySize} KB</span>
            </div>
            <div className="bg-background/80 rounded-md border border-border p-4 h-72 overflow-y-auto font-mono text-xs leading-relaxed scanline">
              {rawLines.map((line, i) => (
                <div key={i} className={`${line.includes('⚠') ? 'text-warning' : 'text-foreground/70'} mb-1`}>
                  {line}
                </div>
              ))}
              {loading && (
                <div className="text-primary animate-pulse-glow mt-2">▸ Receiving data stream...</div>
              )}
            </div>
          </div>

          {/* Filtered */}
          <div className="border-glow rounded-lg p-6 bg-card/30" style={{ borderColor: 'hsl(160 100% 45% / 0.2)' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-accent animate-pulse-glow" />
                <h3 className="font-display text-sm font-semibold text-foreground uppercase tracking-wider">
                  Critical Telemetry Only
                </h3>
              </div>
              <span className="font-mono text-xs text-accent">{data.filteredTelemetrySize} KB</span>
            </div>
            <div className="bg-background/80 rounded-md border border-accent/20 p-4 h-72 overflow-y-auto font-mono text-xs leading-relaxed">
              {filteredLines.map((line, i) => (
                <div key={i} className={`${getLineColor(line)} mb-2 p-2 rounded bg-muted/20 border-l-2 ${
                  line.includes('CRITICAL') ? 'border-destructive' :
                  line.includes('WARNING') ? 'border-warning' :
                  line.includes('ALERT') ? 'border-primary' : 'border-accent'
                }`}>
                  {line}
                </div>
              ))}
              {loading && (
                <div className="text-accent animate-pulse-glow mt-2">▸ Processing edge filter...</div>
              )}
            </div>
          </div>
        </div>

        {/* Bandwidth saved */}
        <div className="border-glow rounded-lg p-8 bg-card/30 text-center">
          <div className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-3">
            Telemetry Bandwidth Reduction
          </div>
          <div className="font-display text-4xl sm:text-5xl font-bold text-accent glow-text-accent mb-4">
            {data.telemetryBandwidthSaved}%
          </div>
          {/* Progress bar */}
          <div className="max-w-md mx-auto h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000 ease-out"
              style={{
                width: `${data.telemetryBandwidthSaved}%`,
                background: 'linear-gradient(90deg, hsl(160 100% 45%), hsl(185 100% 50%))',
                boxShadow: '0 0 10px hsl(160 100% 45% / 0.5)',
              }}
            />
          </div>
          <p className="font-mono text-xs text-muted-foreground mt-4 max-w-lg mx-auto">
            Edge filtering transmits only anomalies and critical sensor readings, reducing telemetry payload by{' '}
            <span className="text-accent font-semibold">{data.telemetryBandwidthSaved}%</span>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TelemetrySection;
