import { useState, useEffect, useCallback } from 'react';

export interface SatelliteData {
  rawVideoSize: number;
  compressedVideoSize: number;
  rawTelemetry: string;
  filteredTelemetry: string;
  videoBandwidthSaved: number;
  telemetryBandwidthSaved: number;
  rawTelemetrySize: number;
  filteredTelemetrySize: number;
  transmissionStatus: 'active' | 'buffering' | 'complete';
  optimizedStatus: 'optimized' | 'processing' | 'transmitting';
}

const RAW_TELEMETRY_LINES = [
  '[2026-02-21T08:12:01Z] SENSOR_TEMP: 42.3°C | STATUS: NOMINAL',
  '[2026-02-21T08:12:01Z] GYRO_X: 0.0012 rad/s | GYRO_Y: -0.0003 rad/s | GYRO_Z: 0.0001 rad/s',
  '[2026-02-21T08:12:02Z] SOLAR_PANEL_V: 28.4V | CURRENT: 3.2A | POWER: 90.88W',
  '[2026-02-21T08:12:02Z] BATTERY_LEVEL: 87% | CHARGE_RATE: 0.4A',
  '[2026-02-21T08:12:03Z] ORBIT_ALT: 542.3km | VELOCITY: 7.62 km/s | INCLINATION: 97.4°',
  '[2026-02-21T08:12:03Z] MAGNETOMETER: X=0.23 Y=-0.11 Z=0.45 Gauss',
  '[2026-02-21T08:12:04Z] THERMAL_RADIATOR: 18.7°C | HEATER: OFF',
  '[2026-02-21T08:12:04Z] STAR_TRACKER: LOCKED | ATTITUDE: STABLE',
  '[2026-02-21T08:12:05Z] ⚠ ANOMALY: SENSOR_TEMP exceeding threshold → 72.8°C',
  '[2026-02-21T08:12:05Z] COMM_LINK: DOWNLINK 2.4Mbps | UPLINK 256Kbps | SNR: 12.3dB',
  '[2026-02-21T08:12:06Z] PAYLOAD_CAM: ACTIVE | RESOLUTION: 4K | FPS: 30',
  '[2026-02-21T08:12:06Z] GPS_FIX: LAT 34.052 | LON -118.244 | SAT_COUNT: 8',
  '[2026-02-21T08:12:07Z] REACTION_WHEEL_1: 2400 RPM | WHEEL_2: -1800 RPM',
  '[2026-02-21T08:12:07Z] ⚠ ANOMALY: BATTERY_LEVEL dropping rapidly → 62%',
  '[2026-02-21T08:12:08Z] PROPULSION: IDLE | FUEL_REMAINING: 12.4kg',
  '[2026-02-21T08:12:08Z] RADIATION_DOSE: 0.034 mSv/hr | WITHIN LIMITS',
];

const FILTERED_TELEMETRY_LINES = [
  '[CRITICAL] SENSOR_TEMP: 72.8°C → EXCEEDS THRESHOLD (MAX: 65°C)',
  '[CRITICAL] BATTERY_LEVEL: 62% → RAPID DISCHARGE DETECTED',
  '[WARNING] COMM_LINK SNR: 12.3dB → APPROACHING MINIMUM (10dB)',
  '[ALERT] ORBIT_ALT: 542.3km → DECAY RATE: 0.02km/day',
  '[INFO] PAYLOAD_CAM: ACTIVE → 4K STREAM CONSUMING HIGH BANDWIDTH',
];

function generateData(): SatelliteData {
  const rawSize = 245 + Math.random() * 30;
  const compressedSize = 18 + Math.random() * 8;
  const rawTelSize = 4.2 + Math.random() * 0.5;
  const filtTelSize = 0.8 + Math.random() * 0.3;

  return {
    rawVideoSize: Math.round(rawSize * 10) / 10,
    compressedVideoSize: Math.round(compressedSize * 10) / 10,
    rawTelemetry: RAW_TELEMETRY_LINES.join('\n'),
    filteredTelemetry: FILTERED_TELEMETRY_LINES.join('\n'),
    videoBandwidthSaved: Math.round(((rawSize - compressedSize) / rawSize) * 1000) / 10,
    telemetryBandwidthSaved: Math.round(((rawTelSize - filtTelSize) / rawTelSize) * 1000) / 10,
    rawTelemetrySize: Math.round(rawTelSize * 10) / 10,
    filteredTelemetrySize: Math.round(filtTelSize * 10) / 10,
    transmissionStatus: 'active',
    optimizedStatus: 'optimized',
  };
}

export function useSatelliteData(apiUrl?: string) {
  const [data, setData] = useState<SatelliteData>(generateData());
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    if (apiUrl) {
      setLoading(true);
      try {
        const res = await fetch(apiUrl);
        const json = await res.json();
        setData(json);
      } catch {
        // Fallback to simulated data
        setData(generateData());
      } finally {
        setLoading(false);
      }
    } else {
      setData(generateData());
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 4000);
    return () => clearInterval(interval);
  }, [fetchData]);

  return { data, loading };
}
