import { useState } from 'react';
import ProdutoModal from '../components/ProdutoModal';
import { useData } from '../context/DataContext';

const filtros = [
  { label: 'Todos', value: 'todos' },
  { label: 'Top 10 mais consumidos', value: 'top10' },
];

function filtrarProdutos(produtos: any[], filtro: string) {
  switch (filtro) {
    case 'top10':
      return [...produtos].sort((a, b) => b.quantidadeConsumida - a.quantidadeConsumida).slice(0, 10);
    default:
      return produtos;
  }
}

export default function ProdutosPage() {
  const { produtos, adicionarProduto } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [filtro, setFiltro] = useState('todos');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const produtosFiltrados = filtrarProdutos(produtos, filtro);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProdutos = produtosFiltrados.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(produtosFiltrados.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold">Produtos</h1>
        <div className="flex gap-2 flex-wrap items-center">
          {filtros.map(f => (
            <button
              key={f.value}
              className={`px-3 py-1 rounded border ${filtro === f.value ? 'bg-blue-700 text-white' : 'bg-gray-950 text-blue-700 border-blue-700'} transition`}
              onClick={() => setFiltro(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <button className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition" onClick={() => setModalOpen(true)}>
          Cadastrar Produto
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-700 rounded shadow">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Nome</th>
              <th className="px-4 py-2 text-left">Valor</th>
              <th className="px-4 py-2 text-left">Quantidade Consumida</th>
            </tr>
          </thead>
          <tbody>
            {currentProdutos.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center text-gray-300 py-8">Nenhum produto cadastrado.</td>
              </tr>
            ) : (
              currentProdutos.map((p, i) => (
                <tr key={i} className="border-t border-gray-600">
                  <td className="px-4 py-2">{p.nome}</td>
                  <td className="px-4 py-2">R$ {p.valor.toFixed(2)}</td>
                  <td className="px-4 py-2">{p.quantidadeConsumida}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-6">
        <nav>
          <ul className="inline-flex items-center space-x-1">
            <li>
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Anterior
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <li key={page}>
                <button
                  onClick={() => paginate(page)}
                  className={`px-3 py-2 leading-tight ${page === currentPage ? 'text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700' : 'text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700'} border border-gray-300`}
                >
                  {page}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Próxima
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <ProdutoModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={produto => {
          adicionarProduto(produto);
          setModalOpen(false);
        }}
      />
    </div>
  );
}