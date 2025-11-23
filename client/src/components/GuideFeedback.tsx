import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { toast } from 'sonner';

interface GuideFeedbackProps {
  guidePage: string;
}

export function GuideFeedback({ guidePage }: GuideFeedbackProps) {
  const [submitted, setSubmitted] = useState(false);
  const submitFeedback = trpc.guideFeedback.submit.useMutation();
  const { data: stats } = trpc.guideFeedback.getStats.useQuery({ guidePage });

  const handleFeedback = async (isHelpful: boolean) => {
    try {
      await submitFeedback.mutateAsync({ guidePage, isHelpful });
      setSubmitted(true);
      toast.success('フィードバックをありがとうございます！');
    } catch (error) {
      toast.error('フィードバックの送信に失敗しました');
    }
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <p className="text-green-900 font-semibold mb-2">
          ✓ フィードバックをありがとうございます！
        </p>
        <p className="text-green-700 text-sm">
          あなたのご意見は、ガイドの改善に役立てられます。
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
        この記事は役に立ちましたか？
      </h3>
      <div className="flex gap-4 justify-center mb-4">
        <Button
          onClick={() => handleFeedback(true)}
          disabled={submitFeedback.isPending}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
        >
          <ThumbsUp className="w-5 h-5" />
          役に立った
        </Button>
        <Button
          onClick={() => handleFeedback(false)}
          disabled={submitFeedback.isPending}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ThumbsDown className="w-5 h-5" />
          役に立たなかった
        </Button>
      </div>
      {stats && stats.total > 0 && (
        <div className="text-center text-sm text-gray-600">
          <p>
            {stats.total}人中{stats.helpful}人が「役に立った」と回答
            {stats.total > 0 && ` (${Math.round((stats.helpful / stats.total) * 100)}%)`}
          </p>
        </div>
      )}
    </div>
  );
}
