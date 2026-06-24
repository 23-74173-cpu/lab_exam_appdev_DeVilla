import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';

import { ExamColors } from '@/constants/theme';
import type { QuizOptionProps } from '@/types/quiz';

export function QuizOption({
  option,
  index,
  selectedOption,
  onSelect,
}: QuizOptionProps) {
  const isSelected = index === selectedOption;

  return (
    <TouchableOpacity
      style={[styles.option, { borderColor: isSelected ? ExamColors.primary : ExamColors.border }]}
      onPress={() => onSelect(index)}
      activeOpacity={0.7}
    >
      <View style={styles.row}>
        <View style={[styles.radio, { borderColor: isSelected ? ExamColors.primary : ExamColors.border }]}>
          {isSelected && <View style={styles.radioInner} />}
        </View>
        <Text style={[styles.optionText, { color: ExamColors.secondaryText }]}>
          {option}
        </Text>
      </View>
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
