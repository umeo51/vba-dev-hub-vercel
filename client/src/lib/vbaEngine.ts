/**
 * VBA実行エンジン
 * VBAコードをJavaScriptに変換して実行する
 */

export type CellValue = string | number | boolean | null;

export interface VBAExecutionContext {
  // スプレッドシートデータ（行×列の2次元配列）
  cells: CellValue[][];
  // 実行ログ
  logs: string[];
  // 変数スコープ
  variables: Map<string, CellValue>;
}

export interface VBAExecutionResult {
  success: boolean;
  cells: CellValue[][];
  logs: string[];
  error?: string;
}

/**
 * Range操作をサポートするヘルパークラス
 */
class RangeHelper {
  constructor(private context: VBAExecutionContext) {}

  /**
   * セル参照を解析（例: "A1" → {row: 0, col: 0}）
   */
  private parseCellReference(ref: string): { row: number; col: number } | null {
    const match = ref.match(/^([A-Z]+)(\d+)$/i);
    if (!match) return null;

    const colStr = match[1].toUpperCase();
    const rowStr = match[2];

    // 列（A=0, B=1, ...）
    let col = 0;
    for (let i = 0; i < colStr.length; i++) {
      col = col * 26 + (colStr.charCodeAt(i) - 65 + 1);
    }
    col -= 1; // 0-indexed

    // 行（1-indexed → 0-indexed）
    const row = parseInt(rowStr, 10) - 1;

    return { row, col };
  }

  /**
   * Range("A1").Value を取得
   */
  getValue(cellRef: string): CellValue {
    const pos = this.parseCellReference(cellRef);
    if (!pos) {
      throw new Error(`Invalid cell reference: ${cellRef}`);
    }

    const { row, col } = pos;
    if (row < 0 || row >= this.context.cells.length || col < 0 || col >= this.context.cells[0].length) {
      throw new Error(`Cell reference out of bounds: ${cellRef}`);
    }

    return this.context.cells[row][col];
  }

  /**
   * Range("A1").Value = value を設定
   */
  setValue(cellRef: string, value: CellValue): void {
    const pos = this.parseCellReference(cellRef);
    if (!pos) {
      throw new Error(`Invalid cell reference: ${cellRef}`);
    }

    const { row, col } = pos;
    if (row < 0 || row >= this.context.cells.length || col < 0 || col >= this.context.cells[0].length) {
      throw new Error(`Cell reference out of bounds: ${cellRef}`);
    }

    this.context.cells[row][col] = value;
    this.context.logs.push(`[INFO] ${cellRef} = ${value}`);
  }

  /**
   * Cells(row, col).Value を取得（1-indexed）
   */
  getCellsByIndex(row: number, col: number): CellValue {
    const r = row - 1; // 0-indexed
    const c = col - 1; // 0-indexed

    if (r < 0 || r >= this.context.cells.length || c < 0 || c >= this.context.cells[0].length) {
      throw new Error(`Cells(${row}, ${col}) out of bounds`);
    }

    return this.context.cells[r][c];
  }

  /**
   * Cells(row, col).Value = value を設定（1-indexed）
   */
  setCellsByIndex(row: number, col: number, value: CellValue): void {
    const r = row - 1; // 0-indexed
    const c = col - 1; // 0-indexed

    if (r < 0 || r >= this.context.cells.length || c < 0 || c >= this.context.cells[0].length) {
      throw new Error(`Cells(${row}, ${col}) out of bounds`);
    }

    this.context.cells[r][c] = value;
    this.context.logs.push(`[INFO] Cells(${row}, ${col}) = ${value}`);
  }
}

/**
 * VBAコードをJavaScriptに変換して実行
 */
export async function executeVBA(
  code: string,
  initialCells: CellValue[][]
): Promise<VBAExecutionResult> {
  const context: VBAExecutionContext = {
    cells: initialCells.map(row => [...row]), // ディープコピー
    logs: [],
    variables: new Map(),
  };

  const rangeHelper = new RangeHelper(context);

  try {
    context.logs.push("[INFO] VBAコードの実行を開始します");

    // VBAコードを行ごとに分割
    const lines = code.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    for (const line of lines) {
      // コメント行をスキップ
      if (line.startsWith("'") || line.startsWith("REM")) {
        continue;
      }

      // Sub/End Sub をスキップ
      if (line.match(/^(Sub|End Sub|Function|End Function)/i)) {
        continue;
      }

      // Range("A1").Value = ... の処理
      const rangeSetMatch = line.match(/Range\s*\(\s*"([A-Z0-9]+)"\s*\)\.Value\s*=\s*(.+)/i);
      if (rangeSetMatch) {
        const cellRef = rangeSetMatch[1];
        const valueExpr = rangeSetMatch[2];
        const value = evaluateExpression(valueExpr, context, rangeHelper);
        rangeHelper.setValue(cellRef, value);
        continue;
      }

      // Cells(row, col).Value = ... の処理
      const cellsSetMatch = line.match(/Cells\s*\(\s*(\d+)\s*,\s*(\d+)\s*\)\.Value\s*=\s*(.+)/i);
      if (cellsSetMatch) {
        const row = parseInt(cellsSetMatch[1], 10);
        const col = parseInt(cellsSetMatch[2], 10);
        const valueExpr = cellsSetMatch[3];
        const value = evaluateExpression(valueExpr, context, rangeHelper);
        rangeHelper.setCellsByIndex(row, col, value);
        continue;
      }

      // Dim 変数宣言
      const dimMatch = line.match(/Dim\s+(\w+)\s+As\s+\w+/i);
      if (dimMatch) {
        const varName = dimMatch[1];
        context.variables.set(varName, null);
        context.logs.push(`[INFO] 変数 ${varName} を宣言しました`);
        continue;
      }

      // 変数代入: varName = ...
      const assignMatch = line.match(/^(\w+)\s*=\s*(.+)/);
      if (assignMatch) {
        const varName = assignMatch[1];
        const valueExpr = assignMatch[2];
        const value = evaluateExpression(valueExpr, context, rangeHelper);
        context.variables.set(varName, value);
        context.logs.push(`[INFO] ${varName} = ${value}`);
        continue;
      }

      // MsgBox
      const msgBoxMatch = line.match(/MsgBox\s+(.+)/i);
      if (msgBoxMatch) {
        const message = evaluateExpression(msgBoxMatch[1], context, rangeHelper);
        context.logs.push(`[MSGBOX] ${message}`);
        continue;
      }

      // 未対応の構文
      context.logs.push(`[WARNING] 未対応の構文: ${line}`);
    }

    context.logs.push("[SUCCESS] 実行が完了しました");

    return {
      success: true,
      cells: context.cells,
      logs: context.logs,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    context.logs.push(`[ERROR] ${errorMessage}`);

    return {
      success: false,
      cells: context.cells,
      logs: context.logs,
      error: errorMessage,
    };
  }
}

/**
 * 単純な式を評価（演算子を含まない）
 */
function evaluateSimpleExpression(
  expr: string,
  context: VBAExecutionContext,
  rangeHelper: RangeHelper
): CellValue {
  expr = expr.trim();

  // 文字列リテラル
  if (expr.startsWith('"') && expr.endsWith('"')) {
    return expr.slice(1, -1);
  }

  // 数値リテラル
  if (/^-?\d+(\.\d+)?$/.test(expr)) {
    return parseFloat(expr);
  }

  // Range("A1").Value
  const rangeMatch = expr.match(/Range\s*\(\s*"([A-Z0-9]+)"\s*\)\.Value/i);
  if (rangeMatch) {
    return rangeHelper.getValue(rangeMatch[1]);
  }

  // Cells(row, col).Value
  const cellsMatch = expr.match(/Cells\s*\(\s*(\d+)\s*,\s*(\d+)\s*\)\.Value/i);
  if (cellsMatch) {
    const row = parseInt(cellsMatch[1], 10);
    const col = parseInt(cellsMatch[2], 10);
    return rangeHelper.getCellsByIndex(row, col);
  }

  // 変数参照
  if (/^\w+$/.test(expr) && context.variables.has(expr)) {
    return context.variables.get(expr) ?? null;
  }

  // その他（そのまま文字列として返す）
  return expr;
}

/**
 * 式を評価（文字列リテラル、数値、Range参照、変数、演算など）
 */
function evaluateExpression(
  expr: string,
  context: VBAExecutionContext,
  rangeHelper: RangeHelper
): CellValue {
  expr = expr.trim();

  // 演算式（簡易実装: + - * / のみ、左から右へ評価）
  // まず演算子が含まれているかチェック
  const tokens = expr.split(/\s*([\/*\+\-])\s*/).filter(t => t.trim().length > 0);
  
  if (tokens.length > 1) {
    // 最初の項を評価
    let result = evaluateSimpleExpression(tokens[0], context, rangeHelper);
    
    // 演算子と次の項を順番に処理
    for (let i = 1; i < tokens.length; i += 2) {
      const operator = tokens[i];
      const nextValue = evaluateSimpleExpression(tokens[i + 1], context, rangeHelper);
      
      const leftNum = typeof result === 'number' ? result : parseFloat(String(result));
      const rightNum = typeof nextValue === 'number' ? nextValue : parseFloat(String(nextValue));
      
      switch (operator) {
        case '+':
          result = leftNum + rightNum;
          break;
        case '-':
          result = leftNum - rightNum;
          break;
        case '*':
          result = leftNum * rightNum;
          break;
        case '/':
          result = leftNum / rightNum;
          break;
        default:
          throw new Error(`Unknown operator: ${operator}`);
      }
    }
    
    return result;
  }

  // 演算子がない場合は単純な式として評価
  return evaluateSimpleExpression(expr, context, rangeHelper);
}
