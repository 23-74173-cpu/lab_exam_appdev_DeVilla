import { StyleSheet, View } from 'react-native';

import { ExamColors } from '@/constants/theme';

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = total > 0 ? ((current + 1) / total) * 100 : 0;

  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${pct}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 6,
    borderRadius: 3,
    backgroundColor: ExamColors.border,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: ExamColors.primary,
  },
});
