import React, { useState, useEffect } from 'react';
import type { Cliente, Telefone } from '../types/Cliente';

interface ClienteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (cliente: Partial<Cliente>) => Promise<void>;
  cliente?: Cliente;
}

export const ClienteModal_Java: React.FC<ClienteModalProps> = ({
  isOpen,
  onClose,
  onSave,
  cliente,
}) => {
  const [formData, setFormData] = useState<Partial<Cliente>>({
    nome: '',
    sobreNome: '',
    email: '',
    endereco: {
      estado: '',
      cidade: '',
      bairro: '',
      rua: '',
      numero: '',
      codigoPostal: '',
      informacoesAdicionais: '',
    },
    telefones: [],
  });

  const [telefone, setTelefone] = useState<Partial<Telefone>>({
    ddd: '',
    numero: '',
  });

  useEffect(() => {
    if (cliente) {
      setFormData(cliente);
    } else {
      setFormData({
        nome: '',
        sobreNome: '',
        email: '',
        endereco: {
          estado: '',
          cidade: '',
          bairro: '',
          rua: '',
          numero: '',
          codigoPostal: '',
          informacoesAdicionais: '',
        },
        telefones: [],
      });
    }
  }, [cliente]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('endereco.')) {
      const enderecoField = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        endereco: {
          ...prev.endereco!,
          [enderecoField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTelefone((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddTelefone = () => {
    if (telefone.ddd && telefone.numero) {
      setFormData((prev) => ({
        ...prev,
        telefones: [...(prev.telefones || []), telefone as Telefone],
      }));
      setTelefone({ ddd: '', numero: '' });
    }
  };

  const handleRemoveTelefone = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      telefones: prev.telefones?.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto mt-10">
        <h2 className="text-2xl font-bold mb-4 text-black">
          {cliente ? 'Editar Cliente' : 'Novo Cliente'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nome</label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
                className="mt-1 block text-black w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Sobrenome</label>
              <input
                type="text"
                name="sobreNome"
                value={formData.sobreNome}
                onChange={handleInputChange}
                className="mt-1 block text-black w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email || ''}
              onChange={handleInputChange}
              className="mt-1 block text-black w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Estado</label>
              <input
                type="text"
                name="endereco.estado"
                value={formData.endereco?.estado}
                onChange={handleInputChange}
                className="mt-1 block text-black w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Cidade</label>
              <input
                type="text"
                name="endereco.cidade"
                value={formData.endereco?.cidade}
                onChange={handleInputChange}
                className="mt-1 block text-black w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Bairro</label>
              <input
                type="text"
                name="endereco.bairro"
                value={formData.endereco?.bairro}
                onChange={handleInputChange}
                className="mt-1 block text-black w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Rua</label>
              <input
                type="text"
                name="endereco.rua"
                value={formData.endereco?.rua}
                onChange={handleInputChange}
                className="mt-1 block text-black w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Número</label>
              <input
                type="text"
                name="endereco.numero"
                value={formData.endereco?.numero}
                onChange={handleInputChange}
                className="mt-1 block text-black w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">CEP</label>
              <input
                type="text"
                name="endereco.codigoPostal"
                value={formData.endereco?.codigoPostal}
                onChange={handleInputChange}
                className="mt-1 block text-black w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Informações Adicionais</label>
            <input
              type="text"
              name="endereco.informacoesAdicionais"
              value={formData.endereco?.informacoesAdicionais || ''}
              onChange={handleInputChange}
              className="mt-1 block text-black w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div className="border-t pt-4">
            <h3 className="text-lg font-medium mb-2 text-black">Telefones</h3>
            <div className="grid grid-cols-2 gap-4 mb-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">DDD</label>
                <input
                  type="text"
                  name="ddd"
                  value={telefone.ddd}
                  onChange={handleTelefoneChange}
                  className="mt-1 block text-black w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Número</label>
                <input
                  type="text"
                  name="numero"
                  value={telefone.numero}
                  onChange={handleTelefoneChange}
                  className="mt-1 block text-black w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={handleAddTelefone}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Adicionar Telefone
            </button>

            <div className="mt-4 space-y-2">
              {formData.telefones?.map((tel, index) => (
                <div key={index} className="flex items-center justify-between text-black bg-gray-50 p-2 rounded">
                  <span>
                    ({tel.ddd}) {tel.numero}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTelefone(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remover
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-white hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 