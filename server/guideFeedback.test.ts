import { describe, it, expect, beforeAll } from 'vitest';
import { appRouter } from '../server/routers';
import type { Context } from '../server/_core/context';

describe('Guide Feedback API', () => {
  const createMockContext = (user?: any): Context => ({
    req: {} as any,
    res: {} as any,
    user: user || null,
  });

  describe('guideFeedback.submit', () => {
    it('should submit feedback successfully', async () => {
      const ctx = createMockContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.guideFeedback.submit({
        guidePage: 'test-guide',
        isHelpful: true,
      });

      expect(result).toEqual({ success: true });
    });

    it('should submit feedback with user ID when authenticated', async () => {
      const ctx = createMockContext({ id: 1, name: 'Test User' });
      const caller = appRouter.createCaller(ctx);

      const result = await caller.guideFeedback.submit({
        guidePage: 'test-guide-auth',
        isHelpful: false,
      });

      expect(result).toEqual({ success: true });
    });
  });

  describe('guideFeedback.getStats', () => {
    it('should return feedback stats', async () => {
      const ctx = createMockContext();
      const caller = appRouter.createCaller(ctx);

      // Submit some feedback first
      await caller.guideFeedback.submit({
        guidePage: 'stats-test',
        isHelpful: true,
      });
      await caller.guideFeedback.submit({
        guidePage: 'stats-test',
        isHelpful: true,
      });
      await caller.guideFeedback.submit({
        guidePage: 'stats-test',
        isHelpful: false,
      });

      const stats = await caller.guideFeedback.getStats({
        guidePage: 'stats-test',
      });

      expect(stats).toHaveProperty('helpful');
      expect(stats).toHaveProperty('notHelpful');
      expect(stats).toHaveProperty('total');
      expect(Number(stats.total)).toBeGreaterThanOrEqual(3);
      expect(Number(stats.helpful)).toBeGreaterThanOrEqual(2);
      expect(Number(stats.notHelpful)).toBeGreaterThanOrEqual(1);
    });

    it('should return zero stats for non-existent guide', async () => {
      const ctx = createMockContext();
      const caller = appRouter.createCaller(ctx);

      const stats = await caller.guideFeedback.getStats({
        guidePage: 'non-existent-guide-' + Date.now(),
      });

      expect(stats).toEqual({
        helpful: 0,
        notHelpful: 0,
        total: 0,
      });
    });
  });
});
