export interface StateOptions {
  statusFontSize: string;
  statusColor: string;
  elementFontSize: string;
  elementColor: string;
  ok?: Status;
  scheduledDowntime?: Status;
  acknowledged?: Status;
  flapping?: Status;
  warning?: Status;
  unknown?: Status;
  critical?: Status;
  unreachable?: Status;
  down?: Status;
}

export interface Status {
  label: string;
  color: string;
}

export const defaultTextColor = '#c6d7d8';

export const stateColors: Status[] = [
  {
    color: '#5fc861',
    label: 'OK',
  },
  {
    color: '#0077a2',
    label: 'Scheduled downtime',
  },
  {
    color: '#703b84',
    label: 'Acknowledged',
  },
  {
    color: '#c69c6d',
    label: 'Flapping',
  },
  {
    color: '#f4b925',
    label: 'Warning',
  },
  {
    color: '#acacac',
    label: 'Unknown',
  },
  {
    color: '#f97878',
    label: 'Critical',
  },
  {
    color: '#e34849',
    label: 'Unreachable',
  },
  {
    color: '#bf3641',
    label: 'Down',
  },
];
