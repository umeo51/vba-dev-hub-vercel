'use client';

import Header from '@/components/Header';
import { useState } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqData = [
    {
      category: '一般',
      items: [
        {
          question: 'VBA Dev Hubは無料で使えますか？',
          answer: 'はい、VBA Dev Hubのすべての機能は完全無料でご利用いただけます。アカウント登録も不要です。'
        },
        {
          question: '生成されたコードは商用利用できますか？',
          answer: 'はい、当サイトで生成されたVBAコードは、個人利用・商用利用を問わず自由にご利用いただけます。著作権の帰属や使用料の支払いは不要です。ただし、コードの動作については保証いたしかねますので、ご自身の責任でご使用ください。'
        },
        {
          question: '生成されたコードの著作権はどうなりますか？',
          answer: '当サイトで生成されたVBAコードの著作権は放棄されており、パブリックドメインとして扱われます。自由に使用、改変、再配布が可能です。'
        },
        {
          question: 'アカウント登録は必要ですか？',
          answer: 'いいえ、VBA Dev Hubのほとんどの機能はアカウント登録なしでご利用いただけます。ただし、スニペットの投稿や「いいね」機能など、一部の機能は将来的にアカウント登録が必要になる可能性があります。'
        }
      ]
    },
    {
      category: 'コード生成ツール',
      items: [
        {
          question: 'コード生成ツールで作成できるコードの種類は？',
          answer: 'コード生成ツールでは、データ転記・コピー、データ処理（重複削除、並び替え、検索、集計）、ファイル・シート操作、繰り返し処理など、17種類以上のテンプレートを提供しています。また、複数の処理を組み合わせて1つのコードとして生成することも可能です。'
        },
        {
          question: '複数処理統合モードとは何ですか？',
          answer: '複数処理統合モードは、複数の処理を順番に実行する1つのVBAコードを生成する機能です。例えば、「データをコピー→重複削除→並び替え→CSV出力」といった一連の処理を、1つのSubプロシージャとして自動生成できます。進捗表示やエラーハンドリングも自動で追加されます。'
        },
        {
          question: '生成されたコードが動作しない場合は？',
          answer: '生成されたコードは一般的なケースを想定していますが、お使いの環境やデータによっては調整が必要な場合があります。エラーメッセージを確認し、エラー辞典で対処法を検索してください。それでも解決しない場合は、お問い合わせフォームからバグ報告をお願いします。'
        },
        {
          question: 'コード整形ツールの使い方は？',
          answer: 'コード整形ツールは、既存のVBAコードを見やすく整形する機能です。コードをテキストエリアに貼り付けて「整形する」ボタンをクリックすると、インデントの調整、命名規則の統一、コメントの追加などが自動で行われます。'
        }
      ]
    },
    {
      category: 'スニペット共有',
      items: [
        {
          question: 'スニペットを投稿するには？',
          answer: 'スニペット一覧ページの「新規投稿」ボタンから、タイトル、説明、カテゴリ、タグ、コードを入力して投稿できます。投稿されたスニペットは、他のユーザーと共有され、検索やフィルタリングが可能になります。'
        },
        {
          question: '投稿したスニペットを削除できますか？',
          answer: '現在、スニペットの削除機能は実装されていません。将来的にアカウント機能が実装された際に、自分が投稿したスニペットの編集・削除が可能になる予定です。'
        },
        {
          question: 'スニペットの「いいね」機能とは？',
          answer: '「いいね」機能は、有用なスニペットを評価するための機能です。いいね数が多いスニペットは、検索結果の上位に表示されやすくなります。'
        },
        {
          question: 'スニペットのライセンスは？',
          answer: '投稿されたスニペットは、投稿者が著作権を保持しますが、他のユーザーが自由に使用できることを前提としています。商用利用も可能ですが、投稿者の意図を尊重してご使用ください。'
        }
      ]
    },
    {
      category: 'エラー辞典・リファレンス',
      items: [
        {
          question: 'エラーコードの検索方法は？',
          answer: 'エラー辞典ページの検索ボックスにエラーコード（例：1004）またはエラーメッセージの一部を入力すると、該当するエラーの説明と解決方法が表示されます。カテゴリフィルターを使って、特定の種類のエラーに絞り込むこともできます。'
        },
        {
          question: '逆引きリファレンスとは？',
          answer: '逆引きリファレンスは、「やりたいこと」から適切なVBAコードを検索できる機能です。例えば、「セルの値を取得したい」「ファイルを開きたい」といったキーワードで検索すると、関連するコード例が表示されます。'
        },
        {
          question: '関数解説ページの使い方は？',
          answer: '関数解説ページでは、VBAの組み込み関数について、構文、パラメータ、戻り値、使用例、注意事項などを詳しく解説しています。関数名で検索したり、カテゴリ別に参照したりできます。'
        }
      ]
    },
    {
      category: '学習・クイズ',
      items: [
        {
          question: 'VBAクイズの難易度は？',
          answer: 'VBAクイズは、初級・中級・上級の3つの難易度に分かれています。初級は基本的な構文や関数、中級は実践的なコーディング、上級は高度なテクニックや最適化に関する問題です。難易度フィルターで自分のレベルに合った問題を選択できます。'
        },
        {
          question: 'クイズの結果は保存されますか？',
          answer: '現在、クイズの結果はブラウザのセッション内でのみ保持され、ページをリロードすると消えてしまいます。将来的にアカウント機能が実装された際に、学習履歴やスコアの保存が可能になる予定です。'
        },
        {
          question: 'UserFormシミュレーターとは？',
          answer: 'UserFormシミュレーターは、VBAのユーザーフォームを視覚的にデザインし、対応するVBAコードを自動生成するツールです。Label、TextBox、Button、CheckBox、ComboBox、ListBoxなどのコントロールを配置し、プロパティを設定することで、実際のUserFormのコードが生成されます。'
        }
      ]
    },
    {
      category: '技術的な質問',
      items: [
        {
          question: 'どのバージョンのVBAに対応していますか？',
          answer: '当サイトで提供するコードは、Excel 2010以降のVBAに対応しています。一部の機能は、Excel 2016以降でのみ動作する場合があります。古いバージョンのExcelをお使いの場合は、コードの互換性にご注意ください。'
        },
        {
          question: 'MacのExcelでも動作しますか？',
          answer: 'ほとんどのコードはMac版Excelでも動作しますが、一部のWindows専用APIや機能は動作しない場合があります。特に、ファイルシステムやレジストリへのアクセスを含むコードは、Mac版では動作しないことがあります。'
        },
        {
          question: 'VBAのセキュリティ設定について教えてください',
          answer: 'VBAマクロを実行するには、Excelのセキュリティ設定で「マクロを有効にする」必要があります。「ファイル」→「オプション」→「セキュリティセンター」→「セキュリティセンターの設定」→「マクロの設定」から設定できます。信頼できるコードのみを実行してください。'
        },
        {
          question: '個別のVBAコード作成を依頼できますか？',
          answer: '申し訳ございませんが、個別のVBAコード作成依頼には対応しておりません。当サイトのツールやスニペットをご活用いただくか、VBAの学習リソースをご参照ください。'
        }
      ]
    },
    {
      category: 'サイトの機能・改善',
      items: [
        {
          question: '新しい機能のリクエストはできますか？',
          answer: 'はい、お問い合わせフォームから「機能要望」を選択して、ご希望の機能をお知らせください。すべてのリクエストにお応えできるわけではありませんが、多くのユーザーから要望がある機能は優先的に検討いたします。'
        },
        {
          question: 'バグを見つけた場合はどうすればいいですか？',
          answer: 'お問い合わせフォームから「バグ報告」を選択して、以下の情報をお知らせください：①発生した問題の詳細、②再現手順、③お使いのブラウザとバージョン、④エラーメッセージ（あれば）。迅速に対応いたします。'
        },
        {
          question: 'モバイルでも使えますか？',
          answer: 'はい、VBA Dev Hubはレスポンシブデザインを採用しており、スマートフォンやタブレットでも快適にご利用いただけます。ただし、コード編集などの一部の機能は、デスクトップブラウザでの使用を推奨します。'
        },
        {
          question: 'オフラインでも使えますか？',
          answer: '現在、オフライン機能は提供しておりません。すべての機能はインターネット接続が必要です。将来的にPWA（Progressive Web App）化を検討しており、オフラインでも一部の機能が使えるようになる可能性があります。'
        }
      ]
    }
  ];

  const filteredFAQ = faqData.map(category => ({
    ...category,
    items: category.items.filter(item =>
      searchQuery === '' ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">よくあるご質問（FAQ）</h1>
          <p className="text-gray-600 mb-8">
            VBA Dev Hubに関するよくあるご質問とその回答をまとめました。
            お探しの情報が見つからない場合は、<a href="/contact" className="text-purple-600 hover:text-purple-700 underline">お問い合わせフォーム</a>からご連絡ください。
          </p>

          {/* 検索ボックス */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="質問を検索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 py-6 text-lg"
              />
            </div>
          </div>

          {/* FAQ一覧 */}
          <div className="space-y-8">
            {filteredFAQ.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <p className="text-gray-600">検索結果が見つかりませんでした。</p>
              </div>
            ) : (
              filteredFAQ.map((category, categoryIndex) => (
                <div key={categoryIndex} className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">
                    {category.category}
                  </h2>
                  <div className="space-y-4">
                    {category.items.map((item, itemIndex) => {
                      const globalIndex = categoryIndex * 100 + itemIndex;
                      const isOpen = openItems.includes(globalIndex);
                      
                      return (
                        <div key={itemIndex} className="border border-gray-200 rounded-lg overflow-hidden">
                          <button
                            onClick={() => toggleItem(globalIndex)}
                            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                          >
                            <span className="font-semibold text-gray-800 pr-4">{item.question}</span>
                            {isOpen ? (
                              <ChevronUp className="w-5 h-5 text-purple-600 flex-shrink-0" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                            )}
                          </button>
                          {isOpen && (
                            <div className="p-4 pt-0 text-gray-600 leading-relaxed">
                              {item.answer}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* お問い合わせへの誘導 */}
          <div className="mt-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-lg p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-3">お探しの情報が見つかりませんでしたか？</h3>
            <p className="mb-6 text-purple-100">
              お問い合わせフォームから、お気軽にご質問ください。
            </p>
            <a
              href="/contact"
              className="inline-block bg-white text-purple-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              お問い合わせする
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
