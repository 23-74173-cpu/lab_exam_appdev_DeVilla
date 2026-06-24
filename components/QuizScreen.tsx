import { useState, useEffect, useCallback, useRef } from 'react';
import { StyleSheet, SafeAreaView, View, Text, TouchableOpacity, ScrollView } from 'react-native';

import { ExamColors } from '@/constants/theme';
import type { Question } from '@/types/quiz';
import { QuizOption } from './QuizOption';
import { ProgressBar } from './ProgressBar';
import { ResultsScreen } from './ResultsScreen';

const MOCK_QUESTIONS: Question[] = [
  {
    id: 1,
    category: 'SETUP & ENVIRONMENT',
    question: 'Which command initializes a new React Native project with Expo?',
    options: [
      'npx react-native init MyApp',
      'npx create-expo-app MyApp',
      'npx expo init MyApp',
      'npm start MyApp',
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 2,
    category: 'SETUP & ENVIRONMENT',
    question: 'What is the primary purpose of App.js in an Expo project?',
    options: [
      'To configure the database connection',
      'To serve as the root component of the application',
      'To manage API routes',
      'To define the color theme',
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 3,
    category: 'UI COMPONENTS',
    question: 'Which React Native component is used to render a pressable button?',
    options: [
      '<Button>',
      '<Pressable>',
      '<TouchableOpacity>',
      'All of the above',
    ],
    correctAnswerIndex: 3,
  },
  {
    id: 4,
    category: 'UI COMPONENTS',
    question: 'Which prop is used to style a component in React Native?',
    options: [
      'className',
      'style',
      'css',
      'design',
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 5,
    category: 'STATE MANAGEMENT',
    question: 'Which React hook is used to manage state in a functional component?',
    options: [
      'useEffect',
      'useState',
      'useContext',
      'useReducer',
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 6,
    category: 'STATE MANAGEMENT',
    question: 'What does the dependency array in useEffect control?',
    options: [
      'The order of state updates',
      'When the effect re-runs',
      'The return value of the effect',
      'The initial state value',
    ],
    correctAnswerIndex: 1,
  },
];

const TIMER_DURATION = 20;

export function QuizScreen() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [isExamFinished, setIsExamFinished] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentQuestion = MOCK_QUESTIONS[currentQuestionIndex];
  const isAnswered = selectedOption !== null || timeLeft === 0;
  const isLastQuestion = currentQuestionIndex === MOCK_QUESTIONS.length - 1;
  const canProceed = selectedOption !== null || timeLeft === 0;

  useEffect(() => {
    if (isExamFinished) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentQuestionIndex, isExamFinished]);

  const handleSelect = useCallback((index: number) => {
    if (!isAnswered) {
      setSelectedOption(index);
    }
  }, [isAnswered]);

  const handleProceed = useCallback(() => {
    if (selectedOption !== null && selectedOption === currentQuestion.correctAnswerIndex) {
      setScore((prev) => prev + 1);
    }

    if (isLastQuestion) {
      setIsExamFinished(true);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setTimeLeft(TIMER_DURATION);
    }
  }, [selectedOption, currentQuestion, isLastQuestion]);

  const handleRestart = useCallback(() => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setTimeLeft(TIMER_DURATION);
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
          <View style={styles.timerRow}>
            <Text style={[styles.timerIcon]}>⏱️</Text>
            <Text style={[styles.timerValue, timeLeft <= 5 && styles.timerUrgent]}>
              {timeLeft}s
            </Text>
          </View>
        </View>

        <Text style={styles.meta}>
          Question {currentQuestionIndex + 1} of {MOCK_QUESTIONS.length}
        </Text>

        <ProgressBar current={currentQuestionIndex} total={MOCK_QUESTIONS.length} />

        <View style={styles.questionSection}>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
        </View>

        <View style={styles.optionsSection}>
          {currentQuestion.options.map((option, idx) => (
            <QuizOption
              key={idx}
              option={option}
              index={idx}
              selectedOption={selectedOption}
              correctAnswerIndex={currentQuestion.correctAnswerIndex}
              isAnswered={isAnswered}
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
  timerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  timerIcon: {
    fontSize: 20,
  },
  timerValue: {
    fontSize: 22,
    fontWeight: '700',
    color: ExamColors.primaryText,
    fontVariant: ['tabular-nums'],
  },
  timerUrgent: {
    color: ExamColors.incorrectFrame,
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
