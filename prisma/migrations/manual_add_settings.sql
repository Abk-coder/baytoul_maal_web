-- Migration manuelle pour Settings
-- À exécuter dans Supabase SQL Editor

-- Créer la table Settings
CREATE TABLE IF NOT EXISTS "Settings" (
  "id" TEXT NOT NULL,
  "siteName" TEXT NOT NULL DEFAULT 'Baytul Maal',
  "siteUrl" TEXT NOT NULL DEFAULT 'https://baytulmaal.sn',
  "description" TEXT,
  "email" TEXT,
  "phone" TEXT,
  "address" TEXT,
  "facebookUrl" TEXT,
  "instagramUrl" TEXT,
  "youtubeUrl" TEXT,
  "bankName" TEXT,
  "accountNumber" TEXT,
  "mobilePayment" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  
  CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- Insérer les paramètres par défaut (un seul enregistrement)
INSERT INTO "Settings" (
  "id",
  "siteName",
  "siteUrl",
  "description",
  "email",
  "phone",
  "address",
  "updatedAt"
) VALUES (
  'default-settings',
  'Baytul Maal',
  'https://baytulmaal.sn',
  'Association caritative musulmane dédiée à la solidarité et à l''entraide.',
  'contact@baytulmaal.sn',
  '+221 XX XXX XX XX',
  'Dakar, Sénégal',
  CURRENT_TIMESTAMP
)
ON CONFLICT ("id") DO NOTHING;

-- Vérification
SELECT * FROM "Settings";
