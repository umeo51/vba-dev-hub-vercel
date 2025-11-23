'use client';

import Header from '@/components/Header';
import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen} from 'lucide-react';

interface FormControl {
  id: string;
  type: 'label' | 'textbox' | 'button' | 'checkbox' | 'combobox' | 'listbox';
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;
  properties: {
    name?: string;
    caption?: string;
    value?: string;
    checked?: boolean;
    items?: string[];
  };
}

const controlTemplates = {
  label: { width: 100, height: 20, text: 'Label' },
  textbox: { width: 150, height: 25, text: '' },
  button: { width: 80, height: 30, text: 'Button' },
  checkbox: { width: 100, height: 20, text: 'CheckBox' },
  combobox: { width: 150, height: 25, text: '' },
  listbox: { width: 150, height: 100, text: '' }
};

export default function UserFormPage() {
  const [controls, setControls] = useState<FormControl[]>([]);
  const [selectedControl, setSelectedControl] = useState<string | null>(null);
  const [formWidth, setFormWidth] = useState(400);
  const [formHeight, setFormHeight] = useState(300);
  const [formTitle, setFormTitle] = useState('UserForm1');
  const [showCode, setShowCode] = useState(false);

  const addControl = (type: FormControl['type']) => {
    const template = controlTemplates[type];
    const newControl: FormControl = {
      id: `${type}_${Date.now()}`,
      type,
      x: 20,
      y: 20,
      width: template.width,
      height: template.height,
      text: template.text,
      properties: {
        name: `${type}${controls.filter(c => c.type === type).length + 1}`,
        caption: template.text
      }
    };
    setControls([...controls, newControl]);
    setSelectedControl(newControl.id);
  };

  const updateControl = (id: string, updates: Partial<FormControl>) => {
    setControls(controls.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const deleteControl = (id: string) => {
    setControls(controls.filter(c => c.id !== id));
    if (selectedControl === id) {
      setSelectedControl(null);
    }
  };

  const generateVBACode = () => {
    let code = `' UserForm: ${formTitle}\n`;
    code += `' サイズ: ${formWidth} x ${formHeight}\n\n`;
    
    // コントロールの宣言
    controls.forEach(control => {
      const typeName = {
        label: 'Label',
        textbox: 'TextBox',
        button: 'CommandButton',
        checkbox: 'CheckBox',
        combobox: 'ComboBox',
        listbox: 'ListBox'
      }[control.type];
      code += `' ${control.properties.name}: ${typeName}\n`;
    });
    
    code += `\nPrivate Sub UserForm_Initialize()\n`;
    code += `    ' フォームの初期化\n`;
    code += `    Me.Caption = "${formTitle}"\n`;
    code += `    Me.Width = ${formWidth}\n`;
    code += `    Me.Height = ${formHeight}\n\n`;
    
    // コントロールの配置と設定
    controls.forEach(control => {
      code += `    ' ${control.properties.name}の設定\n`;
      code += `    With Me.${control.properties.name}\n`;
      code += `        .Left = ${control.x}\n`;
      code += `        .Top = ${control.y}\n`;
      code += `        .Width = ${control.width}\n`;
      code += `        .Height = ${control.height}\n`;
      
      if (control.type === 'label' || control.type === 'button' || control.type === 'checkbox') {
        code += `        .Caption = "${control.text}"\n`;
      } else if (control.type === 'textbox') {
        code += `        .Value = "${control.text}"\n`;
      }
      
      if (control.type === 'combobox' || control.type === 'listbox') {
        code += `        ' .AddItem "項目1"\n`;
        code += `        ' .AddItem "項目2"\n`;
        code += `        ' .AddItem "項目3"\n`;
      }
      
      code += `    End With\n\n`;
    });
    
    code += `End Sub\n\n`;
    
    // ボタンのイベントハンドラ
    controls.filter(c => c.type === 'button').forEach(button => {
      code += `Private Sub ${button.properties.name}_Click()\n`;
      code += `    ' ${button.text}がクリックされたときの処理\n`;
      code += `    MsgBox "${button.text}がクリックされました"\n`;
      code += `End Sub\n\n`;
    });
    
    return code;
  };

  const selectedControlData = controls.find(c => c.id === selectedControl);

  return (
    <>

      <Header />

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
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
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            UserFormシミュレーター
          </h1>
          <p className="text-gray-600 text-lg">
            ビジュアルエディタでUserFormをデザインし、VBAコードを自動生成
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Toolbox */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h3 className="font-bold text-lg mb-4">ツールボックス</h3>
              <div className="space-y-2">
                <button
                  onClick={() => addControl('label')}
                  className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-left transition-colors"
                >
                  📝 Label
                </button>
                <button
                  onClick={() => addControl('textbox')}
                  className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-left transition-colors"
                >
                  ✏️ TextBox
                </button>
                <button
                  onClick={() => addControl('button')}
                  className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-left transition-colors"
                >
                  🔘 Button
                </button>
                <button
                  onClick={() => addControl('checkbox')}
                  className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-left transition-colors"
                >
                  ☑️ CheckBox
                </button>
                <button
                  onClick={() => addControl('combobox')}
                  className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-left transition-colors"
                >
                  📋 ComboBox
                </button>
                <button
                  onClick={() => addControl('listbox')}
                  className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-left transition-colors"
                >
                  📜 ListBox
                </button>
              </div>

              <div className="mt-6 pt-6 border-t">
                <h4 className="font-semibold mb-3">フォーム設定</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">タイトル</label>
                    <input
                      type="text"
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      className="w-full px-3 py-1 border border-gray-300 rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">幅</label>
                    <input
                      type="number"
                      value={formWidth}
                      onChange={(e) => setFormWidth(Number(e.target.value))}
                      className="w-full px-3 py-1 border border-gray-300 rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">高さ</label>
                    <input
                      type="number"
                      value={formHeight}
                      onChange={(e) => setFormHeight(Number(e.target.value))}
                      className="w-full px-3 py-1 border border-gray-300 rounded text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Canvas */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">デザイン</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowCode(!showCode)}
                    className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors text-sm"
                  >
                    {showCode ? 'デザインを表示' : 'コードを表示'}
                  </button>
                  <button
                    onClick={() => setControls([])}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                  >
                    すべてクリア
                  </button>
                </div>
              </div>

              {!showCode ? (
                <div
                  className="relative bg-gray-50 border-2 border-gray-300 rounded-lg overflow-hidden"
                  style={{ width: formWidth, height: formHeight, maxWidth: '100%' }}
                >
                  {/* Form Title Bar */}
                  <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 flex items-center text-sm font-semibold">
                    {formTitle}
                  </div>

                  {/* Controls */}
                  <div className="absolute top-8 left-0 right-0 bottom-0">
                    {controls.map(control => (
                      <div
                        key={control.id}
                        className={`absolute cursor-move ${
                          selectedControl === control.id ? 'ring-2 ring-blue-500' : ''
                        }`}
                        style={{
                          left: control.x,
                          top: control.y,
                          width: control.width,
                          height: control.height
                        }}
                        onClick={() => setSelectedControl(control.id)}
                      >
                        {control.type === 'label' && (
                          <div className="h-full flex items-center text-sm">
                            {control.text}
                          </div>
                        )}
                        {control.type === 'textbox' && (
                          <input
                            type="text"
                            value={control.text}
                            onChange={(e) => updateControl(control.id, { text: e.target.value })}
                            className="w-full h-full px-2 border border-gray-400 text-sm"
                            placeholder="TextBox"
                          />
                        )}
                        {control.type === 'button' && (
                          <button className="w-full h-full bg-gray-200 border border-gray-400 hover:bg-gray-300 text-sm font-semibold">
                            {control.text}
                          </button>
                        )}
                        {control.type === 'checkbox' && (
                          <label className="flex items-center h-full text-sm">
                            <input type="checkbox" className="mr-2" />
                            {control.text}
                          </label>
                        )}
                        {control.type === 'combobox' && (
                          <select className="w-full h-full px-2 border border-gray-400 text-sm">
                            <option>ComboBox</option>
                          </select>
                        )}
                        {control.type === 'listbox' && (
                          <select multiple className="w-full h-full px-2 border border-gray-400 text-sm">
                            <option>項目1</option>
                            <option>項目2</option>
                            <option>項目3</option>
                          </select>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold">生成されたVBAコード</h4>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(generateVBACode());
                        alert('コードをコピーしました！');
                      }}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm"
                    >
                      コピー
                    </button>
                  </div>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm max-h-96 overflow-y-auto">
                    <code>{generateVBACode()}</code>
                  </pre>
                </div>
              )}
            </div>
          </div>

          {/* Properties */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h3 className="font-bold text-lg mb-4">プロパティ</h3>
              {selectedControlData ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">名前</label>
                    <input
                      type="text"
                      value={selectedControlData.properties.name}
                      onChange={(e) => updateControl(selectedControlData.id, {
                        properties: { ...selectedControlData.properties, name: e.target.value }
                      })}
                      className="w-full px-3 py-1 border border-gray-300 rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">テキスト</label>
                    <input
                      type="text"
                      value={selectedControlData.text}
                      onChange={(e) => updateControl(selectedControlData.id, { text: e.target.value })}
                      className="w-full px-3 py-1 border border-gray-300 rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">X座標</label>
                    <input
                      type="number"
                      value={selectedControlData.x}
                      onChange={(e) => updateControl(selectedControlData.id, { x: Number(e.target.value) })}
                      className="w-full px-3 py-1 border border-gray-300 rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Y座標</label>
                    <input
                      type="number"
                      value={selectedControlData.y}
                      onChange={(e) => updateControl(selectedControlData.id, { y: Number(e.target.value) })}
                      className="w-full px-3 py-1 border border-gray-300 rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">幅</label>
                    <input
                      type="number"
                      value={selectedControlData.width}
                      onChange={(e) => updateControl(selectedControlData.id, { width: Number(e.target.value) })}
                      className="w-full px-3 py-1 border border-gray-300 rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">高さ</label>
                    <input
                      type="number"
                      value={selectedControlData.height}
                      onChange={(e) => updateControl(selectedControlData.id, { height: Number(e.target.value) })}
                      className="w-full px-3 py-1 border border-gray-300 rounded text-sm"
                    />
                  </div>
                  <button
                    onClick={() => deleteControl(selectedControlData.id)}
                    className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                  >
                    削除
                  </button>
                </div>
              ) : (
                <p className="text-sm text-gray-500">コントロールを選択してください</p>
              )}
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="font-bold text-lg mb-4">使い方</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>左側のツールボックスからコントロールを選択して追加します</li>
            <li>キャンバス上のコントロールをクリックして選択します</li>
            <li>右側のプロパティパネルで位置やサイズ、テキストを調整します</li>
            <li>「コードを表示」ボタンでVBAコードを生成します</li>
            <li>生成されたコードをコピーしてVBAエディタに貼り付けます</li>
          </ol>
        </div>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
          >
            ← ホームに戻る
          </Link>
        </div>
      </main>
    </div>
  </>
  );
}
