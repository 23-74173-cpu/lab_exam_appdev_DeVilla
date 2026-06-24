export interface Question {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface QuizOptionProps {
  option: string;
  index: number;
  selectedOption: number | null;
  onSelect: (index: number) => void;
}
