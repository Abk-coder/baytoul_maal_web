-- Migration manuelle pour ajouter WhatsApp, Telegram, TikTok
-- À exécuter dans Supabase SQL Editor

-- Ajouter les nouvelles colonnes pour les réseaux sociaux
ALTER TABLE "Settings" 
  ADD COLUMN IF NOT EXISTS "whatsappUrl" TEXT,
  ADD COLUMN IF NOT EXISTS "telegramUrl" TEXT,
  ADD COLUMN IF NOT EXISTS "tiktokUrl" TEXT;

-- Vérification
SELECT 
  column_name, 
  data_type 
FROM information_schema.columns 
WHERE table_name = 'Settings' 
  AND column_name IN ('whatsappUrl', 'telegramUrl', 'tiktokUrl');
