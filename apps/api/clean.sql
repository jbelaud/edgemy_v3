-- Suppression de toutes les données de la table waitlist
DELETE FROM waitlist;

-- Réinitialisation de la séquence si elle existe
ALTER SEQUENCE IF EXISTS waitlist_id_seq RESTART WITH 1; 