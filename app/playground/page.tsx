'use client';

import { useState, useCallback } from 'react';
import Header from '@/components/Header';
import { Play, RotateCcw, Download, Upload } from 'lucide-react';

interface Cell {
  value: string;
  formula?: string;
}

type Spreadsheet = Cell[][];

export default function PlaygroundPage() {
  const ROWS = 20;
  const COLS = 10;
  
  const [spreadsheet, setSpreadsheet] = useState<Spreadsheet>(() =>
    Array(ROWS).fill(null).map(() => 
      Array(COLS).fill(null).map(() => ({ value: '' }))
    )
  );
  
  const [selectedCell, setSelectedCell] = useState<{row: number, col: number} | null>(null);
  const [vbaCode, setVbaCode] = useState(`Sub Example()
    ' VBAコードをここに書いてください
    Range("A1").Value = "Hello, VBA!"
    Range("B1").Value = 123
    MsgBox "実行完了！"
End Sub`);
  
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const getColumnLabel = (col: number) => {
    return String.fromCharCode(65 + col); // A, B, C...
  };

  const handleCellClick = (row: number, col: number) => {
    setSelectedCell({ row, col });
  };

  const handleCellChange = (row: number, col: number, value: string) => {
    const newSpreadsheet = spreadsheet.map((r, i) =>
      r.map((c, j) => (i === row && j === col ? { ...c, value } : c))
    );
    setSpreadsheet(newSpreadsheet);
  };

  const handleReset = () => {
    setSpreadsheet(
      Array(ROWS).fill(null).map(() => 
        Array(COLS).fill(null).map(() => ({ value: '' }))
      )
    );
    setOutput([]);
    setSelectedCell(null);
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput(['実行中...']);
    
    try {
      // TODO: VBA実行エンジンの実装
      // 現在はダミー実装
      await new Promise(resolve => setTimeout(resolve, 500));
      setOutput([
        '実行開始',
        'Sub Example() を実行中...',
        'A1 に "Hello, VBA!" を設定',
        'B1 に 123 を設定',
        'MsgBox: 実行完了！',
        '実行完了'
      ]);
      
      // ダミーデータを設定
      const newSpreadsheet = [...spreadsheet];
      newSpreadsheet[0][0] = { value: 'Hello, VBA!' };
      newSpreadsheet[0][1] = { value: '123' };
      setSpreadsheet(newSpreadsheet);
      
    } catch (error) {
      setOutput(['エラー: ' + (error as Error).message]);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            VBA Playground
          </h1>
          <p className="text-gray-600">
            ブラウザ上でVBAコードを書いて、すぐに実行・テストできる環境
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* コードエディタ */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">VBAコード</h2>
              <div className="flex gap-2">
                <button
                  onClick={handleRunCode}
                  disabled={isRunning}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <Play size={16} />
                  実行
                </button>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all"
                >
                  <RotateCcw size={16} />
                  リセット
                </button>
              </div>
            </div>
            
            <textarea
              value={vbaCode}
              onChange={(e) => setVbaCode(e.target.value)}
              className="w-full h-96 font-mono text-sm p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              spellCheck={false}
            />
            
            {/* 出力ログ */}
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">実行ログ</h3>
              <div className="bg-gray-900 text-green-400 font-mono text-xs p-4 rounded-lg h-32 overflow-y-auto">
                {output.map((line, i) => (
                  <div key={i}>&gt; {line}</div>
                ))}
              </div>
            </div>
          </div>

          {/* スプレッドシート */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">スプレッドシート</h2>
            
            <div className="overflow-auto border border-gray-300 rounded-lg">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="bg-gray-100 border border-gray-300 p-2 text-xs font-semibold text-gray-600 w-12"></th>
                    {Array.from({ length: COLS }, (_, i) => (
                      <th key={i} className="bg-gray-100 border border-gray-300 p-2 text-xs font-semibold text-gray-600 min-w-[80px]">
                        {getColumnLabel(i)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {spreadsheet.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      <td className="bg-gray-100 border border-gray-300 p-2 text-xs font-semibold text-gray-600 text-center">
                        {rowIndex + 1}
                      </td>
                      {row.map((cell, colIndex) => (
                        <td
                          key={colIndex}
                          className={`border border-gray-300 p-0 ${
                            selectedCell?.row === rowIndex && selectedCell?.col === colIndex
                              ? 'ring-2 ring-blue-500'
                              : ''
                          }`}
                          onClick={() => handleCellClick(rowIndex, colIndex)}
                        >
                          <input
                            type="text"
                            value={cell.value}
                            onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                            className="w-full h-full px-2 py-1 text-sm focus:outline-none"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {selectedCell && (
              <div className="mt-4 text-sm text-gray-600">
                選択中のセル: <span className="font-semibold">
                  {getColumnLabel(selectedCell.col)}{selectedCell.row + 1}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
