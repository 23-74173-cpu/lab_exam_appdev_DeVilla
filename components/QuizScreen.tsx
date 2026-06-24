import { useState, useCallback } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, ScrollView } from 'react-native';

import { ExamColors } from '@/constants/theme';
import type { Question } from '@/types/quiz';
import { QuizOption } from './QuizOption';
import { ProgressBar } from './ProgressBar';
import { ResultsScreen } from './ResultsScreen';

const MOCK_QUESTIONS: Question[] = [
  {
    id: 1,
    category: 'INTRODUCTION TO REACT NATIVE',
    question: 'How does React Native render user interface elements components on mobile devices?',
    options: [
      'It compiles entirely into a standard website embedded inside a WebView.',
      'It bridges JavaScript code to invoke native platform UI views.',
      'It bypasses mobile OS architectures and draws pixels directly via Canvas.',
      'It translates everything into C++ binary files before execution.',
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 2,
    category: 'SETUP & ENVIRONMENT',
    question: 'Which tool allows you to build and run React Native projects quickly without installing Android Studio or Xcode configurations locally?',
    options: [
      'Metro Bundler',
      'Expo Go',
      'React Native CLI',
      'Cocoapods',
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 3,
    category: 'CORE COMPONENTS',
    question: 'Which core React Native component maps directly to a native wrapper that displays plaintext on screen?',
    options: [
      '<View>',
      '<ScrollView>',
      '<Text>',
      '<SafeAreaView>',
    ],
    correctAnswerIndex: 2,
  },
  {
    id: 4,
    category: 'PROPS & CUSTOMIZATION',
    question: 'Which of the following best describes \'Props\' in React Native?',
    options: [
      'Data managed internally within a component that can change over time.',
      'Global application values that cannot be accessed by child components.',
      'Immutable configuration arguments passed down from parent to child components.',
      'Functions used exclusively to run network requests.',
    ],
    correctAnswerIndex: 2,
  },
  {
    id: 5,
    category: 'STATE MANAGEMENT',
    question: 'When dealing with local component state via the \'useState\' hook, what happens automatically when the state updater function is called?',
    options: [
      'The component triggers a re-render to update the user interface.',
      'The application completely restarts its bundle execution.',
      'The data is immediately stored permanently inside the device storage.',
      'The state freezes and becomes a read-only prop property.',
    ],
    correctAnswerIndex: 0,
  },
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
