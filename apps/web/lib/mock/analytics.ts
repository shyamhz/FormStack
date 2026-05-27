export type TimeSeriesPoint = {
  date: string;
  responses: number;
  completions: number;
};

export type FunnelStep = {
  label: string;
  value: number;
  pct: number;
  dropOff?: number;
};

export type FieldStat = {
  id: string;
  label: string;
  type: string;
  completionPct: number;
  avgTimeSec: number;
  skipRate: number;
};

export type DeviceBreakdown = {
  label: string;
  pct: number;
};

export type TrafficSource = {
  label: string;
  pct: number;
  count: number;
};

// 30 days of time-series data
export const timeSeriesData: TimeSeriesPoint[] = [
  { date: 'Nov 7', responses: 4, completions: 3 },
  { date: 'Nov 8', responses: 7, completions: 5 },
  { date: 'Nov 9', responses: 5, completions: 4 },
  { date: 'Nov 10', responses: 9, completions: 7 },
  { date: 'Nov 11', responses: 6, completions: 5 },
  { date: 'Nov 12', responses: 11, completions: 9 },
  { date: 'Nov 13', responses: 8, completions: 6 },
  { date: 'Nov 14', responses: 14, completions: 11 },
  { date: 'Nov 15', responses: 10, completions: 8 },
  { date: 'Nov 16', responses: 7, completions: 6 },
  { date: 'Nov 17', responses: 12, completions: 9 },
  { date: 'Nov 18', responses: 15, completions: 12 },
  { date: 'Nov 19', responses: 9, completions: 7 },
  { date: 'Nov 20', responses: 13, completions: 10 },
  { date: 'Nov 21', responses: 18, completions: 14 },
  { date: 'Nov 22', responses: 11, completions: 9 },
  { date: 'Nov 23', responses: 7, completions: 5 },
  { date: 'Nov 24', responses: 5, completions: 4 },
  { date: 'Nov 25', responses: 16, completions: 13 },
  { date: 'Nov 26', responses: 21, completions: 17 },
  { date: 'Nov 27', responses: 14, completions: 11 },
  { date: 'Nov 28', responses: 9, completions: 7 },
  { date: 'Nov 29', responses: 12, completions: 10 },
  { date: 'Nov 30', responses: 19, completions: 15 },
  { date: 'Dec 1', responses: 23, completions: 18 },
  { date: 'Dec 2', responses: 17, completions: 14 },
  { date: 'Dec 3', responses: 22, completions: 17 },
  { date: 'Dec 4', responses: 28, completions: 22 },
  { date: 'Dec 5', responses: 19, completions: 15 },
  { date: 'Dec 6', responses: 11, completions: 9 },
];

export const funnelData: FunnelStep[] = [
  { label: 'Viewed', value: 3142, pct: 100 },
  { label: 'Started', value: 1847, pct: 58.8, dropOff: 41.2 },
  { label: 'Page 1', value: 1621, pct: 51.6, dropOff: 12.2 },
  { label: 'Page 2', value: 1502, pct: 47.8, dropOff: 7.3 },
  { label: 'Submitted', value: 1438, pct: 45.8, dropOff: 4.3 },
];

export const fieldStats: FieldStat[] = [
  { id: 'f1', label: 'How did you hear about us?', type: 'Select', completionPct: 98, avgTimeSec: 8, skipRate: 2 },
  { id: 'f2', label: 'Overall satisfaction', type: 'Rating', completionPct: 96, avgTimeSec: 12, skipRate: 4 },
  { id: 'f3', label: 'What do you use our product for?', type: 'Long text', completionPct: 84, avgTimeSec: 47, skipRate: 16 },
  { id: 'f4', label: 'Which features do you use most?', type: 'Checkbox', completionPct: 79, avgTimeSec: 18, skipRate: 21 },
  { id: 'f5', label: 'How likely are you to recommend us?', type: 'Rating', completionPct: 91, avgTimeSec: 9, skipRate: 9 },
  { id: 'f6', label: 'What could we improve?', type: 'Long text', completionPct: 72, avgTimeSec: 54, skipRate: 28 },
  { id: 'f7', label: 'Your role', type: 'Select', completionPct: 88, avgTimeSec: 7, skipRate: 12 },
  { id: 'f8', label: 'Company size', type: 'Select', completionPct: 85, avgTimeSec: 6, skipRate: 15 },
  { id: 'f9', label: 'Email address', type: 'Email', completionPct: 67, avgTimeSec: 14, skipRate: 33 },
  { id: 'f10', label: 'May we follow up?', type: 'Select', completionPct: 94, avgTimeSec: 5, skipRate: 6 },
];

export const deviceBreakdown: DeviceBreakdown[] = [
  { label: 'Desktop', pct: 64 },
  { label: 'Mobile', pct: 29 },
  { label: 'Tablet', pct: 7 },
];

export const trafficSources: TrafficSource[] = [
  { label: 'Direct', pct: 38, count: 547 },
  { label: 'Google Search', pct: 24, count: 346 },
  { label: 'Twitter / X', pct: 17, count: 245 },
  { label: 'Referral', pct: 13, count: 187 },
  { label: 'Other', pct: 8, count: 115 },
];

export const analyticsStats = {
  views: 3142,
  starts: 1847,
  completions: 1438,
  completionRate: 78,
  viewsDelta: 12.4,
  startsDelta: 8.1,
  completionsDelta: 6.3,
  rateDelta: -2.1,
};