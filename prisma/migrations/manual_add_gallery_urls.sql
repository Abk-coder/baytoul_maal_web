-- Script SQL pour ajouter la colonne galleryUrls à la table Event sans perdre de données

-- 1. Ajouter la colonne en tant que tableau de texte (TEXT[]) avec une valeur par défaut vide
ALTER TABLE "Event" 
ADD COLUMN "galleryUrls" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- 2. (Optionnel) Vérifier que la colonne a été ajoutée
-- SELECT * FROM "Event" LIMIT 1;
