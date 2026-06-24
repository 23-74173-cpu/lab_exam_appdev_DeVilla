import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

import { ExamColors } from '@/constants/theme';
import type { QuizOptionProps } from '@/types/quiz';

export function QuizOption({
  option,
  index,
  selectedOption,
  correctAnswerIndex,
  isAnswered,
  onSelect,
}: QuizOptionProps) {
  const isSelected = index === selectedOption;
  const isCorrect = index === correctAnswerIndex;

  let borderColor = ExamColors.border;
  let bgColor = 'transparent';
  let showBadge: string | null = null;
  let dim = 1;

  if (isAnswered) {
    if (isCorrect) {
      borderColor = ExamColors.correctFrame;
      bgColor = ExamColors.correctCanvas;
      showBadge = '✅';
    } else if (isSelected) {
      borderColor = ExamColors.incorrectFrame;
      bgColor = ExamColors.incorrectCanvas;
      showBadge = '❌';
    } else {
      dim = 0.45;
    }
  } else if (isSelected) {
    borderColor = ExamColors.primary;
  }

  return (
    <TouchableOpacity
      style={[styles.option, { borderColor, backgroundColor: bgColor, opacity: dim }]}
      onPress={() => onSelect(index)}
      disabled={isAnswered}
      activeOpacity={0.7}
    >
      <View style={styles.row}>
        <Text style={[styles.optionText, { color: ExamColors.secondaryText }]}>
          {option}
        </Text>
        {showBadge && <Text style={styles.badge}>{showBadge}</Text>}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  option: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 12,
    minHeight: 56,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionText: {
    fontSize: 16,
    lineHeight: 24,
  },
  badge: {
    fontSize: 20,
    marginLeft: 8,
  },
});
