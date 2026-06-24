import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { ExamColors } from '@/constants/theme';

interface ResultsScreenProps {
  score: number;
  total: number;
  onRestart: () => void;
}

export function ResultsScreen({ score, total, onRestart }: ResultsScreenProps) {
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.cap}>🎓</Text>
      <Text style={styles.heading}>Exam Complete</Text>
      <Text style={styles.score}>
        {score} / {total}
      </Text>
      <Text style={styles.pct}>{pct}%</Text>
      <TouchableOpacity style={styles.restartBtn} onPress={onRestart} activeOpacity={0.8}>
        <Text style={styles.restartIcon}>🔄</Text>
        <Text style={styles.restartLabel}>Restart Exam</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    gap: 12,
  },
  cap: {
    fontSize: 64,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: ExamColors.primaryText,
  },
  score: {
    fontSize: 52,
    fontWeight: '800',
    color: ExamColors.primary,
  },
  pct: {
    fontSize: 20,
    fontWeight: '600',
    color: ExamColors.secondaryText,
    marginBottom: 16,
  },
  restartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    backgroundColor: ExamColors.resetAction,
  },
  restartIcon: {
    fontSize: 18,
  },
  restartLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
