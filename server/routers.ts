import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  snippets: router({
    list: publicProcedure
      .input(z.object({
        category: z.string().optional(),
        search: z.string().optional(),
        sortBy: z.enum(['recent', 'popular', 'likes']).optional(),
        limit: z.number().optional(),
        offset: z.number().optional(),
      }).optional())
      .query(async ({ input }) => {
        return await db.getSnippets(input);
      }),
    
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const snippet = await db.getSnippetById(input.id);
        if (snippet) {
          await db.incrementSnippetViews(input.id);
        }
        return snippet;
      }),

    create: protectedProcedure
      .input(z.object({
        title: z.string().min(1).max(255),
        description: z.string().optional(),
        code: z.string().min(1),
        category: z.string().optional(),
        tags: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        return await db.createSnippet({
          ...input,
          userId: ctx.user.id,
        });
      }),

    toggleLike: protectedProcedure
      .input(z.object({ snippetId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        return await db.toggleSnippetLike(ctx.user.id, input.snippetId);
      }),

    checkLike: protectedProcedure
      .input(z.object({ snippetId: z.number() }))
      .query(async ({ ctx, input }) => {
        return await db.getUserSnippetLike(ctx.user.id, input.snippetId);
      }),
  }),

  errorCodes: router({
    list: publicProcedure
      .input(z.object({
        search: z.string().optional(),
        limit: z.number().optional(),
        offset: z.number().optional(),
      }).optional())
      .query(async ({ input }) => {
        return await db.getErrorCodes(input);
      }),

    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getErrorCodeById(input.id);
      }),
  }),

  references: router({
    list: publicProcedure
      .input(z.object({
        type: z.string().optional(),
        category: z.string().optional(),
        search: z.string().optional(),
        limit: z.number().optional(),
        offset: z.number().optional(),
      }).optional())
      .query(async ({ input }) => {
        return await db.getVbaReferences(input);
      }),

    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getVbaReferenceById(input.id);
      }),
  }),

  quiz: router({
    getQuestions: publicProcedure
      .input(z.object({
        difficulty: z.string().optional(),
        category: z.string().optional(),
        limit: z.number().optional(),
      }).optional())
      .query(async ({ input }) => {
        return await db.getQuizQuestions(input);
      }),

    submitAnswer: protectedProcedure
      .input(z.object({
        questionId: z.number(),
        selectedAnswer: z.number(),
        isCorrect: z.boolean(),
      }))
      .mutation(async ({ ctx, input }) => {
        await db.saveQuizAttempt({
          userId: ctx.user.id,
          ...input,
        });
        return { success: true };
      }),

    getStats: protectedProcedure
      .query(async ({ ctx }) => {
        return await db.getUserQuizStats(ctx.user.id);
      }),
  }),

  codeTemplates: router({
    list: publicProcedure
      .input(z.object({
        category: z.string().optional(),
      }).optional())
      .query(async ({ input }) => {
        return await db.getCodeTemplates(input?.category);
      }),

    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const template = await db.getCodeTemplateById(input.id);
        if (template) {
          await db.incrementTemplateUsage(input.id);
        }
        return template;
      }),
  }),

  guideFeedback: router({
    submit: publicProcedure
      .input(z.object({
        guidePage: z.string(),
        isHelpful: z.boolean(),
      }))
      .mutation(async ({ ctx, input }) => {
        return await db.submitGuideFeedback({
          guidePage: input.guidePage,
          isHelpful: input.isHelpful,
          userId: ctx.user?.id,
        });
      }),

    getStats: publicProcedure
      .input(z.object({ guidePage: z.string() }))
      .query(async ({ input }) => {
        return await db.getGuideFeedbackStats(input.guidePage);
      }),
  }),

  tools: router({
    formatCode: publicProcedure
      .input(z.object({
        code: z.string(),
        indentSize: z.number().optional().default(4),
      }))
      .mutation(async ({ input }) => {
        // Simple VBA code formatter
        const lines = input.code.split('\n');
        let indentLevel = 0;
        const formatted = lines.map(line => {
          const trimmed = line.trim();
          if (!trimmed) return '';
          
          // Decrease indent for End statements
          if (trimmed.match(/^End (Sub|Function|If|With|Select|For|While|Property)/i)) {
            indentLevel = Math.max(0, indentLevel - 1);
          }
          
          const indented = ' '.repeat(indentLevel * input.indentSize) + trimmed;
          
          // Increase indent after certain keywords
          if (trimmed.match(/^(Sub|Function|If|With|Select Case|For|While|Do|Property)/i) && 
              !trimmed.match(/^End /i)) {
            indentLevel++;
          }
          
          return indented;
        });
        
        return { formatted: formatted.join('\n') };
      }),

    testRegex: publicProcedure
      .input(z.object({
        pattern: z.string(),
        testString: z.string(),
        flags: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        try {
          const regex = new RegExp(input.pattern, input.flags || 'g');
          const matches: Array<{ match: string; index: number; groups: string[] }> = [];
          let match;
          
          while ((match = regex.exec(input.testString)) !== null) {
            matches.push({
              match: match[0],
              index: match.index,
              groups: match.slice(1),
            });
            if (!input.flags?.includes('g')) break;
          }
          
          return {
            success: true,
            matches,
          };
        } catch (error) {
          return {
            success: false,
            error: error instanceof Error ? error.message : 'Invalid regex pattern',
          };
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
