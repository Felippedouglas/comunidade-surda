import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase';
import { Container, Title, Field, Input, Button, Small } from '../../styles/forms';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSignup(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(cred.user, { displayName: name });
      setLoading(false);
      window.location.href = '/';
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <Container>
      <Title>Cadastrar</Title>
      <form onSubmit={handleSignup}>
        <Field>
          <Input placeholder="Nome" value={name} onChange={e => setName(e.target.value)} required />
        </Field>
        <Field>
          <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        </Field>
        <Field>
          <Input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} required />
        </Field>
        <Button type="submit">{loading ? 'Criando...' : 'Cadastrar'}</Button>
        {error && <Small>{error}</Small>}
      </form>
    </Container>
  );
}
