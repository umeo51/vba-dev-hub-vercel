'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface QuizQuestion {
  id: number;
  question: string;
  code?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: '次のコードの出力は何ですか？',
    code: `Dim x As Integer
x = 5
Debug.Print x * 2`,
    options: ['5', '10', '25', 'エラー'],
    correctAnswer: 1,
    explanation: 'x = 5なので、x * 2 = 10です。',
    difficulty: 'beginner',
    category: '基本構文'
  },
  {
    id: 2,
    question: 'VBAで文字列を結合する演算子はどれですか？',
    options: ['+', '&', '*', '||'],
    correctAnswer: 1,
    explanation: 'VBAでは&演算子を使って文字列を結合します。+も使えますが、&が推奨されます。',
    difficulty: 'beginner',
    category: '演算子'
  },
  {
    id: 3,
    question: '次のコードで何が起こりますか？',
    code: `Dim arr(3) As Integer
arr(0) = 10
arr(1) = 20
arr(2) = 30
Debug.Print arr(3)`,
    options: ['10', '30', '0', 'エラー'],
    correctAnswer: 2,
    explanation: '配列arr(3)は宣言されていますが、値が代入されていないため、初期値の0が出力されます。',
    difficulty: 'beginner',
    category: '配列'
  },
  {
    id: 4,
    question: 'オブジェクト変数に値を代入する際に使用するキーワードは？',
    options: ['Let', 'Set', 'Dim', 'Assign'],
    correctAnswer: 1,
    explanation: 'オブジェクト変数への代入にはSetキーワードを使用します。',
    difficulty: 'beginner',
    category: 'オブジェクト'
  },
  {
    id: 5,
    question: '次のコードの出力は何ですか？',
    code: `Dim str As String
str = "Hello World"
Debug.Print Len(str)`,
    options: ['10', '11', '12', 'エラー'],
    correctAnswer: 1,
    explanation: '"Hello World"は11文字（スペースを含む）です。',
    difficulty: 'beginner',
    category: '文字列'
  },
  {
    id: 6,
    question: 'For Eachループで使用できるのはどれですか？',
    options: ['配列', 'コレクション', '範囲（Range）', 'すべて'],
    correctAnswer: 3,
    explanation: 'For Eachループは配列、コレクション、範囲など、反復可能なオブジェクトすべてに使用できます。',
    difficulty: 'intermediate',
    category: 'ループ'
  },
  {
    id: 7,
    question: '次のコードの結果は？',
    code: `Dim result As Boolean
result = (5 > 3) And (10 < 8)
Debug.Print result`,
    options: ['True', 'False', '1', 'エラー'],
    correctAnswer: 1,
    explanation: '(5 > 3)はTrueですが、(10 < 8)はFalseです。And演算子は両方がTrueの場合のみTrueを返すため、結果はFalseです。',
    difficulty: 'intermediate',
    category: '論理演算'
  },
  {
    id: 8,
    question: 'エラーハンドリングで、エラーを無視して次の行に進むステートメントは？',
    options: ['On Error GoTo 0', 'On Error Resume Next', 'On Error GoTo ErrorHandler', 'Resume Next'],
    correctAnswer: 1,
    explanation: '"On Error Resume Next"はエラーが発生しても処理を続行します。',
    difficulty: 'intermediate',
    category: 'エラー処理'
  },
  {
    id: 9,
    question: '次のコードの出力は？',
    code: `Dim x As Variant
x = Array(1, 2, 3, 4, 5)
Debug.Print UBound(x) - LBound(x) + 1`,
    options: ['4', '5', '6', 'エラー'],
    correctAnswer: 1,
    explanation: 'Array関数で作成された配列のインデックスは0から始まります。UBound(x)=4, LBound(x)=0なので、4-0+1=5です。',
    difficulty: 'intermediate',
    category: '配列'
  },
  {
    id: 10,
    question: 'ByValとByRefの違いは何ですか？',
    options: [
      'ByValは値渡し、ByRefは参照渡し',
      'ByValは参照渡し、ByRefは値渡し',
      '違いはない',
      'ByValは高速、ByRefは低速'
    ],
    correctAnswer: 0,
    explanation: 'ByValは値のコピーを渡し、ByRefは変数への参照を渡します。ByRefでは元の変数が変更される可能性があります。',
    difficulty: 'intermediate',
    category: 'プロシージャ'
  },
  {
    id: 11,
    question: '次のコードで何が起こりますか？',
    code: `Dim dict As Object
Set dict = CreateObject("Scripting.Dictionary")
dict.Add "key1", "value1"
dict.Add "key1", "value2"`,
    options: ['value1が保存される', 'value2が保存される', 'エラーが発生する', '両方保存される'],
    correctAnswer: 2,
    explanation: 'Dictionaryでは同じキーを重複して追加できません。エラーが発生します。',
    difficulty: 'advanced',
    category: 'コレクション'
  },
  {
    id: 12,
    question: 'Late BindingとEarly Bindingの違いは？',
    options: [
      'Late Bindingは実行時に型を解決、Early Bindingはコンパイル時',
      'Late Bindingは高速、Early Bindingは低速',
      '違いはない',
      'Late Bindingは参照設定が必要'
    ],
    correctAnswer: 0,
    explanation: 'Late Bindingは実行時に型を解決し、参照設定が不要です。Early Bindingはコンパイル時に型を解決し、IntelliSenseが使えます。',
    difficulty: 'advanced',
    category: 'オブジェクト'
  },
  {
    id: 13,
    question: '次のコードの出力は？',
    code: `Function Test(ByRef x As Integer) As Integer
    x = x + 1
    Test = x
End Function

Sub Main()
    Dim num As Integer
    num = 5
    Debug.Print Test(num)
    Debug.Print num
End Sub`,
    options: ['6, 5', '6, 6', '5, 6', 'エラー'],
    correctAnswer: 1,
    explanation: 'ByRefで渡されているため、関数内でxを変更するとnumも変更されます。両方とも6が出力されます。',
    difficulty: 'advanced',
    category: 'プロシージャ'
  },
  {
    id: 14,
    question: 'Application.ScreenUpdatingをFalseにする目的は？',
    options: [
      'エラーを防ぐ',
      '処理速度を向上させる',
      'メモリを節約する',
      'ファイルサイズを削減する'
    ],
    correctAnswer: 1,
    explanation: 'ScreenUpdatingをFalseにすると、画面の更新が停止され、処理速度が大幅に向上します。',
    difficulty: 'intermediate',
    category: '最適化'
  },
  {
    id: 15,
    question: '次のコードの問題点は？',
    code: `Dim i As Integer
For i = 1 To 100000
    Debug.Print i
Next i`,
    options: [
      'Integerの範囲を超える',
      'ループが遅い',
      'Debug.Printが多すぎる',
      'すべて'
    ],
    correctAnswer: 3,
    explanation: 'IntegerはVBAでは-32,768から32,767の範囲なので100,000は範囲外です。また、Debug.Printを大量に実行すると非常に遅くなります。',
    difficulty: 'advanced',
    category: 'パフォーマンス'
  }
];

const difficulties = ['すべて', 'beginner', 'intermediate', 'advanced'];
const difficultyLabels: { [key: string]: string } = {
  'beginner': '初級',
  'intermediate': '中級',
  'advanced': '上級'
};

export default function QuizPage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState('すべて');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const filteredQuestions = quizQuestions.filter(q => 
    selectedDifficulty === 'すべて' || q.difficulty === selectedDifficulty
  );

  const currentQuestion = filteredQuestions[currentQuestionIndex];

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setAnsweredQuestions([]);
    setQuizCompleted(false);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    setShowExplanation(true);
    
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
    
    setAnsweredQuestions([...answeredQuestions, currentQuestion.id]);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const getAnswerClass = (index: number) => {
    if (!showExplanation) {
      return selectedAnswer === index 
        ? 'border-blue-500 bg-blue-50' 
        : 'border-gray-300 hover:border-blue-300';
    }
    
    if (index === currentQuestion.correctAnswer) {
      return 'border-green-500 bg-green-50';
    }
    
    if (selectedAnswer === index && index !== currentQuestion.correctAnswer) {
      return 'border-red-500 bg-red-50';
    }
    
    return 'border-gray-300';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              VBA Dev Hub
            </Link>
            <nav className="flex gap-6">
              <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                ホーム
              </Link>
              <Link href="/tools" className="text-gray-600 hover:text-blue-600 transition-colors">
                ツール
              </Link>
              <Link href="/snippets" className="text-gray-600 hover:text-blue-600 transition-colors">
                スニペット
              </Link>
              <Link href="/errors" className="text-gray-600 hover:text-blue-600 transition-colors">
                エラー辞典
              </Link>
              <Link href="/references" className="text-gray-600 hover:text-blue-600 transition-colors">
                リファレンス
              </Link>
              <Link href="/functions" className="text-gray-600 hover:text-blue-600 transition-colors">
                関数解説
              </Link>
              <Link href="/quiz" className="text-blue-600 font-semibold">
                クイズ
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
            VBAクイズ・練習問題
          </h1>
          <p className="text-gray-600 text-lg">
            VBAの知識を試して、スキルアップを目指しましょう
          </p>
        </div>

        {!quizStarted ? (
          // Quiz Start Screen
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">クイズを始める</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  難易度を選択
                </label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                >
                  {difficulties.map(difficulty => (
                    <option key={difficulty} value={difficulty}>
                      {difficulty === 'すべて' ? 'すべて' : difficultyLabels[difficulty]}
                    </option>
                  ))}
                </select>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-700">
                  <strong>問題数:</strong> {filteredQuestions.length}問
                </p>
                <p className="text-sm text-gray-700 mt-2">
                  各問題に対して4つの選択肢から正解を選んでください。
                  回答後に解説が表示されます。
                </p>
              </div>

              <button
                onClick={startQuiz}
                className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                クイズを開始
              </button>
            </div>
          </div>
        ) : quizCompleted ? (
          // Quiz Completed Screen
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">クイズ完了！</h2>
              
              <div className="my-8">
                <div className="text-6xl font-bold text-yellow-600 mb-2">
                  {score} / {filteredQuestions.length}
                </div>
                <p className="text-gray-600">正解数</p>
              </div>

              <div className="mb-6">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 h-4 rounded-full transition-all"
                    style={{ width: `${(score / filteredQuestions.length) * 100}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  正解率: {Math.round((score / filteredQuestions.length) * 100)}%
                </p>
              </div>

              <div className="mb-6">
                {score === filteredQuestions.length && (
                  <p className="text-lg text-green-600 font-semibold">
                    🎉 完璧です！素晴らしい！
                  </p>
                )}
                {score >= filteredQuestions.length * 0.8 && score < filteredQuestions.length && (
                  <p className="text-lg text-blue-600 font-semibold">
                    👏 よくできました！
                  </p>
                )}
                {score >= filteredQuestions.length * 0.5 && score < filteredQuestions.length * 0.8 && (
                  <p className="text-lg text-yellow-600 font-semibold">
                    👍 もう少しです！
                  </p>
                )}
                {score < filteredQuestions.length * 0.5 && (
                  <p className="text-lg text-orange-600 font-semibold">
                    💪 もう一度チャレンジしてみましょう！
                  </p>
                )}
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={startQuiz}
                  className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  もう一度挑戦
                </button>
                <Link
                  href="/"
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all"
                >
                  ホームに戻る
                </Link>
              </div>
            </div>
          </div>
        ) : (
          // Quiz Question Screen
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              {/* Progress */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">
                    問題 {currentQuestionIndex + 1} / {filteredQuestions.length}
                  </span>
                  <span className="text-sm text-gray-600">
                    スコア: {score} / {answeredQuestions.length}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full transition-all"
                    style={{ width: `${((currentQuestionIndex + 1) / filteredQuestions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    currentQuestion.difficulty === 'beginner' ? 'bg-blue-100 text-blue-700' :
                    currentQuestion.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {difficultyLabels[currentQuestion.difficulty]}
                  </span>
                  <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                    {currentQuestion.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-4">{currentQuestion.question}</h3>
                
                {currentQuestion.code && (
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm mb-4">
                    <code>{currentQuestion.code}</code>
                  </pre>
                )}
              </div>

              {/* Options */}
              <div className="space-y-3 mb-6">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showExplanation}
                    className={`w-full text-left p-4 border-2 rounded-lg transition-all ${getAnswerClass(index)} ${
                      showExplanation ? 'cursor-not-allowed' : 'cursor-pointer'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-current flex items-center justify-center font-semibold">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span>{option}</span>
                      {showExplanation && index === currentQuestion.correctAnswer && (
                        <span className="ml-auto text-green-600">✓</span>
                      )}
                      {showExplanation && selectedAnswer === index && index !== currentQuestion.correctAnswer && (
                        <span className="ml-auto text-red-600">✗</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Explanation */}
              {showExplanation && (
                <div className={`p-4 rounded-lg mb-6 ${
                  selectedAnswer === currentQuestion.correctAnswer 
                    ? 'bg-green-50 border border-green-200' 
                    : 'bg-red-50 border border-red-200'
                }`}>
                  <h4 className="font-semibold mb-2">
                    {selectedAnswer === currentQuestion.correctAnswer ? '✓ 正解！' : '✗ 不正解'}
                  </h4>
                  <p className="text-sm text-gray-700">{currentQuestion.explanation}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4">
                {!showExplanation ? (
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={selectedAnswer === null}
                    className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                      selectedAnswer === null
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:shadow-lg'
                    }`}
                  >
                    回答する
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="flex-1 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    {currentQuestionIndex < filteredQuestions.length - 1 ? '次の問題へ' : '結果を見る'}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
