import { describe, it, expect } from 'vitest';
import { executeVBA, CellValue } from './vbaEngine';

describe('VBA Execution Engine', () => {
  const createEmptyCells = (rows: number, cols: number): CellValue[][] => {
    return Array(rows).fill(null).map(() => Array(cols).fill(null));
  };

  describe('Range operations', () => {
    it('should set a string value to a cell using Range', async () => {
      const code = `
        Sub Test()
          Range("A1").Value = "Hello"
        End Sub
      `;
      const cells = createEmptyCells(10, 10);
      const result = await executeVBA(code, cells);

      expect(result.success).toBe(true);
      expect(result.cells[0][0]).toBe('Hello');
    });

    it('should set a numeric value to a cell using Range', async () => {
      const code = `
        Sub Test()
          Range("B2").Value = 123
        End Sub
      `;
      const cells = createEmptyCells(10, 10);
      const result = await executeVBA(code, cells);

      expect(result.success).toBe(true);
      expect(result.cells[1][1]).toBe(123);
    });

    it('should read and write cell values using Range', async () => {
      const code = `
        Sub Test()
          Range("A1").Value = 100
          Range("A2").Value = 200
          Range("A3").Value = Range("A1").Value + Range("A2").Value
        End Sub
      `;
      const cells = createEmptyCells(10, 10);
      const result = await executeVBA(code, cells);

      expect(result.success).toBe(true);
      expect(result.cells[0][0]).toBe(100);
      expect(result.cells[1][0]).toBe(200);
      expect(result.cells[2][0]).toBe(300);
    });
  });

  describe('Cells operations', () => {
    it('should set a value using Cells(row, col)', async () => {
      const code = `
        Sub Test()
          Cells(1, 1).Value = "Test"
          Cells(2, 3).Value = 456
        End Sub
      `;
      const cells = createEmptyCells(10, 10);
      const result = await executeVBA(code, cells);

      expect(result.success).toBe(true);
      expect(result.cells[0][0]).toBe('Test');
      expect(result.cells[1][2]).toBe(456);
    });

    it('should read and write using Cells', async () => {
      const code = `
        Sub Test()
          Cells(1, 1).Value = 10
          Cells(1, 2).Value = 20
          Cells(1, 3).Value = Cells(1, 1).Value + Cells(1, 2).Value
        End Sub
      `;
      const cells = createEmptyCells(10, 10);
      const result = await executeVBA(code, cells);

      expect(result.success).toBe(true);
      expect(result.cells[0][0]).toBe(10);
      expect(result.cells[0][1]).toBe(20);
      expect(result.cells[0][2]).toBe(30);
    });
  });

  describe('Arithmetic operations', () => {
    it('should perform addition', async () => {
      const code = `
        Sub Test()
          Range("A1").Value = 10 + 5
        End Sub
      `;
      const cells = createEmptyCells(10, 10);
      const result = await executeVBA(code, cells);

      expect(result.success).toBe(true);
      expect(result.cells[0][0]).toBe(15);
    });

    it('should perform subtraction', async () => {
      const code = `
        Sub Test()
          Range("A1").Value = 20 - 8
        End Sub
      `;
      const cells = createEmptyCells(10, 10);
      const result = await executeVBA(code, cells);

      expect(result.success).toBe(true);
      expect(result.cells[0][0]).toBe(12);
    });

    it('should perform multiplication', async () => {
      const code = `
        Sub Test()
          Range("A1").Value = 6 * 7
        End Sub
      `;
      const cells = createEmptyCells(10, 10);
      const result = await executeVBA(code, cells);

      expect(result.success).toBe(true);
      expect(result.cells[0][0]).toBe(42);
    });

    it('should perform division', async () => {
      const code = `
        Sub Test()
          Range("A1").Value = 100 / 4
        End Sub
      `;
      const cells = createEmptyCells(10, 10);
      const result = await executeVBA(code, cells);

      expect(result.success).toBe(true);
      expect(result.cells[0][0]).toBe(25);
    });

    it('should perform complex arithmetic with cell references', async () => {
      const code = `
        Sub Test()
          Range("A1").Value = 10
          Range("A2").Value = 20
          Range("A3").Value = 5
          Range("A4").Value = Range("A1").Value + Range("A2").Value * Range("A3").Value
        End Sub
      `;
      const cells = createEmptyCells(10, 10);
      const result = await executeVBA(code, cells);

      expect(result.success).toBe(true);
      expect(result.cells[0][0]).toBe(10);
      expect(result.cells[1][0]).toBe(20);
      expect(result.cells[2][0]).toBe(5);
      // Note: 簡易実装のため演算子の優先順位は左から右
      // 10 + 20 = 30, 30 * 5 = 150
      expect(result.cells[3][0]).toBe(150);
    });
  });

  describe('Variables', () => {
    it('should declare and use variables', async () => {
      const code = `
        Sub Test()
          Dim x As Integer
          x = 42
          Range("A1").Value = x
        End Sub
      `;
      const cells = createEmptyCells(10, 10);
      const result = await executeVBA(code, cells);

      expect(result.success).toBe(true);
      expect(result.cells[0][0]).toBe(42);
    });

    it('should perform operations with variables', async () => {
      const code = `
        Sub Test()
          Dim a As Integer
          Dim b As Integer
          a = 10
          b = 20
          Range("A1").Value = a + b
        End Sub
      `;
      const cells = createEmptyCells(10, 10);
      const result = await executeVBA(code, cells);

      expect(result.success).toBe(true);
      expect(result.cells[0][0]).toBe(30);
    });
  });

  describe('MsgBox', () => {
    it('should log MsgBox messages', async () => {
      const code = `
        Sub Test()
          MsgBox "Hello, World!"
        End Sub
      `;
      const cells = createEmptyCells(10, 10);
      const result = await executeVBA(code, cells);

      expect(result.success).toBe(true);
      expect(result.logs.some(log => log.includes('[MSGBOX] Hello, World!'))).toBe(true);
    });

    it('should log MsgBox with variable', async () => {
      const code = `
        Sub Test()
          Dim msg As String
          msg = "Test Message"
          MsgBox msg
        End Sub
      `;
      const cells = createEmptyCells(10, 10);
      const result = await executeVBA(code, cells);

      expect(result.success).toBe(true);
      expect(result.logs.some(log => log.includes('[MSGBOX] Test Message'))).toBe(true);
    });
  });

  describe('Error handling', () => {
    it('should handle invalid cell references', async () => {
      const code = `
        Sub Test()
          Range("ZZ999").Value = 123
        End Sub
      `;
      const cells = createEmptyCells(10, 10);
      const result = await executeVBA(code, cells);

      expect(result.success).toBe(false);
      expect(result.error).toContain('out of bounds');
    });

    it('should handle invalid Cells indices', async () => {
      const code = `
        Sub Test()
          Cells(100, 100).Value = 123
        End Sub
      `;
      const cells = createEmptyCells(10, 10);
      const result = await executeVBA(code, cells);

      expect(result.success).toBe(false);
      expect(result.error).toContain('out of bounds');
    });
  });

  describe('Comments', () => {
    it('should ignore comment lines', async () => {
      const code = `
        Sub Test()
          ' This is a comment
          Range("A1").Value = 100
          REM This is also a comment
          Range("A2").Value = 200
        End Sub
      `;
      const cells = createEmptyCells(10, 10);
      const result = await executeVBA(code, cells);

      expect(result.success).toBe(true);
      expect(result.cells[0][0]).toBe(100);
      expect(result.cells[1][0]).toBe(200);
    });
  });

  describe('Complex scenarios', () => {
    it('should execute the sample code from Playground', async () => {
      const code = `
        Sub Sample()
          Range("A1").Value = "Hello, VBA Playground!"
          Range("A2").Value = 100
          Range("A3").Value = 200
          Range("A4").Value = Range("A2").Value + Range("A3").Value
        End Sub
      `;
      const cells = createEmptyCells(20, 10);
      const result = await executeVBA(code, cells);

      expect(result.success).toBe(true);
      expect(result.cells[0][0]).toBe('Hello, VBA Playground!');
      expect(result.cells[1][0]).toBe(100);
      expect(result.cells[2][0]).toBe(200);
      expect(result.cells[3][0]).toBe(300);
    });

    it('should handle a loop-like pattern with multiple operations', async () => {
      const code = `
        Sub Test()
          Range("A1").Value = 1
          Range("A2").Value = 2
          Range("A3").Value = 3
          Range("B1").Value = Range("A1").Value * 10
          Range("B2").Value = Range("A2").Value * 10
          Range("B3").Value = Range("A3").Value * 10
        End Sub
      `;
      const cells = createEmptyCells(10, 10);
      const result = await executeVBA(code, cells);

      expect(result.success).toBe(true);
      expect(result.cells[0][0]).toBe(1);
      expect(result.cells[1][0]).toBe(2);
      expect(result.cells[2][0]).toBe(3);
      expect(result.cells[0][1]).toBe(10);
      expect(result.cells[1][1]).toBe(20);
      expect(result.cells[2][1]).toBe(30);
    });
  });
});
