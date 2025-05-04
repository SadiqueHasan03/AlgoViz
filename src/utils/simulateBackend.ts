
import { Quiz, QuizProgress } from "../types/quiz";
import { useAuth } from "@clerk/clerk-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

export const fetchQuizzes = async (): Promise<Quiz[]> => {
  const response = await fetch(`${API_BASE_URL}/api/quizzes`);
  if (!response.ok) throw new Error('Failed to fetch quizzes');
  return await response.json();
};

export const fetchQuizById = async (quizId: string): Promise<Quiz | null> => {
  const response = await fetch(`${API_BASE_URL}/api/quizzes/${quizId}`);
  if (!response.ok) return null;
  return await response.json();
};

export const saveQuizProgressToBackend = async (progress: QuizProgress): Promise<void> => {
  const { getToken } = useAuth();
  const token = await getToken();
  
  const response = await fetch(`${API_BASE_URL}/api/user/progress/${progress.quizId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(progress)
  });
  
  if (!response.ok) throw new Error('Failed to save progress');
};
