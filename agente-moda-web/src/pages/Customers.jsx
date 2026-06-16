import { useEffect, useState } from 'react';
import api from '../api';

function Customers() {
  const [customers, setCustomers] = useState([]);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      const token = localStorage.getItem('token');

      const response = await api.get('/customers', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setCustomers(response.data);
    };

    void fetchCustomers();
  }, []);

  async function createCustomer() {
    const token = localStorage.getItem('token');

    const response = await api.post(
      '/customers',
      {
        name,
        phone,
        email
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setCustomers([...customers, response.data]);

    setName('');
    setPhone('');
    setEmail('');
  }

  async function deleteCustomer(id) {
    const token = localStorage.getItem('token');

    await api.delete(`/customers/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setCustomers(customers.filter(c => c.id !== id));
  }

  return (
    <div style={{ padding: '30px' }}>
      <h1>👤 Clientes</h1>

      <div style={{ marginBottom: '20px' }}>
        <input
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Telefone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{ marginLeft: '10px' }}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginLeft: '10px' }}
        />

        <button
          onClick={createCustomer}
          style={{ marginLeft: '10px' }}
        >
          Salvar
        </button>
      </div>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {customers.map(customer => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.name}</td>
              <td>{customer.phone}</td>
              <td>{customer.email}</td>

              <td>
                <button
                  onClick={() => deleteCustomer(customer.id)}
                >
                  Excluir
                </button>
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

export default Customers;