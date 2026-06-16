import { useEffect, useState } from 'react';
import api from '../api';

function Orders() {
  const [orders, setOrders] = useState([]);

  async function loadOrders() {
    try {
      const token = localStorage.getItem('token');

      const response = await api.get('/orders', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    (async () => {
      await loadOrders();
    })();
  }, []);

  async function finishOrder(id) {
    try {
      const token = localStorage.getItem('token');

      await api.post(
        `/orders/${id}/finish`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      loadOrders();
    } catch (error) {
      console.log('ERRO AO FINALIZAR:', error);

      if (error.response) {
        alert(error.response.data.message);
      }
    }
  }

  return (
    <div style={{ padding: '30px' }}>
      <h1>🛒 Pedidos</h1>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Total</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>

              <td>{order.status}</td>

              <td>
                {Number(order.total || 0).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </td>

              <td>
                {order.status !== 'completed' && (
                  <button
                    onClick={() => finishOrder(order.id)}
                  >
                    Finalizar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />

      <button
        onClick={() => {
          window.location.href = '/dashboard';
        }}
      >
        Voltar ao Dashboard
      </button>
    </div>
  );
}

export default Orders;