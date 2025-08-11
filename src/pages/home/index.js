import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import styled from 'styled-components';

const Wrapper = styled.div`
  max-width: 900px;
  margin: 40px auto;
  padding: 20px;
  background: var(--card);
  border-radius: 12px;
`;
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export default function Home() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, u => setUser(u));
    return unsub;
  }, []);

  async function handleSignOut() {
    await signOut(auth);
    window.location.href = '/login';
  }

  return (
    <Wrapper>
      <Top>
        <div>
          <h2>Comunidade Surda</h2>
          <p>Comunidade e troca em Libras</p>
        </div>
        <div>
          {user ? (
            <>
              <div>{user.displayName || user.email}</div>
              <button onClick={handleSignOut}>Sair</button>
            </>
          ) : (
            <a href="/login">Entrar</a>
          )}
        </div>
      </Top>
      <section>
        <h3>Feed</h3>
        <p>Coloque aqui cards de vídeo em Libras, eventos e comunidades locais.</p>
      </section>
    </Wrapper>
  );
}
