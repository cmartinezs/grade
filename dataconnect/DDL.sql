-- =========================================================
-- (Opcional) Aislar en schema 'grade'
-- =========================================================
-- CREATE SCHEMA IF NOT EXISTS grade;
-- SET search_path TO grade, public;

-- =========================================================
-- DDL — Catálogos curriculares y jerarquía
-- =========================================================

CREATE TABLE IF NOT EXISTS users (
  user_id     BIGSERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  role        TEXT NOT NULL,                 -- Admin/Coordinator/Teacher
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NULL,
  updated_by  BIGINT NULL REFERENCES users(user_id) ON DELETE SET NULL,
  deleted_at  TIMESTAMPTZ NULL,
  deleted_by  BIGINT NULL REFERENCES users(user_id) ON DELETE SET NULL,
  CONSTRAINT uq_users_email UNIQUE (email)
);

CREATE TABLE IF NOT EXISTS subjects (
  subject_id  BIGSERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  code        VARCHAR(64) NOT NULL,
  active      BOOLEAN NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by  BIGINT NOT NULL REFERENCES users(user_id) ON DELETE RESTRICT,
  updated_at  TIMESTAMPTZ NULL,
  updated_by  BIGINT NULL REFERENCES users(user_id) ON DELETE SET NULL,
  deleted_at  TIMESTAMPTZ NULL,
  deleted_by  BIGINT NULL REFERENCES users(user_id) ON DELETE SET NULL,
  CONSTRAINT uq_subjects_code UNIQUE (code)
);

CREATE TABLE IF NOT EXISTS units (
  unit_id     BIGSERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  subject_fk  BIGINT NOT NULL REFERENCES subjects(subject_id) ON DELETE RESTRICT,
  active      BOOLEAN NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by  BIGINT NOT NULL REFERENCES users(user_id) ON DELETE RESTRICT,
  updated_at  TIMESTAMPTZ NULL,
  updated_by  BIGINT NULL REFERENCES users(user_id) ON DELETE SET NULL,
  deleted_at  TIMESTAMPTZ NULL,
  deleted_by  BIGINT NULL REFERENCES users(user_id) ON DELETE SET NULL,
  CONSTRAINT uq_units_subject_name UNIQUE (subject_fk, name)
);

CREATE TABLE IF NOT EXISTS topics (
  topic_id    BIGSERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  unit_fk     BIGINT NOT NULL REFERENCES units(unit_id) ON DELETE RESTRICT,
  active      BOOLEAN NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by  BIGINT NOT NULL REFERENCES users(user_id) ON DELETE RESTRICT,
  updated_at  TIMESTAMPTZ NULL,
  updated_by  BIGINT NULL REFERENCES users(user_id) ON DELETE SET NULL,
  deleted_at  TIMESTAMPTZ NULL,
  deleted_by  BIGINT NULL REFERENCES users(user_id) ON DELETE SET NULL,
  CONSTRAINT uq_topics_unit_name UNIQUE (unit_fk, name)
);

-- =========================================================
-- DDL — Catálogos de apoyo
-- =========================================================

CREATE TABLE IF NOT EXISTS question_types (
  question_type_id  BIGSERIAL PRIMARY KEY,
  code              VARCHAR(8)  NOT NULL,    -- 'TF' | 'SC' | 'MC'
  name              VARCHAR(64) NOT NULL,
  CONSTRAINT uq_question_types_code UNIQUE (code)
);

CREATE TABLE IF NOT EXISTS difficulties (
  difficulty_id BIGSERIAL PRIMARY KEY,
  level         VARCHAR(32) NOT NULL,        -- Easy/Medium/Hard o similar
  weight        INTEGER,                     -- opcional (ponderador)
  CONSTRAINT uq_difficulties_level UNIQUE (level),
  CONSTRAINT ck_difficulties_weight_nonneg CHECK (weight IS NULL OR weight >= 0)
);

CREATE TABLE IF NOT EXISTS outcomes (
  outcome_id   BIGSERIAL PRIMARY KEY,
  code         VARCHAR(64) NOT NULL,         -- p.ej. LO-SCI-5.2
  description  TEXT NOT NULL,
  subject_fk   BIGINT REFERENCES subjects(subject_id) ON DELETE RESTRICT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_by   BIGINT NOT NULL REFERENCES users(user_id) ON DELETE RESTRICT,
  updated_at   TIMESTAMPTZ NULL,
  updated_by   BIGINT NULL REFERENCES users(user_id) ON DELETE SET NULL,
  deleted_at   TIMESTAMPTZ NULL,
  deleted_by   BIGINT NULL REFERENCES users(user_id) ON DELETE SET NULL,
  CONSTRAINT uq_outcomes_code UNIQUE (code)
);

-- =========================================================
-- DDL — Banco de preguntas
-- =========================================================

CREATE TABLE IF NOT EXISTS questions (
  question_id           BIGSERIAL PRIMARY KEY,
  text                  TEXT NOT NULL,
  active                BOOLEAN NOT NULL DEFAULT TRUE,
  version               INTEGER NOT NULL DEFAULT 1,
  original_question_fk  BIGINT REFERENCES questions(question_id) ON DELETE RESTRICT,
  topic_fk              BIGINT NOT NULL REFERENCES topics(topic_id) ON DELETE RESTRICT,
  difficulty_fk         BIGINT NOT NULL REFERENCES difficulties(difficulty_id) ON DELETE RESTRICT,
  outcome_fk            BIGINT REFERENCES outcomes(outcome_id) ON DELETE SET NULL,
  question_type_fk      BIGINT NOT NULL REFERENCES question_types(question_type_id) ON DELETE RESTRICT,
  user_fk               BIGINT NOT NULL REFERENCES users(user_id) ON DELETE RESTRICT,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at            TIMESTAMPTZ NULL,
  updated_by            BIGINT NULL REFERENCES users(user_id) ON DELETE SET NULL,
  deleted_at            TIMESTAMPTZ NULL,
  deleted_by            BIGINT NULL REFERENCES users(user_id) ON DELETE SET NULL,
  CONSTRAINT ck_questions_version_pos CHECK (version >= 1)
);

CREATE INDEX IF NOT EXISTS idx_questions_topic_active
  ON questions (topic_fk, active);

CREATE TABLE IF NOT EXISTS question_options (
  question_option_id  BIGSERIAL PRIMARY KEY,
  text                TEXT NOT NULL,
  is_correct          BOOLEAN NOT NULL DEFAULT FALSE,
  position            INTEGER NOT NULL,                  -- 1..n
  score               NUMERIC(6,3),
  question_fk         BIGINT NOT NULL REFERENCES questions(question_id) ON DELETE CASCADE,
  CONSTRAINT uq_question_options_text UNIQUE (question_fk, text),
  CONSTRAINT uq_question_options_position UNIQUE (question_fk, position),
  CONSTRAINT ck_question_options_position_pos CHECK (position >= 1),
  CONSTRAINT ck_question_options_score_nonneg CHECK (score IS NULL OR score >= 0)
);

CREATE INDEX IF NOT EXISTS idx_question_options_question
  ON question_options (question_fk);
