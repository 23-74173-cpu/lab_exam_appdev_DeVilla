import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { ExamColors } from '@/constants/theme';

interface ResultsScreenProps {
  score: number;
  total: number;
  onRestart: () => void;
}

export function ResultsScreen({ score, total, onRestart }: ResultsScreenProps) {
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;

  const feedback =
    pct < 50
      ? 'Review the core fundamentals and try again.'
      : "Great job! You've mastered this topic.";

  return (
    <View style={styles.container}>
      <Text style={styles.cap}>🎓</Text>

      <Text style={styles.heading}>Exam Results</Text>

      <Text style={styles.subtext}>
        Score: {score} / {total} Correct
      </Text>

      <Text style={styles.pct}>{pct}%</Text>

      <View style={styles.feedbackRow}>
        <Text style={styles.feedbackIcon}>📚</Text>
        <Text style={styles.feedbackText}>{feedback}</Text>
      </View>

      <TouchableOpacity style={styles.restartBtn} onPress={onRestart} activeOpacity={0.8}>
        <Text style={styles.restartIcon}>🔄</Text>
        <Text style={styles.restartLabel}>Restart Laboratory Exam</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 12,
    flex: 1,
  },
  cap: {
    fontSize: 64,
    marginBottom: 8,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: ExamColors.primaryText,
  },
  subtext: {
    fontSize: 16,
    color: ExamColors.mutedText,
    fontWeight: '500',
  },
  pct: {
    fontSize: 52,
    fontWeight: '800',
    color: ExamColors.primary,
    marginVertical: 8,
  },
  feedbackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  feedbackIcon: {
    fontSize: 18,
  },
  feedbackText: {
    fontSize: 15,
    color: ExamColors.secondaryText,
    fontWeight: '500',
    flexShrink: 1,
  },
  restartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: ExamColors.resetAction,
    alignSelf: 'stretch',
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
