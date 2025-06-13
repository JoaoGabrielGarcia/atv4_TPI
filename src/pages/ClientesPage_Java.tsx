import React, { useState } from 'react';
import type { Cliente } from '../types/Cliente';
import { clienteService_Java } from '../services/clienteService_Java';
import { ClienteModal_Java } from '../components/ClienteModal_Java';

export const ClientesPage_Java: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState<Cliente | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const fetchClientes = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await clienteService_Java.getAll();
      setClientes(data);
      setIsInitialLoad(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar clientes';
      setError(errorMessage);
      console.error('Erro ao carregar clientes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (cliente: Partial<Cliente>) => {
    try {
      setError(null);
      await clienteService_Java.create(cliente);
      await fetchClientes();
      setIsModalOpen(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar cliente';
      setError(errorMessage);
      console.error('Erro ao criar cliente:', err);
    }
  };

  const handleUpdate = async (cliente: Partial<Cliente>) => {
    try {
      setError(null);
      await clienteService_Java.update(cliente);
      await fetchClientes();
      setIsModalOpen(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar cliente';
      setError(errorMessage);
      console.error('Erro ao atualizar cliente:', err);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      try {
        setError(null);
        await clienteService_Java.delete(id);
        await fetchClientes();
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Erro ao excluir cliente';
        setError(errorMessage);
        console.error('Erro ao excluir cliente:', err);
      }
    }
  };

  const handleEdit = (cliente: Cliente) => {
    setSelectedCliente(cliente);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedCliente(undefined);
  };

  const handleModalSave = async (cliente: Partial<Cliente>) => {
    if (selectedCliente) {
      await handleUpdate({ ...cliente, id: selectedCliente.id });
    } else {
      await handleCreate(cliente);
    }
  };

  // Paginação
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = clientes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(clientes.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Clientes Java</h1>
        <div className="flex gap-4">
          {!isInitialLoad && (
            <button
              onClick={fetchClientes}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Atualizar Registros
            </button>
          )}
          {isInitialLoad && (
            <button
              onClick={fetchClientes}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Carregar Clientes
            </button>
          )}
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Novo Cliente
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sobrenome</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cidade</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bairro</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rua</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Número</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CEP</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.map((cliente) => (
                <tr key={cliente.id}>
                  <td className="px-6 py-4 text-sm text-gray-500">{cliente.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{cliente.nome}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{cliente.sobreNome}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{cliente.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{cliente.endereco.estado}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{cliente.endereco.cidade}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{cliente.endereco.bairro}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{cliente.endereco.rua}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{cliente.endereco.numero}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{cliente.endereco.codigoPostal}</td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <div className='grid p-2 space-y-1'><button
                      onClick={() => handleEdit(cliente)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(cliente.id!)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Excluir
                    </button>
                    </div>
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {!isInitialLoad && clientes.length > 0 && (
        <div className="mt-4 flex justify-center">
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Anterior
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                  currentPage === page
                    ? 'text-indigo-600 bg-indigo-50'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Próxima
            </button>
          </nav>
        </div>
      )}

      <ClienteModal_Java
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleModalSave}
        cliente={selectedCliente}
      />
    </div>
  );
}; 