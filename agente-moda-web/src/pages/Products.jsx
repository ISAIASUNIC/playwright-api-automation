import { useEffect, useState } from 'react'; // Importação dos hooks do React para gerenciar estado e efeitos colaterais
import api from '../api';

function Products() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  useEffect(() => {
    let mounted = true;

    async function fetchProducts() {
      try {
        const token = localStorage.getItem('token');
        console.log('TOKEN CREATE:', token);
        const response = await api.get('/products', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log('PRODUTOS:', response.data);

        if (mounted) {
          setProducts(response.data);
        }
      } catch (error) {
        console.log('ERRO:', error);

        if (error.response) {
          console.log('STATUS:', error.response.status);
          console.log('DADOS:', error.response.data);
        }
      }
    }

    fetchProducts();

    return () => {
      mounted = false;
    };
  }, []);
  async function deleteProduct(id) {
    const token = localStorage.getItem('token');

    if (!confirm('Deseja excluir este produto?')) {
      return;
    }

    try {
      await api.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.log('ERRO AO EXCLUIR PRODUTO:', error);
    }
  }

  async function createProduct() {
  try {
    const token = localStorage.getItem('token');

    console.log('TOKEN CREATE:', token);

console.log('DADOS ENVIADOS:', {
  name,
  price,
  stock
});

    const response = await api.post(
      '/products',
      {
        name,
        price: Number(price),
        stock: Number(stock)
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setProducts((prevProducts) => [...prevProducts, response.data]);
    setName('');
    setPrice('');
    setStock('');
  } catch (error) {
    console.log('ERRO AO CRIAR PRODUTO:', error);

    if (error.response) {
      console.log('STATUS:', error.response.status);
      console.log('DADOS:', error.response.data);
    }
  }
}

  return (
// Interface simples para exibir os produtos
  <div style={{ padding: '30px' }}>
    <h1>📦 Gestão de Produtos</h1>

<button
  style={{
    marginBottom: '20px',
    padding: '10px',
    cursor: 'pointer'
  }}
  onClick={() => {
    alert('Cadastro de produto será a próxima etapa');
  }}
>
  + Novo Produto
</button>


<div style={{ marginBottom: '20px' }}>
  <input
    placeholder="Nome"
    value={name}
    onChange={(e) => setName(e.target.value)}
  />

  <input
    placeholder="Preço"
    value={price}
    onChange={(e) => setPrice(e.target.value)}
    style={{ marginLeft: '10px' }}
  />

  <input
    placeholder="Estoque"
    value={stock}
    onChange={(e) => setStock(e.target.value)}
    style={{ marginLeft: '10px' }}
  />

  <button
    onClick={createProduct}
    style={{ marginLeft: '10px' }}
  >
    Salvar
  </button>
</div>


<table 
  style={{
    width: '100%',
    borderCollapse: 'collapse'
  }}
>
  <thead>
    <tr>
      <th>ID</th>
      <th>Nome</th>
      <th>Preço</th>
      <th>Estoque</th>
      <th>Ações</th>
    </tr>
  </thead>
  <tbody>
    {products.map(product => (
      <tr key={product.id}>
        <td>{product.id}</td>
        <td>{product.name}</td>
        <td>R$ {product.price}</td>
        <td>{product.stock}</td>

        <td>
          <button
            onClick={() => {
              alert(`Editar produto ${product.id}`);
            }}
          >
            Editar
          </button>

          <button
            style={{ marginLeft: '10px' }}
            onClick={() => deleteProduct(product.id)}
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

export default Products;