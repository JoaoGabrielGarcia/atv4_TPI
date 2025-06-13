export interface Telefone {
  id?: number;
  ddd: string;
  numero: string;
}

export interface Endereco {
  id?: number;
  estado: string;
  cidade: string;
  bairro: string;
  rua: string;
  numero: string;
  codigoPostal: string;
  informacoesAdicionais: string;
}

export interface Cliente {
  id?: number;
  nome: string;
  sobreNome: string;
  email?: string;
  endereco: Endereco;
  telefones: Telefone[];
  links?: Array<{ rel: string; href: string }>;
} 