import { eq, desc, sql, and, like, or } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, 
  users, 
  snippets, 
  InsertSnippet,
  snippetLikes,
  errorCodes,
  InsertErrorCode,
  vbaReferences,
  InsertVbaReference,
  quizQuestions,
  InsertQuizQuestion,
  quizAttempts,
  InsertQuizAttempt,
  codeTemplates,
  InsertCodeTemplate,
  guideFeedback,
  InsertGuideFeedback
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Snippet functions
export async function createSnippet(snippet: InsertSnippet) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const result = await db.insert(snippets).values(snippet);
  return result;
}

export async function getSnippets(params?: { 
  category?: string; 
  search?: string; 
  limit?: number; 
  offset?: number;
  sortBy?: 'recent' | 'popular' | 'likes';
}) {
  const db = await getDb();
  if (!db) return [];

  let query = db.select().from(snippets);
  
  const conditions = [];
  if (params?.category) {
    conditions.push(eq(snippets.category, params.category));
  }
  if (params?.search) {
    conditions.push(
      or(
        like(snippets.title, `%${params.search}%`),
        like(snippets.description, `%${params.search}%`),
        like(snippets.tags, `%${params.search}%`)
      )
    );
  }
  
  if (conditions.length > 0) {
    query = query.where(and(...conditions)) as any;
  }

  if (params?.sortBy === 'popular') {
    query = query.orderBy(desc(snippets.views)) as any;
  } else if (params?.sortBy === 'likes') {
    query = query.orderBy(desc(snippets.likes)) as any;
  } else {
    query = query.orderBy(desc(snippets.createdAt)) as any;
  }

  if (params?.limit) {
    query = query.limit(params.limit) as any;
  }
  if (params?.offset) {
    query = query.offset(params.offset) as any;
  }

  return await query;
}

export async function getSnippetById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(snippets).where(eq(snippets.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function incrementSnippetViews(id: number) {
  const db = await getDb();
  if (!db) return;

  await db.update(snippets)
    .set({ views: sql`${snippets.views} + 1` })
    .where(eq(snippets.id, id));
}

export async function toggleSnippetLike(userId: number, snippetId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const existing = await db.select()
    .from(snippetLikes)
    .where(and(eq(snippetLikes.userId, userId), eq(snippetLikes.snippetId, snippetId)))
    .limit(1);

  if (existing.length > 0) {
    await db.delete(snippetLikes)
      .where(and(eq(snippetLikes.userId, userId), eq(snippetLikes.snippetId, snippetId)));
    await db.update(snippets)
      .set({ likes: sql`${snippets.likes} - 1` })
      .where(eq(snippets.id, snippetId));
    return { liked: false };
  } else {
    await db.insert(snippetLikes).values({ userId, snippetId });
    await db.update(snippets)
      .set({ likes: sql`${snippets.likes} + 1` })
      .where(eq(snippets.id, snippetId));
    return { liked: true };
  }
}

export async function getUserSnippetLike(userId: number, snippetId: number) {
  const db = await getDb();
  if (!db) return false;

  const result = await db.select()
    .from(snippetLikes)
    .where(and(eq(snippetLikes.userId, userId), eq(snippetLikes.snippetId, snippetId)))
    .limit(1);

  return result.length > 0;
}

// Error code functions
export async function getErrorCodes(params?: { search?: string; limit?: number; offset?: number }) {
  const db = await getDb();
  if (!db) return [];

  let query = db.select().from(errorCodes);

  if (params?.search) {
    query = query.where(
      or(
        like(errorCodes.errorNumber, `%${params.search}%`),
        like(errorCodes.errorName, `%${params.search}%`),
        like(errorCodes.description, `%${params.search}%`)
      )
    ) as any;
  }

  query = query.orderBy(errorCodes.errorNumber) as any;

  if (params?.limit) {
    query = query.limit(params.limit) as any;
  }
  if (params?.offset) {
    query = query.offset(params.offset) as any;
  }

  return await query;
}

export async function getErrorCodeById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(errorCodes).where(eq(errorCodes.id, id)).limit(1);
  if (result.length > 0) {
    await db.update(errorCodes)
      .set({ views: sql`${errorCodes.views} + 1` })
      .where(eq(errorCodes.id, id));
  }
  return result.length > 0 ? result[0] : undefined;
}

// VBA Reference functions
export async function getVbaReferences(params?: { 
  type?: string; 
  category?: string; 
  search?: string; 
  limit?: number; 
  offset?: number 
}) {
  const db = await getDb();
  if (!db) return [];

  let query = db.select().from(vbaReferences);

  const conditions = [];
  if (params?.type) {
    conditions.push(eq(vbaReferences.type, params.type as any));
  }
  if (params?.category) {
    conditions.push(eq(vbaReferences.category, params.category));
  }
  if (params?.search) {
    conditions.push(
      or(
        like(vbaReferences.name, `%${params.search}%`),
        like(vbaReferences.description, `%${params.search}%`)
      )
    );
  }

  if (conditions.length > 0) {
    query = query.where(and(...conditions)) as any;
  }

  query = query.orderBy(vbaReferences.name) as any;

  if (params?.limit) {
    query = query.limit(params.limit) as any;
  }
  if (params?.offset) {
    query = query.offset(params.offset) as any;
  }

  return await query;
}

export async function getVbaReferenceById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(vbaReferences).where(eq(vbaReferences.id, id)).limit(1);
  if (result.length > 0) {
    await db.update(vbaReferences)
      .set({ views: sql`${vbaReferences.views} + 1` })
      .where(eq(vbaReferences.id, id));
  }
  return result.length > 0 ? result[0] : undefined;
}

// Quiz functions
export async function getQuizQuestions(params?: { 
  difficulty?: string; 
  category?: string; 
  limit?: number 
}) {
  const db = await getDb();
  if (!db) return [];

  let query = db.select().from(quizQuestions);

  const conditions = [];
  if (params?.difficulty) {
    conditions.push(eq(quizQuestions.difficulty, params.difficulty as any));
  }
  if (params?.category) {
    conditions.push(eq(quizQuestions.category, params.category));
  }

  if (conditions.length > 0) {
    query = query.where(and(...conditions)) as any;
  }

  if (params?.limit) {
    query = query.limit(params.limit) as any;
  }

  return await query;
}

export async function saveQuizAttempt(attempt: InsertQuizAttempt) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.insert(quizAttempts).values(attempt);
}

export async function getUserQuizStats(userId: number) {
  const db = await getDb();
  if (!db) return { total: 0, correct: 0, accuracy: 0 };

  const result = await db.select({
    total: sql<number>`COUNT(*)`,
    correct: sql<number>`SUM(CASE WHEN ${quizAttempts.isCorrect} THEN 1 ELSE 0 END)`
  })
  .from(quizAttempts)
  .where(eq(quizAttempts.userId, userId));

  const stats = result[0];
  const accuracy = stats.total > 0 ? (stats.correct / stats.total) * 100 : 0;

  return {
    total: stats.total,
    correct: stats.correct,
    accuracy: Math.round(accuracy)
  };
}

// Code template functions
export async function getCodeTemplates(category?: string) {
  const db = await getDb();
  if (!db) return [];

  let query = db.select().from(codeTemplates);

  if (category) {
    query = query.where(eq(codeTemplates.category, category)) as any;
  }

  query = query.orderBy(desc(codeTemplates.usageCount)) as any;

  return await query;
}

export async function getCodeTemplateById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(codeTemplates).where(eq(codeTemplates.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function incrementTemplateUsage(id: number) {
  const db = await getDb();
  if (!db) return;

  await db.update(codeTemplates)
    .set({ usageCount: sql`${codeTemplates.usageCount} + 1` })
    .where(eq(codeTemplates.id, id));
}

// Guide feedback functions
export async function submitGuideFeedback(feedback: InsertGuideFeedback) {
  const db = await getDb();
  if (!db) return { success: false };

  await db.insert(guideFeedback).values(feedback);
  return { success: true };
}

export async function getGuideFeedbackStats(guidePage: string) {
  const db = await getDb();
  if (!db) return { helpful: 0, notHelpful: 0, total: 0 };

  const result = await db.select({
    helpful: sql<number>`SUM(CASE WHEN ${guideFeedback.isHelpful} THEN 1 ELSE 0 END)`,
    notHelpful: sql<number>`SUM(CASE WHEN NOT ${guideFeedback.isHelpful} THEN 1 ELSE 0 END)`,
    total: sql<number>`COUNT(*)`
  })
  .from(guideFeedback)
  .where(eq(guideFeedback.guidePage, guidePage));

  const stats = result[0];
  return {
    helpful: stats.helpful || 0,
    notHelpful: stats.notHelpful || 0,
    total: stats.total || 0
  };
}
