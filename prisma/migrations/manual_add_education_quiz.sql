-- Migration manuelle pour Education & Quiz (CORRIGÉE)
-- À exécuter dans Supabase SQL Editor

-- 1. Ajouter la colonne instructor à Course
ALTER TABLE "Course" ADD COLUMN IF NOT EXISTS "instructor" TEXT;

-- 2. Créer la table Quiz (SANS courseId pour l'instant)
CREATE TABLE IF NOT EXISTS "Quiz" (
  "id" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  
  CONSTRAINT "Quiz_pkey" PRIMARY KEY ("id")
);

-- 3. Créer la table Question
CREATE TABLE IF NOT EXISTS "Question" (
  "id" TEXT NOT NULL,
  "text" TEXT NOT NULL,
  "quizId" TEXT NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0,
  "explanation" TEXT,
  
  CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- 4. Créer la table Answer
CREATE TABLE IF NOT EXISTS "Answer" (
  "id" TEXT NOT NULL,
  "text" TEXT NOT NULL,
  "isCorrect" BOOLEAN NOT NULL DEFAULT false,
  "questionId" TEXT NOT NULL,
  
  CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);

-- 5. Ajouter courseId à Quiz APRÈS avoir créé la table
ALTER TABLE "Quiz" ADD COLUMN IF NOT EXISTS "courseId" TEXT;

-- 6. Ajouter les foreign keys
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'Quiz_courseId_fkey'
  ) THEN
    ALTER TABLE "Quiz" 
      ADD CONSTRAINT "Quiz_courseId_fkey" 
      FOREIGN KEY ("courseId") 
      REFERENCES "Course"("id") 
      ON DELETE SET NULL 
      ON UPDATE CASCADE;
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'Question_quizId_fkey'
  ) THEN
    ALTER TABLE "Question" 
      ADD CONSTRAINT "Question_quizId_fkey" 
      FOREIGN KEY ("quizId") 
      REFERENCES "Quiz"("id") 
      ON DELETE CASCADE 
      ON UPDATE CASCADE;
  END IF;
END $$;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'Answer_questionId_fkey'
  ) THEN
    ALTER TABLE "Answer" 
      ADD CONSTRAINT "Answer_questionId_fkey" 
      FOREIGN KEY ("questionId") 
      REFERENCES "Question"("id") 
      ON DELETE CASCADE 
      ON UPDATE CASCADE;
  END IF;
END $$;

-- 7. Créer les index pour performance
CREATE INDEX IF NOT EXISTS "Question_quizId_idx" ON "Question"("quizId");
CREATE INDEX IF NOT EXISTS "Answer_questionId_idx" ON "Answer"("questionId");

-- 8. Vérification finale
SELECT 
  'Course' as table_name, 
  COUNT(*) as count,
  (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = 'Course' AND column_name = 'instructor') as has_instructor
FROM "Course"
UNION ALL
SELECT 'Quiz', COUNT(*), (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = 'Quiz' AND column_name = 'courseId') FROM "Quiz"
UNION ALL
SELECT 'Question', COUNT(*), 0 FROM "Question"
UNION ALL
SELECT 'Answer', COUNT(*), 0 FROM "Answer";
