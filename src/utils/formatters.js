import { format, formatDistanceToNow } from 'date-fns';

export const formatNumber = (num) => {
  if (num === undefined || num === null) {
    return '0';
  }
  if (typeof num !== 'number') {
    num = Number(num);
  }
  if (isNaN(num)) {
    return '0';
  }
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B';
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  } else {
    return num.toString();
  }
};

export const formatDate = (dateString) => {
  if (!dateString) {
    return '';
  }
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return '';
  }
  const now = new Date();
  const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

  if (diffInDays < 1) {
    return formatDistanceToNow(date, { addSuffix: true });
  } else if (diffInDays < 7) {
    return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
  } else if (diffInDays < 365) {
    return format(date, 'MMM d, yyyy');
  } else {
    return format(date, 'MMM d, yyyy');
  }
};

export const formatViews = formatNumber;

export const formatTimestamp = formatDate;

export const formatDuration = (duration) => {
  if (!duration) return '00:00';
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return '00:00';
  const hours = (match[1] || '').replace('H', '');
  const minutes = (match[2] || '').replace('M', '');
  const seconds = (match[3] || '').replace('S', '');
  return `${hours ? hours + ':' : ''}${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
};
