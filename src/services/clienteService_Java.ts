import type { Cliente } from '../types/Cliente';

const API_URL = 'http://localhost:32832';

const defaultHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

export const clienteService_Java = {
  // Buscar todos os clientes
  async getAll(): Promise<Cliente[]> {
    try {
      console.log('Iniciando requisição para:', `${API_URL}/clientes`);
      const response = await fetch(`${API_URL}/clientes`, {
        method: 'GET',
        headers: defaultHeaders,
        redirect: 'follow',
      });
      
      console.log('Status da resposta:', response.status);
      console.log('URL final após redirecionamentos:', response.url);
      
      let data;
      if (response.ok) { // Status 2xx (e.g., 200 OK)
        data = await response.json();
      } else if (response.status === 302) { // Status 302 (Found) com corpo JSON
        const responseText = await response.text();
        console.warn('Recebido 302 com corpo. Tentando parsear texto como JSON:', responseText);
        try {
          data = JSON.parse(responseText);
        } catch (parseError) {
          console.error('Falha ao parsear JSON de resposta 302:', parseError);
          throw new Error(`Erro de parse JSON com status 302: ${response.status} ${response.statusText}\nURL: ${response.url}\nCorpo: ${responseText}`);
        }
      } else { // Outros status de erro (e.g., 4xx, 5xx)
        const errorText = await response.text();
        console.error('Resposta de erro:', errorText);
        throw new Error(`Erro ao buscar clientes: ${response.status} ${response.statusText}\nURL: ${response.url}\nCorpo: ${errorText}`);
      }
      
      console.log('Dados recebidos (final):', data);
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Erro detalhado ao buscar clientes (getAll):', error);
      throw error;
    }
  },

  // Buscar cliente por ID
  async getById(id: number): Promise<Cliente> {
    try {
      const response = await fetch(`${API_URL}/cliente/${id}`, {
        method: 'GET',
        headers: defaultHeaders,
      });
      
      if (!response.ok) {
        throw new Error(`Erro ao buscar cliente: ${response.status} ${response.statusText}`);
      }
      
      return response.json();
    } catch (error) {
      console.error(`Erro ao buscar cliente ${id}:`, error);
      throw error;
    }
  },

  // Cadastrar novo cliente
  async create(cliente: Partial<Cliente>): Promise<Cliente> {
    try {
      const response = await fetch(`${API_URL}/cliente/cadastrar`, {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify(cliente),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Resposta de erro (create):', errorText);
        throw new Error(`Erro ao cadastrar cliente: ${response.status} ${response.statusText}\nCorpo: ${errorText}`);
      }
      // O backend retorna 200 OK sem um corpo JSON específico para Cliente, então não chamamos .json()
      return {} as Cliente; 
    } catch (error) {
      console.error('Erro ao cadastrar cliente:', error);
      throw error;
    }
  },

  // Atualizar cliente
  async update(cliente: Partial<Cliente>): Promise<Cliente> {
    try {
      const response = await fetch(`${API_URL}/cliente/atualizar`, {
        method: 'PUT',
        headers: defaultHeaders,
        body: JSON.stringify(cliente),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Resposta de erro (update):', errorText);
        throw new Error(`Erro ao atualizar cliente: ${response.status} ${response.statusText}\nCorpo: ${errorText}`);
      }
      // O backend retorna 200 OK sem um corpo JSON específico para Cliente, então não chamamos .json()
      return {} as Cliente; 
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
      throw error;
    }
  },

  // Excluir cliente
  async delete(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_URL}/cliente/excluir`, {
        method: 'DELETE',
        headers: defaultHeaders,
        body: JSON.stringify({ id }),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Resposta de erro (delete):', errorText);
        throw new Error(`Erro ao excluir cliente: ${response.status} ${response.statusText}\nCorpo: ${errorText}`);
      }
      // O backend retorna 200 OK sem um corpo JSON, então não há necessidade de parsear.
    } catch (error) {
      console.error(`Erro ao excluir cliente ${id}:`, error);
      throw error;
    }
  },
}; 