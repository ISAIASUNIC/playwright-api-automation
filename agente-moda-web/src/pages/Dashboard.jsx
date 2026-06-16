import { useEffect, useState } from 'react';
import api from '../api';

function Dashboard() {
  const [data, setData] = useState({
    totalProducts: 0,
    totalCustomers: 0,
    totalOrders: 0,
    completedOrders: 0,
    salesTotal: 0
  });

  useEffect(() => {
    async function loadDashboard() {
      try {
        const token = localStorage.getItem('token');

        const response = await api.get('/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setData(response.data);
      } catch (err) {
        console.error('Failed to load dashboard', err);
      }
    }

    loadDashboard();
  }, []);

  return (
    <div style={{ padding: '30px' }}>
      <h1>📊 Agente Moda</h1>

      <div style={{ marginTop: '20px' }}>
        <p><strong>Produtos:</strong> {data.totalProducts}</p>
        <p><strong>Clientes:</strong> {data.totalCustomers}</p>
        <p><strong>Pedidos:</strong> {data.totalOrders}</p>
        <p><strong>Pedidos Concluídos:</strong> {data.completedOrders}</p>

        <p>
          <strong>Faturamento:</strong>{' '}
          {Number(data.salesTotal).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          })}
        </p>
      </div>
      
<div style={{ marginTop: '20px' }}>
  <button
    onClick={() => {
      window.location.href = '/products';
    }}
  >
    Produtos
  </button>

  <button
    style={{ marginLeft: '10px' }}
    onClick={() => {
      window.location.href = '/customers';
    }}
  >
    Clientes
  </button>

  <button
    style={{ marginLeft: '10px' }}
    onClick={() => {
      window.location.href = '/orders';
    }}
  >
    Pedidos
  </button>

  <button
    style={{ marginLeft: '10px' }}
    onClick={() => {
      localStorage.removeItem('token');
      window.location.href = '/';
    }}
  >
    Sair
  </button>
</div>
    </div>
  );
}
export default Dashboard;