'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function ProfileMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [initials, setInitials] = useState<string>('U');
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const name = (user?.user_metadata?.name as string | undefined) || user?.email || 'User';
      const init =
        name.trim().split(' ').map(p => p[0]?.toUpperCase()).slice(0, 2).join('') || 'U';
      setInitials(init);
    })();
  }, []);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, [open]);

  async function signOut() {
    await supabase.auth.signOut();
    document.cookie = 'ml-session=; Path=/; Max-Age=0; SameSite=Lax';
    router.push('/');
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(o => !o)}
        className="h-9 w-9 rounded-full bg-background border border-borderc flex items-center justify-center font-semibold"
        aria-label="Abrir menu do usuário"
      >
        {initials}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-card border border-borderc rounded-xl shadow z-50">
          <button className="w-full text-left px-3 py-2 hover:bg-primary/10 rounded-t-xl">
            Perfil
          </button>
          <button className="w-full text-left px-3 py-2 hover:bg-primary/10">
            Suporte
          </button>
          <button
            onClick={signOut}
            className="w-full text-left px-3 py-2 text-error hover:bg-error/10 rounded-b-xl"
          >
            Sair
          </button>
        </div>
      )}
    </div>
  );
}
