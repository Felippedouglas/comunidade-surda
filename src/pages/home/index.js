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
  const [profileData, setProfileData] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [errorProfile, setErrorProfile] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        setLoadingProfile(true);
        setErrorProfile(null);
        try {
          const token = await u.getIdToken();
          const res = await fetch('https://seu-backend.vercel.app/me', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          if (!res.ok) throw new Error(`Erro ${res.status}`);
          const data = await res.json();
          setProfileData(data);
        } catch (err) {
          setErrorProfile(err.message);
          setProfileData(null);
        } finally {
          setLoadingProfile(false);
        }
      } else {
        setProfileData(null);
        setErrorProfile(null);
      }
    });
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
        {loadingProfile && <p>Carregando perfil...</p>}
        {errorProfile && <p style={{ color: 'red' }}>Erro: {errorProfile}</p>}
        {profileData && (
          <pre style={{ background: '#222', padding: '10px', borderRadius: '8px', color: '#eee' }}>
            {JSON.stringify(profileData, null, 2)}
          </pre>
        )}
        {!loadingProfile && !profileData && !errorProfile && (
          <p>Coloque aqui cards de vídeo em Libras, eventos e comunidades locais.</p>
        )}
      </section>
    </Wrapper>
  );
}
