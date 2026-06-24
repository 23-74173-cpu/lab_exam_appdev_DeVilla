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
  const isCorrectAnswer = index === correctAnswerIndex;
  const isSelected = index === selectedOption;

  let borderColor = ExamColors.border;
  let backgroundColor = 'transparent';
  let radioBorder = ExamColors.border;
  let showCheck: string | null = null;
  let opacity: number = 1;

  if (isAnswered) {
    if (isCorrectAnswer) {
      borderColor = ExamColors.correctFrame;
      backgroundColor = ExamColors.correctCanvas;
      radioBorder = ExamColors.correctFrame;
      showCheck = '✅';
    } else if (isSelected) {
      borderColor = ExamColors.incorrectFrame;
      backgroundColor = ExamColors.incorrectCanvas;
      radioBorder = ExamColors.incorrectFrame;
      showCheck = '❌';
    } else {
      opacity = 0.45;
    }
  }

  return (
    <TouchableOpacity
      style={[styles.option, { borderColor, backgroundColor, opacity }]}
      onPress={() => onSelect(index)}
      disabled={isAnswered}
      activeOpacity={0.7}
    >
      <View style={styles.row}>
        <View style={[styles.radio, { borderColor: radioBorder, backgroundColor: isSelected && !isAnswered ? ExamColors.primary : 'transparent' }]}>
          {isSelected && !isAnswered && <View style={styles.radioInner} />}
        </View>
        <Text style={[styles.optionText, { color: ExamColors.secondaryText }]}>
          {option}
        </Text>
      </View>
      {showCheck && <Text style={styles.badge}>{showCheck}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 12,
    minHeight: 56,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: ExamColors.primary,
  },
  optionText: {
    fontSize: 16,
    flex: 1,
    lineHeight: 24,
  },
  badge: {
    fontSize: 20,
    marginLeft: 8,
  },
});
