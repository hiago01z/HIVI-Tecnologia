-- Tabela de perfis dos administradores
CREATE TABLE IF NOT EXISTS profiles (
  id         uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nome       text NOT NULL DEFAULT '',
  foto_url   text,
  criado_em  timestamptz NOT NULL DEFAULT now(),
  atualizado_em timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Qualquer visitante pode ler perfis (necessário para exibir autor nos posts)
CREATE POLICY "profiles_public_select" ON profiles
  FOR SELECT USING (true);

-- Usuário autenticado atualiza apenas o próprio perfil
CREATE POLICY "profiles_own_update" ON profiles
  FOR UPDATE TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Usuário autenticado insere apenas o próprio perfil
CREATE POLICY "profiles_own_insert" ON profiles
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = id);

-- Coluna autor_id em blog_posts referenciando profiles
ALTER TABLE blog_posts
  ADD COLUMN IF NOT EXISTS autor_id uuid REFERENCES profiles(id);
