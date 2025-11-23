import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, RotateCcw, Save, Share2 } from "lucide-react";
import { useState, useCallback } from "react";
import { toast } from "sonner";
import { executeVBA, CellValue } from "@/lib/vbaEngine";

// スプレッドシートの行数と列数
const ROWS = 20;
const COLS = 10;

// 列のラベル（A, B, C, ...）を生成
const getColumnLabel = (index: number): string => {
  return String.fromCharCode(65 + index); // 65 = 'A'
};

// セルの初期状態
type CellData = {
  value: string;
};

type SpreadsheetData = CellData[][];

// CellValueを文字列に変換
const cellValueToString = (value: CellValue): string => {
  if (value === null || value === undefined) return "";
  return String(value);
};

const createEmptySpreadsheet = (): SpreadsheetData => {
  return Array(ROWS).fill(null).map(() =>
    Array(COLS).fill(null).map(() => ({ value: "" }))
  );
};

export default function Playground() {
  const [code, setCode] = useState(`' VBAコードをここに記述
Sub Sample()
    Range("A1").Value = "Hello, VBA Playground!"
    Range("A2").Value = 100
    Range("A3").Value = 200
    Range("A4").Value = Range("A2").Value + Range("A3").Value
End Sub`);
  
  const [spreadsheet, setSpreadsheet] = useState<SpreadsheetData>(createEmptySpreadsheet());
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [executionLog, setExecutionLog] = useState<string[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);

  // セルの値を更新
  const updateCell = useCallback((row: number, col: number, value: string) => {
    setSpreadsheet(prev => {
      const newData = prev.map(r => r.map(c => ({ ...c })));
      newData[row][col].value = value;
      return newData;
    });
  }, []);

  // スプレッドシートをリセット
  const handleReset = useCallback(() => {
    setSpreadsheet(createEmptySpreadsheet());
    setExecutionLog([]);
    setSelectedCell(null);
    toast.success("スプレッドシートをリセットしました");
  }, []);

  // VBAコードを実行
  const handleExecute = useCallback(async () => {
    setIsExecuting(true);
    setExecutionLog([]);
    
    try {
      // スプレッドシートデータをCellValue[][]に変換
      const cellValues: CellValue[][] = spreadsheet.map(row =>
        row.map(cell => {
          const val = cell.value.trim();
          if (val === "") return null;
          // 数値として解釈できる場合は数値に変換
          if (/^-?\d+(\.\d+)?$/.test(val)) {
            return parseFloat(val);
          }
          return val;
        })
      );

      // VBAエンジンで実行
      const result = await executeVBA(code, cellValues);

      // 実行結果をログに表示
      setExecutionLog(result.logs);

      // スプレッドシートを更新
      const newSpreadsheet = result.cells.map(row =>
        row.map(cell => ({ value: cellValueToString(cell) }))
      );
      setSpreadsheet(newSpreadsheet);

      if (result.success) {
        toast.success("コードを実行しました");
      } else {
        toast.error(`実行エラー: ${result.error}`);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      setExecutionLog(prev => [...prev, `[ERROR] ${errorMessage}`]);
      toast.error("実行中にエラーが発生しました");
    } finally {
      setIsExecuting(false);
    }
  }, [code, spreadsheet]);

  // コードを保存
  const handleSave = useCallback(() => {
    localStorage.setItem("vba-playground-code", code);
    toast.success("コードを保存しました");
  }, [code]);

  // コードを共有
  const handleShare = useCallback(() => {
    toast.info("共有機能は開発中です");
  }, []);

  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">VBA Playground</h1>
          <p className="text-muted-foreground">
            VBAコードを記述して、ブラウザ内で即座にテストできます
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 左側: コードエディタ */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>VBAコードエディタ</span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={handleSave}>
                      <Save className="h-4 w-4 mr-1" />
                      保存
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleShare}>
                      <Share2 className="h-4 w-4 mr-1" />
                      共有
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <textarea
                  className="w-full h-96 font-mono text-sm p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  spellCheck={false}
                />
              </CardContent>
            </Card>

            {/* 実行ボタン */}
            <div className="flex gap-2">
              <Button 
                className="flex-1" 
                size="lg" 
                onClick={handleExecute}
                disabled={isExecuting}
              >
                <Play className="h-5 w-5 mr-2" />
                {isExecuting ? "実行中..." : "実行"}
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={handleReset}
              >
                <RotateCcw className="h-5 w-5 mr-2" />
                リセット
              </Button>
            </div>

            {/* 実行ログ */}
            <Card>
              <CardHeader>
                <CardTitle>実行ログ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 rounded-md p-4 h-48 overflow-y-auto font-mono text-xs">
                  {executionLog.length === 0 ? (
                    <p className="text-muted-foreground">実行ログがここに表示されます</p>
                  ) : (
                    executionLog.map((log, index) => (
                      <div 
                        key={index} 
                        className={`mb-1 ${
                          log.includes('[ERROR]') ? 'text-red-600' :
                          log.includes('[WARNING]') ? 'text-yellow-600' :
                          log.includes('[SUCCESS]') ? 'text-green-600' :
                          'text-foreground'
                        }`}
                      >
                        {log}
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 右側: スプレッドシート */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>スプレッドシート（{ROWS}行 × {COLS}列）</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-auto border rounded-md">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="border bg-muted p-2 text-xs font-semibold sticky top-0 z-10 w-12">
                          {/* 左上の空セル */}
                        </th>
                        {Array.from({ length: COLS }).map((_, colIndex) => (
                          <th 
                            key={colIndex} 
                            className="border bg-muted p-2 text-xs font-semibold sticky top-0 z-10 min-w-24"
                          >
                            {getColumnLabel(colIndex)}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {spreadsheet.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          <td className="border bg-muted p-2 text-xs font-semibold text-center sticky left-0 z-10">
                            {rowIndex + 1}
                          </td>
                          {row.map((cell, colIndex) => (
                            <td 
                              key={colIndex}
                              className={`border p-0 ${
                                selectedCell?.row === rowIndex && selectedCell?.col === colIndex
                                  ? 'ring-2 ring-primary'
                                  : ''
                              }`}
                              onClick={() => setSelectedCell({ row: rowIndex, col: colIndex })}
                            >
                              <input
                                type="text"
                                className="w-full h-full px-2 py-1 text-sm focus:outline-none bg-transparent"
                                value={cell.value}
                                onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)}
                                onFocus={() => setSelectedCell({ row: rowIndex, col: colIndex })}
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {selectedCell && (
                  <div className="mt-4 text-sm text-muted-foreground">
                    選択中のセル: <span className="font-semibold">
                      {getColumnLabel(selectedCell.col)}{selectedCell.row + 1}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
