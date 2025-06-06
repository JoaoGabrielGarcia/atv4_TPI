import { createContext, useContext, useState, ReactNode } from 'react';
import { mockClients } from '../data/mockClients';
import { mockProducts } from '../data/mockProducts';
import { mockServices } from '../data/mockServices';

// Interfaces
interface Client {
  nome: string;
  nomeSocial: string;
  genero: string;
  cpf: string;
  rg: string;
  dataCadastro: Date;
  ddd: string;
  telefone: string;
  totalProdutos: number;
  totalServicos: number;
  valorTotal: number;
}

interface Product {
  nome: string;
  valor: number;
  quantidadeConsumida: number;
}

interface Service {
  nome: string;
  valor: number;
  quantidadeConsumida: number;
}

interface Consumo {
  id: string;
  clienteId: string;
  tipo: 'produto' | 'servico';
  itemId: string;
  quantidade: number;
  valorUnitario: number;
  data: Date;
}

// Mock de consumos iniciais
const mockConsumos: Consumo[] = [
  // Ana Silva - Consumos
  {
    id: '1',
    clienteId: '123.456.789-01',
    tipo: 'produto',
    itemId: 'Shampoo Fortificante',
    quantidade: 2,
    valorUnitario: 24.90,
    data: new Date(2024, 4, 20)
  },
  {
    id: '2',
    clienteId: '123.456.789-01',
    tipo: 'servico',
    itemId: 'Corte e pintura de cabelos femininos',
    quantidade: 1,
    valorUnitario: 200.0,
    data: new Date(2024, 4, 20)
  },
  // Bruno Souza - Consumos
  {
    id: '3',
    clienteId: '123.456.789-02',
    tipo: 'produto',
    itemId: 'Condicionador Nutritivo',
    quantidade: 1,
    valorUnitario: 25.90,
    data: new Date(2024, 4, 21)
  },
  {
    id: '4',
    clienteId: '123.456.789-02',
    tipo: 'servico',
    itemId: 'Corte de cabelo masculino',
    quantidade: 1,
    valorUnitario: 60.0,
    data: new Date(2024, 4, 21)
  },
  // Carla Oliveira - Consumos
  {
    id: '5',
    clienteId: '123.456.789-03',
    tipo: 'produto',
    itemId: 'Hidratante Facial',
    quantidade: 3,
    valorUnitario: 49.90,
    data: new Date(2024, 4, 22)
  },
  {
    id: '6',
    clienteId: '123.456.789-03',
    tipo: 'servico',
    itemId: 'Design de sobrancelhas',
    quantidade: 1,
    valorUnitario: 70.0,
    data: new Date(2024, 4, 22)
  }
];

// Context
interface DataContextType {
  clientes: Client[];
  produtos: Product[];
  servicos: Service[];
  consumos: Consumo[];

  adicionarCliente: (cliente: Omit<Client, 'totalProdutos' | 'totalServicos' | 'valorTotal'>) => void;
  editarCliente: (cliente: Client) => void;
  excluirCliente: (cpf: string) => void;

  adicionarProduto: (produto: Omit<Product, 'quantidadeConsumida'>) => void;
  editarProduto: (produto: Product) => void;
  excluirProduto: (nome: string) => void;

  adicionarServico: (servico: Omit<Service, 'quantidadeConsumida'>) => void;
  editarServico: (servico: Service) => void;
  excluirServico: (nome: string) => void;

  registrarConsumo: (consumo: Omit<Consumo, 'id' | 'valorUnitario'>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Função para calcular os totais iniciais dos clientes
function calcularTotaisIniciais(clientes: Client[], consumos: Consumo[]): Client[] {
  return clientes.map(cliente => {
    const consumosCliente = consumos.filter(c => c.clienteId === cliente.cpf);
    const totalProdutos = consumosCliente
      .filter(c => c.tipo === 'produto')
      .reduce((acc, c) => acc + c.quantidade, 0);
    const totalServicos = consumosCliente
      .filter(c => c.tipo === 'servico')
      .length;
    const valorTotal = consumosCliente
      .reduce((acc, c) => acc + (c.valorUnitario * c.quantidade), 0);

    return {
      ...cliente,
      totalProdutos,
      totalServicos,
      valorTotal
    };
  });
}

// Função para calcular as quantidades consumidas iniciais
function calcularQuantidadesConsumidasIniciais(items: (Product | Service)[], consumos: Consumo[]): (Product | Service)[] {
  return items.map(item => {
    const consumosItem = consumos.filter(c => c.itemId === item.nome);
    const quantidadeConsumida = consumosItem.reduce((acc, c) => acc + c.quantidade, 0);
    return {
      ...item,
      quantidadeConsumida
    };
  });
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [clientes, setClientes] = useState<Client[]>(calcularTotaisIniciais(mockClients, mockConsumos));
  const [produtos, setProdutos] = useState<Product[]>(calcularQuantidadesConsumidasIniciais(mockProducts, mockConsumos) as Product[]);
  const [servicos, setServicos] = useState<Service[]>(calcularQuantidadesConsumidasIniciais(mockServices, mockConsumos) as Service[]);
  const [consumos, setConsumos] = useState<Consumo[]>(mockConsumos);

  const adicionarCliente = (cliente: Omit<Client, 'totalProdutos' | 'totalServicos' | 'valorTotal'>) => {
    setClientes([...clientes, { ...cliente, totalProdutos: 0, totalServicos: 0, valorTotal: 0 }]);
  };

  const editarCliente = (cliente: Client) => {
    setClientes(clientes.map(c => c.cpf === cliente.cpf ? cliente : c));
  };

  const excluirCliente = (cpf: string) => {
    setClientes(clientes.filter(c => c.cpf !== cpf));
  };

  const adicionarProduto = (produto: Omit<Product, 'quantidadeConsumida'>) => {
    setProdutos([...produtos, { ...produto, quantidadeConsumida: 0 }]);
  };

  const editarProduto = (produto: Product) => {
    setProdutos(produtos.map(p => p.nome === produto.nome ? produto : p));
  };

  const excluirProduto = (nome: string) => {
    setProdutos(produtos.filter(p => p.nome !== nome));
  };

  const adicionarServico = (servico: Omit<Service, 'quantidadeConsumida'>) => {
    setServicos([...servicos, { ...servico, quantidadeConsumida: 0 }]);
  };

  const editarServico = (servico: Service) => {
    setServicos(servicos.map(s => s.nome === servico.nome ? servico : s));
  };

  const excluirServico = (nome: string) => {
    setServicos(servicos.filter(s => s.nome !== nome));
  };

  const registrarConsumo = (consumo: Omit<Consumo, 'id' | 'valorUnitario'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const valorUnitario = consumo.tipo === 'produto' 
      ? produtos.find(p => p.nome === consumo.itemId)?.valor || 0
      : servicos.find(s => s.nome === consumo.itemId)?.valor || 0;

    const novoConsumo: Consumo = {
      ...consumo,
      id,
      valorUnitario
    };

    setConsumos([...consumos, novoConsumo]);

    // Atualizar totais do cliente
    setClientes(clientes.map(cliente => {
      if (cliente.cpf === consumo.clienteId) {
        const novosConsumos = [...consumos, novoConsumo].filter(c => c.clienteId === cliente.cpf);
        const totalProdutos = novosConsumos
          .filter(c => c.tipo === 'produto')
          .reduce((acc, c) => acc + c.quantidade, 0);
        const totalServicos = novosConsumos
          .filter(c => c.tipo === 'servico')
          .length;
        const valorTotal = novosConsumos
          .reduce((acc, c) => acc + (c.valorUnitario * c.quantidade), 0);

        return {
          ...cliente,
          totalProdutos,
          totalServicos,
          valorTotal
        };
      }
      return cliente;
    }));

    // Atualizar quantidade consumida do produto/serviço
    if (consumo.tipo === 'produto') {
      setProdutos(produtos.map(produto => {
        if (produto.nome === consumo.itemId) {
          return {
            ...produto,
            quantidadeConsumida: produto.quantidadeConsumida + consumo.quantidade
          };
        }
        return produto;
      }));
    } else {
      setServicos(servicos.map(servico => {
        if (servico.nome === consumo.itemId) {
          return {
            ...servico,
            quantidadeConsumida: servico.quantidadeConsumida + 1
          };
        }
        return servico;
      }));
    }
  };

  return (
    <DataContext.Provider value={{
      clientes,
      produtos,
      servicos,
      consumos,
      adicionarCliente,
      editarCliente,
      excluirCliente,
      adicionarProduto,
      editarProduto,
      excluirProduto,
      adicionarServico,
      editarServico,
      excluirServico,
      registrarConsumo
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
} 