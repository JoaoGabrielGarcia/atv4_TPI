import { useState } from 'react';
import ClienteModal from '../components/ClienteModal';
import { useData } from '../context/DataContext';

const filtros = [
  { label: 'Todos', value: 'todos' },
  { label: 'Top 10 consumidores (quantidade)', value: 'top10' },
  { label: 'Top 10 menos consumidores', value: 'menos10' },
  { label: 'Top 5 consumidores (valor)', value: 'top5valor' },
];

const generos = [
  { label: 'Todos', value: '' },
  { label: 'Masculino', value: 'Masculino' },
  { label: 'Feminino', value: 'Feminino' },
  { label: 'Outro', value: 'Outro' },
];

function filtrarClientes(clientes: any[], filtro: string, genero: string) {
  let filtrados = clientes;
  if (genero) {
    filtrados = filtrados.filter(c => c.genero === genero);
  }
  switch (filtro) {
    case 'top10':
      return [...filtrados].sort((a, b) => (b.totalProdutos + b.totalServicos) - (a.totalProdutos + a.totalServicos)).slice(0, 10);
    case 'menos10':
      return [...filtrados].sort((a, b) => (a.totalProdutos + a.totalServicos) - (b.totalProdutos + b.totalServicos)).slice(0, 10);
    case 'top5valor':
      return [...filtrados].sort((a, b) => b.valorTotal - a.valorTotal).slice(0, 5);
    default:
      return filtrados;
  }
}

export default function ClientesPage() {
  const { clientes, adicionarCliente } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [filtro, setFiltro] = useState('todos');
  const [genero, setGenero] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const clientesFiltrados = filtrarClientes(clientes, filtro, genero);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentClientes = clientesFiltrados.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(clientesFiltrados.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Clientes</h1>
        <div className="flex gap-2 flex-wrap items-center">
          {filtros.map(f => (
            <button
              key={f.value}
              className={`px-3 py-1 rounded border ${filtro === f.value ? 'bg-blue-700 text-white' : 'bg-white text-blue-700 border-blue-700'} transition`}
              onClick={() => setFiltro(f.value)}
            >
              {f.label}
            </button>
          ))}
          <select
            className="px-3 py-1 rounded border border-blue-700 bg-gray-950 text-blue-700"
            value={genero}
            onChange={e => setGenero(e.target.value)}
          >
            {generos.map(g => (
              <option key={g.value} value={g.value}>{g.label}</option>
            ))}
          </select>
        </div>
        <button className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition" onClick={() => setModalOpen(true)}>
          Cadastrar Cliente
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-700 rounded shadow">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Nome</th>
              <th className="px-4 py-2 text-left">Nome Social</th>
              <th className="px-4 py-2 text-left">Gênero</th>
              <th className="px-4 py-2 text-left">CPF</th>
              <th className="px-4 py-2 text-left">RG</th>
              <th className="px-4 py-2 text-left">Telefone</th>
              <th className="px-4 py-2 text-left">Total Produtos</th>
              <th className="px-4 py-2 text-left">Total Serviços</th>
              <th className="px-4 py-2 text-left">Valor Total</th>
            </tr>
          </thead>
          <tbody>
            {currentClientes.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center text-gray-300 py-8">Nenhum cliente cadastrado.</td>
              </tr>
            ) : (
              currentClientes.map((c, i) => (
                <tr key={i} className="border-t border-gray-600">
                  <td className="px-4 py-2">{c.nome}</td>
                  <td className="px-4 py-2">{c.nomeSocial}</td>
                  <td className="px-4 py-2">{c.genero}</td>
                  <td className="px-4 py-2">{c.cpf}</td>
                  <td className="px-4 py-2">{c.rg}</td>
                  <td className="px-4 py-2">({c.ddd}) {c.telefone}</td>
                  <td className="px-4 py-2">{c.totalProdutos}</td>
                  <td className="px-4 py-2">{c.totalServicos}</td>
                  <td className="px-4 py-2">R$ {c.valorTotal.toFixed(2)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-center">
        <nav>
          <ul className="inline-flex items-center space-x-1">
            <li>
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Anterior
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <li key={page}>
                <button
                  onClick={() => paginate(page)}
                  className={`px-3 py-2 ${page === currentPage ? 'text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700' : 'text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700'} border border-gray-300`}
                >
                  {page}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Próxima
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <ClienteModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={cliente => {
          adicionarCliente(cliente);
          setModalOpen(false);
        }}
      />
    </div>
  );
} 