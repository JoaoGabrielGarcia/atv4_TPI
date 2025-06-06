import { useState } from 'react';
import { useData } from '../context/DataContext';

export default function RegistrarConsumoPage() {
  const { clientes, produtos, servicos, registrarConsumo } = useData();
  const [form, setForm] = useState({
    clienteId: '',
    tipo: 'produto' as 'produto' | 'servico',
    itemId: '',
    quantidade: 1
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registrarConsumo({
      ...form,
      data: new Date()
    });
    setForm({
      clienteId: '',
      tipo: 'produto',
      itemId: '',
      quantidade: 1
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'quantidade' ? Number(value) : value
    }));
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-6">Registrar Consumo</h1>
      
      <form onSubmit={handleSubmit} className="max-w-lg bg-gray-700 p-6 rounded-lg shadow">
        <div className="mb-4">
          <label className="block font-medium mb-2">Cliente</label>
          <select
            name="clienteId"
            value={form.clienteId}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 bg-gray-800 text-white"
            required
          >
            <option value="">Selecione um cliente</option>
            {clientes.map(cliente => (
              <option key={cliente.cpf} value={cliente.cpf}>
                {cliente.nome} - {cliente.cpf}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-2">Tipo</label>
          <select
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 bg-gray-800 text-white"
            required
          >
            <option value="produto">Produto</option>
            <option value="servico">Serviço</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-2">
            {form.tipo === 'produto' ? 'Produto' : 'Serviço'}
          </label>
          <select
            name="itemId"
            value={form.itemId}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 bg-gray-800 text-white"
            required
          >
            <option value="">Selecione um {form.tipo}</option>
            {(form.tipo === 'produto' ? produtos : servicos).map(item => (
              <option key={item.nome} value={item.nome}>
                {item.nome} - R$ {item.valor.toFixed(2)}
              </option>
            ))}
          </select>
        </div>

        {form.tipo === 'produto' && (
          <div className="mb-4">
            <label className="block font-medium mb-2">Quantidade</label>
            <input
              type="number"
              name="quantidade"
              value={form.quantidade}
              onChange={handleChange}
              min="1"
              className="w-full border rounded px-3 py-2 bg-gray-800 text-white"
              required
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
        >
          Registrar Consumo
        </button>
      </form>
    </div>
  );
} 