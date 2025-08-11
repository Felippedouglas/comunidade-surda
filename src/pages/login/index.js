import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { Container, Title, Field, Input, Button, Small } from '../../styles/forms';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      window.location.href = '/';
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <Container>
      <Title>Entrar</Title>
      <form onSubmit={handleLogin}>
        <Field>
          <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        </Field>
        <Field>
          <Input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} required />
        </Field>
        <Button type="submit">{loading ? 'Entrando...' : 'Entrar'}</Button>
        {error && <Small>{error}</Small>}
      </form>
    </Container>
  );
}
