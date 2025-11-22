'use client';
import Header from '@/components/Header';
import { useState } from 'react';
import { Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ここでは実際の送信処理は行わず、メッセージのみ表示
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">お問い合わせ</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* お問い合わせフォーム */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <p className="text-gray-700 mb-6">
                VBA Dev Hubに関するご質問、ご意見、ご要望などがございましたら、以下のフォームよりお気軽にお問い合わせください。
              </p>

              {submitted ? (
                <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6 text-center">
                  <p className="text-green-700 font-semibold text-lg">お問い合わせありがとうございます！</p>
                  <p className="text-green-600 mt-2">内容を確認次第、ご連絡させていただきます。</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      お名前 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                      placeholder="山田 太郎"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      メールアドレス <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                      placeholder="example@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      件名 <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                    >
                      <option value="">選択してください</option>
                      <option value="general">一般的なお問い合わせ</option>
                      <option value="bug">バグ報告</option>
                      <option value="feature">機能要望</option>
                      <option value="content">コンテンツに関するお問い合わせ</option>
                      <option value="other">その他</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      お問い合わせ内容 <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all resize-none"
                      placeholder="お問い合わせ内容を詳しくご記入ください"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Send size={20} />
                    送信する
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* サイドバー情報 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">よくあるご質問</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• コードは商用利用できますか？</li>
                  <li>• 生成されたコードの著作権は？</li>
                  <li>• 新しい機能のリクエストは？</li>
                </ul>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-3">回答について</h3>
                <p className="text-sm text-gray-600">
                  お問い合わせいただいた内容は、通常2〜3営業日以内にご返信させていただきます。
                </p>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-3">注意事項</h3>
                <p className="text-sm text-gray-600">
                  ※ 個別のVBAコード作成依頼には対応しておりません。<br/>
                  ※ 技術的なサポートは提供しておりません。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
