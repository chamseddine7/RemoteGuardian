"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BatteryFull, HardDrive, Wifi, SignalHigh, Smartphone, Thermometer, Cpu } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface DeviceMetric {
  label: string;
  value: string | number;
  unit?: string;
  icon: React.ElementType;
  progress?: number; // Optional progress value (0-100)
  variant?: 'default' | 'warning' | 'critical';
}

const initialMetrics: DeviceMetric[] = [
    { label: 'Device Model', value: 'Pixel 8 Pro (Target)', icon: Smartphone },
    { label: 'Battery Level', value: 75, unit: '%', icon: BatteryFull, progress: 75 },
    { label: 'Storage Used', value: '68 GB / 128 GB', icon: HardDrive, progress: 53 },
    { label: 'Network Status', value: 'Wi-Fi', icon: Wifi },
    { label: 'Signal Strength', value: 'Strong', icon: SignalHigh, progress: 90 },
    { label: 'CPU Temperature', value: 42, unit: '°C', icon: Thermometer, progress: 42},
    { label: 'CPU Usage', value: 35, unit: '%', icon: Cpu, progress: 35},
];

const getProgressColor = (variant?: 'default' | 'warning' | 'critical') => {
  if (variant === 'critical') return 'bg-destructive';
  if (variant === 'warning') return 'bg-yellow-500';
  return 'bg-primary';
}

const MetricDisplayCard: React.FC<{metric: DeviceMetric}> = React.memo(({ metric }) => (
  <Card className="hover:shadow-md transition-shadow">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
      <metric.icon className={`h-5 w-5 ${metric.variant === 'critical' ? 'text-destructive' : metric.variant === 'warning' ? 'text-yellow-500' : 'text-muted-foreground'}`} />
    </CardHeader>
    <CardContent>
      <div className={`text-2xl font-bold ${metric.variant === 'critical' ? 'text-destructive' : metric.variant === 'warning' ? 'text-yellow-500' : ''}`}>
        {metric.value}{metric.unit}
      </div>
      {metric.progress !== undefined && (
        <Progress value={metric.progress} className="h-2 mt-2" indicatorClassName={getProgressColor(metric.variant)} aria-label={`${metric.label} ${metric.progress}%`} />
      )}
    </CardContent>
  </Card>
));
MetricDisplayCard.displayName = 'MetricDisplayCard';


export function DeviceMonitorComponent() {
  const [metrics, setMetrics] = useState<DeviceMetric[]>(initialMetrics);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prevMetrics =>
        prevMetrics.map(metric => {
          if (metric.label === 'Battery Level') {
            const newValue = Math.max(0, (metric.value as number) - 1 + Math.floor(Math.random() * 3)); // Simulate usage and charging
            return { ...metric, value: newValue, progress: newValue, variant: newValue < 20 ? 'critical' : newValue < 50 ? 'warning' : 'default' };
          }
          if (metric.label === 'CPU Usage') {
            const newValue = Math.min(100, Math.max(10, (metric.value as number) + (Math.random() * 10 - 5)));
            return { ...metric, value: Math.round(newValue), progress: Math.round(newValue), variant: newValue > 85 ? 'critical' : newValue > 60 ? 'warning' : 'default' };
          }
          if (metric.label === 'CPU Temperature') {
             const newValue = Math.min(90, Math.max(30, (metric.value as number) + (Math.random() * 4 - 2)));
             return { ...metric, value: Math.round(newValue), progress: Math.round(newValue), variant: newValue > 75 ? 'critical' : newValue > 60 ? 'warning' : 'default' };
          }
          return metric;
        })
      );
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl">Real-time Device Status</CardTitle>
        <CardDescription>Live metrics from the connected target device.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {metrics.map((metric) => (
            <MetricDisplayCard key={metric.label} metric={metric} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
