import { useState, useCallback } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, ScrollView } from 'react-native';

import { ExamColors } from '@/constants/theme';
import type { Question } from '@/types/quiz';
import { QuizOption } from './QuizOption';
import { ProgressBar } from './ProgressBar';
import { ResultsScreen } from './ResultsScreen';

const MOCK_QUESTIONS: Question[] = [
  { id: 1, category: 'SETUP & ENVIRONMENT', question: '', options: ['', '', '', ''], correctAnswerIndex: 0 },
  { id: 2, category: 'SETUP & ENVIRONMENT', question: '', options: ['', '', '', ''], correctAnswerIndex: 0 },
  { id: 3, category: 'UI COMPONENTS', question: '', options: ['', '', '', ''], correctAnswerIndex: 0 },
  { id: 4, category: 'UI COMPONENTS', question: '', options: ['', '', '', ''], correctAnswerIndex: 0 },
  { id: 5, category: 'STATE MANAGEMENT', question: '', options: ['', '', '', ''], correctAnswerIndex: 0 },
];

export function QuizScreen() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isExamFinished, setIsExamFinished] = useState(false);

  const currentQuestion = MOCK_QUESTIONS[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === MOCK_QUESTIONS.length - 1;
  const canProceed = selectedOption !== null;

  const handleSelect = useCallback((index: number) => {
    setSelectedOption(index);
  }, []);

  const handleProceed = useCallback(() => {
    if (selectedOption !== null) {
      setScore((prev) => prev + 1);
    }

    if (isLastQuestion) {
      setIsExamFinished(true);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
    }
  }, [selectedOption, isLastQuestion]);

  const handleRestart = useCallback(() => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setIsExamFinished(false);
  }, []);

  if (isExamFinished) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <ResultsScreen
            score={score}
            total={MOCK_QUESTIONS.length}
            onRestart={handleRestart}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.category}>{currentQuestion.category}</Text>
        </View>

        <Text style={styles.meta}>
          Question {currentQuestionIndex + 1} of {MOCK_QUESTIONS.length}
        </Text>

        <ProgressBar current={currentQuestionIndex} total={MOCK_QUESTIONS.length} />

        <View style={styles.questionSection} />

        <View style={styles.optionsSection}>
          {currentQuestion.options.map((option, idx) => (
            <QuizOption
              key={idx}
              option={option}
              index={idx}
              selectedOption={selectedOption}
              onSelect={handleSelect}
            />
          ))}
        </View>

        <TouchableOpacity
          style={[styles.proceedBtn, !canProceed && styles.proceedBtnDisabled]}
          onPress={handleProceed}
          disabled={!canProceed}
          activeOpacity={0.8}
        >
          <Text style={[styles.proceedLabel, !canProceed && styles.proceedLabelDisabled]}>
            {isLastQuestion ? 'View Results' : 'Proceed to Next Question'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: ExamColors.background,
  },
  scrollContent: {
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  category: {
    fontSize: 13,
    fontWeight: '700',
    color: ExamColors.primary,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  meta: {
    fontSize: 14,
    fontWeight: '500',
    color: ExamColors.mutedText,
    marginBottom: 8,
  },
  questionSection: {
    paddingVertical: 24,
  },
  questionText: {
    fontSize: 20,
    fontWeight: '700',
    color: ExamColors.primaryText,
    lineHeight: 30,
  },
  optionsSection: {
    marginBottom: 24,
  },
  proceedBtn: {
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: ExamColors.primary,
    alignItems: 'center',
  },
  proceedBtnDisabled: {
    backgroundColor: ExamColors.disabled,
  },
  proceedLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  proceedLabelDisabled: {
    color: '#FFFFFF',
  },
});
