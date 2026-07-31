'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { useEffect, useCallback, useRef } from 'react';

interface Props {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

function ToolbarButton({
  onClick,
  active,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => {
        e.preventDefault();
        onClick();
      }}
      title={title}
      className={`rounded px-2 py-1 text-sm transition-colors ${
        active
          ? 'bg-[#162268] text-white'
          : 'text-[#374151] hover:bg-[#E5E7EB]'
      }`}
    >
      {children}
    </button>
  );
}

export function RichTextEditor({ value, onChange, placeholder }: Props) {
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  // Prevents onUpdate from calling onChange before the editor is fully ready.
  const isReadyRef = useRef(false);

  // Prevents onChange from being called during programmatic setContent() calls.
  const isSyncingRef = useRef(false);

  // Tracks the last HTML value known to both Tiptap and the parent.
  // Must be declared before useEditor so the onUpdate closure can access it.
  const lastValueRef = useRef(value);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3, 4] },
      }),
      Link.configure({ openOnClick: false, HTMLAttributes: { rel: 'noopener noreferrer' } }),
      Image.configure({ inline: false, allowBase64: false }),
      Placeholder.configure({ placeholder: placeholder ?? '' }),
    ],
    content: value || '',
    onUpdate({ editor }) {
      if (!isReadyRef.current || isSyncingRef.current) return;
      const html = editor.getHTML();
      // Skip if Tiptap produced the same HTML as what we already know about.
      // This blocks spurious onUpdate calls fired during async initialization
      // (e.g. after immediatelyRender:false finishes), which would otherwise
      // corrupt the parent's state with Tiptap's empty-doc representation.
      if (html === lastValueRef.current) return;
      lastValueRef.current = html;
      onChangeRef.current(html);
    },
    editorProps: {
      attributes: {
        class:
          'prose prose-sm max-w-none min-h-[280px] px-4 py-3 outline-none focus:outline-none',
      },
    },
    immediatelyRender: false,
  });

  // Mark the editor as ready after the first render with a non-null editor.
  // Effects run after paint, so this runs after any init-time onUpdate calls.
  // We also sync lastValueRef to Tiptap's actual initial HTML at this point,
  // so that late-firing async onUpdate calls (which pass the same content)
  // are correctly identified as no-ops and ignored.
  useEffect(() => {
    if (editor && !isReadyRef.current) {
      isReadyRef.current = true;
      lastValueRef.current = editor.getHTML();
    }
  }, [editor]);

  // Sync external value changes (e.g., switching locale tabs).
  useEffect(() => {
    if (!editor || !isReadyRef.current) return;
    if (value === lastValueRef.current) return;
    lastValueRef.current = value;
    const current = editor.getHTML();
    if (current !== value) {
      isSyncingRef.current = true;
      editor.commands.setContent(value || '');
      isSyncingRef.current = false;
      // After setContent, re-sync lastValueRef to Tiptap's actual state.
      // Without this, a late async onUpdate from Tiptap would compare against
      // the prop value (e.g. '') instead of Tiptap's normalised output ('<p></p>'),
      // causing a false-positive onChange call.
      lastValueRef.current = editor.getHTML();
    }
  }, [editor, value]);

  const addLink = useCallback(() => {
    if (!editor) return;
    const prev = editor.getAttributes('link').href ?? '';
    const url = window.prompt('URL do link (https:// ou mailto:):', prev);
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
    } else if (url.startsWith('https://') || url.startsWith('mailto:')) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    } else {
      window.alert('Use apenas URLs https:// ou mailto:');
    }
  }, [editor]);

  const addImage = useCallback(() => {
    if (!editor) return;
    const url = window.prompt('URL da imagem (https://):');
    if (!url) return;
    if (url.startsWith('https://')) {
      editor.chain().focus().setImage({ src: url }).run();
    } else {
      window.alert('Use apenas URLs https://');
    }
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="overflow-hidden rounded-lg border border-[#CBD5E1] transition focus-within:border-[#162268] focus-within:ring-2 focus-within:ring-[#162268]/20">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 border-b border-[#E5E7EB] bg-[#F9FAFB] px-2 py-1.5">
        <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Negrito (Ctrl+B)">
          <strong>B</strong>
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Itálico (Ctrl+I)">
          <em>I</em>
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')} title="Tachado">
          <s>S</s>
        </ToolbarButton>

        <span className="mx-1 h-5 w-px bg-[#D1D5DB]" />

        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} title="Título H2">
          H2
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} title="Título H3">
          H3
        </ToolbarButton>

        <span className="mx-1 h-5 w-px bg-[#D1D5DB]" />

        <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Lista com marcadores">
          ≡
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Lista numerada">
          1.
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Citação">
          &ldquo;
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive('codeBlock')} title="Bloco de código">
          {'</>'}
        </ToolbarButton>

        <span className="mx-1 h-5 w-px bg-[#D1D5DB]" />

        <ToolbarButton onClick={addLink} active={editor.isActive('link')} title="Inserir link">
          Link
        </ToolbarButton>
        <ToolbarButton onClick={addImage} title="Inserir imagem">
          Img
        </ToolbarButton>

        <span className="mx-1 h-5 w-px bg-[#D1D5DB]" />

        <ToolbarButton onClick={() => editor.chain().focus().undo().run()} title="Desfazer (Ctrl+Z)">
          ↩
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()} title="Refazer (Ctrl+Y)">
          ↪
        </ToolbarButton>
      </div>

      {/* Editor content */}
      <EditorContent editor={editor} />
    </div>
  );
}
