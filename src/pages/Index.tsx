import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import VideoCompressionSection from '@/components/VideoCompressionSection';
import TelemetrySection from '@/components/TelemetrySection';
import Footer from '@/components/Footer';

// Your live Firebase URL!
const FIREBASE_URL = "https://isro-edge-project-default-rtdb.asia-southeast1.firebasedatabase.app/telemetry.json";

const Index = () => {
  const [loading, setLoading] = useState(true);
  
  // State structure matching the template's expected props
  const [data, setData] = useState({
    rawTelemetry: "Nominal telemetry data streams...\n[INFO] Temp: 22.5C Rad: 0.1\n[INFO] Temp: 22.6C Rad: 0.1\n[INFO] Temp: 22.4C Rad: 0.1",
    filteredTelemetry: "Awaiting critical payloads...",
    rawTelemetrySize: "0",
    filteredTelemetrySize: "0",
    telemetryBandwidthSaved: 0,
    rawVideoSize: "0",
    compressedVideoSize: "0",
    videoBandwidthSaved: 0,
    transmissionStatus: "Waiting...",
    optimizedStatus: "Waiting..."
  });

  useEffect(() => {
    const fetchLiveSpaceData = async () => {
      try {
        const response = await fetch(FIREBASE_URL);
        const fbData = await response.json();

        if (fbData) {
          // Parse the savings percentage from your Bash script
          const numericSavings = parseFloat(fbData.savings) || 0;

          setData({
            // Telemetry Pipeline Mapping
            rawTelemetry: `[INFO] Temp: 22.5C Rad: 0.1\n[INFO] Temp: 22.6C Rad: 0.1\n${fbData.latest_alert || ""}\n[INFO] Temp: 22.4C Rad: 0.1`,
            filteredTelemetry: fbData.latest_alert || "System nominal.",
            rawTelemetrySize: "1250", // Simulated large raw sensor dump size
            filteredTelemetrySize: "0.04", // ~43 bytes from our script
            telemetryBandwidthSaved: 99.9, // Text filtering saves almost 100%
            
            // Video Pipeline Mapping
            rawVideoSize: fbData.raw_size ? fbData.raw_size.replace(' MB', '') : "6.0",
            compressedVideoSize: fbData.compressed_size ? (parseFloat(fbData.compressed_size)/1024).toFixed(2) : "0.18",
            videoBandwidthSaved: numericSavings,
            transmissionStatus: "Streaming",
            optimizedStatus: "Edge Processed"
          });
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching telemetry:", error);
      }
    };

    // Poll the Firebase database every 2 seconds
    const interval = setInterval(fetchLiveSpaceData, 2000);
    fetchLiveSpaceData(); // Initial fetch
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <VideoCompressionSection data={data} loading={loading} />
      <TelemetrySection data={data} loading={loading} />
      <Footer />
    </div>
  );
};

export default Index;