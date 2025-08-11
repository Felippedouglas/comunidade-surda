import { auth } from './firebase';

async function fetchUserProfile() {
  try {
    if (!auth.currentUser) throw new Error('Usuário não está logado');

    // Pega o token JWT do Firebase do usuário atual
    const idToken = await auth.currentUser.getIdToken();

    // Faz a requisição para o backend, passando token no header Authorization
    const response = await fetch('https://seu-backend.vercel.app/me', {
      headers: {
        Authorization: `Bearer ${idToken}`
      }
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    const data = await response.json();
    console.log('Dados do perfil:', data);
    return data;

  } catch (error) {
    console.error('Erro ao buscar perfil:', error.message);
  }
}
