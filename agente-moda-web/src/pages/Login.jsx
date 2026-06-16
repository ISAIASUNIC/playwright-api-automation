import { useState } from 'react';
import api from '../api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await api.post('/sessions', {
        email,
        password
      });

      window.location.href = '/dashboard';

      console.log(response.data);

      localStorage.setItem('token', response.data.token);
    } catch (error) {
      console.log(error);

      alert(
        error?.response?.data?.message ||
        error.message ||
        'Erro desconhecido'
      );
    }
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}>
      <form
        onSubmit={handleLogin}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          width: '300px'
        }}
      >
        <h1>Agente Moda</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;