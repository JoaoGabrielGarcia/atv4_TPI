interface Client {
  nome: string;
  nomeSocial: string;
  genero: string;
  cpf: string;
  rg: string;
  dataCadastro: Date;
  ddd: string;
  telefone: string;
}

export const mockClients: Client[] = [
  {
    nome: 'Ana Silva',
    nomeSocial: 'Ana S.',
    genero: 'Feminino',
    cpf: '123.456.789-01',
    rg: '89759465',
    dataCadastro: new Date(2024, 4, 20),
    ddd: '12',
    telefone: '978465123'
  },
  {
    nome: 'Bruno Souza',
    nomeSocial: 'Bruno S.',
    genero: 'Masculino',
    cpf: '123.456.789-02',
    rg: '89759466',
    dataCadastro: new Date(2024, 4, 21),
    ddd: '13',
    telefone: '978465124'
  },
  {
    nome: 'Carla Oliveira',
    nomeSocial: 'Carla O.',
    genero: 'Feminino',
    cpf: '123.456.789-03',
    rg: '89759467',
    dataCadastro: new Date(2024, 4, 22),
    ddd: '14',
    telefone: '978465125'
  },
  {
    nome: 'Diego Santos',
    nomeSocial: 'Diego S.',
    genero: 'Masculino',
    cpf: '123.456.789-04',
    rg: '89759468',
    dataCadastro: new Date(2024, 4, 23),
    ddd: '15',
    telefone: '978465126'
  },
  {
    nome: 'Eduarda Lima',
    nomeSocial: 'Edu Lima',
    genero: 'Feminino',
    cpf: '123.456.789-05',
    rg: '89759469',
    dataCadastro: new Date(1995, 0, 28),
    ddd: '16',
    telefone: '978465127'
  },
  {
    nome: 'Fernando Gomes',
    nomeSocial: 'Fern Gomes',
    genero: 'Masculino',
    cpf: '123.456.789-06',
    rg: '89759470',
    dataCadastro: new Date(1987, 8, 9),
    ddd: '17',
    telefone: '978465128'
  },
  {
    nome: 'Gabriela Costa',
    nomeSocial: 'Gabi Costa',
    genero: 'Feminino',
    cpf: '123.456.789-07',
    rg: '89759471',
    dataCadastro: new Date(1994, 3, 17),
    ddd: '18',
    telefone: '978465129'
  },
  {
    nome: 'Henrique Alves',
    nomeSocial: 'Henri A.',
    genero: 'Masculino',
    cpf: '123.456.789-08',
    rg: '89759472',
    dataCadastro: new Date(1991, 5, 21),
    ddd: '19',
    telefone: '978465130'
  },
  {
    nome: 'Isabela Nunes',
    nomeSocial: 'Isa N.',
    genero: 'Feminino',
    cpf: '123.456.789-09',
    rg: '89759473',
    dataCadastro: new Date(1992, 2, 30),
    ddd: '20',
    telefone: '978465131'
  },
  {
    nome: 'João Pereira',
    nomeSocial: 'João P.',
    genero: 'Masculino',
    cpf: '123.456.789-10',
    rg: '89759474',
    dataCadastro: new Date(1986, 7, 5),
    ddd: '21',
    telefone: '978465132'
  },
  {
    nome: 'Karina Mendes',
    nomeSocial: 'Kari M.',
    genero: 'Feminino',
    cpf: '123.456.789-11',
    rg: '89759475',
    dataCadastro: new Date(1989, 10, 11),
    ddd: '22',
    telefone: '978465133'
  },
  {
    nome: 'Lucas Ferreira',
    nomeSocial: 'Lucas F.',
    genero: 'Masculino',
    cpf: '123.456.789-12',
    rg: '89759476',
    dataCadastro: new Date(1990, 11, 2),
    ddd: '23',
    telefone: '978465134'
  },
  {
    nome: 'Mariana Ribeiro',
    nomeSocial: 'Mari R.',
    genero: 'Feminino',
    cpf: '123.456.789-13',
    rg: '89759477',
    dataCadastro: new Date(1991, 4, 18),
    ddd: '24',
    telefone: '978465135'
  },
  {
    nome: 'Nathalia Duarte',
    nomeSocial: 'Nathi D.',
    genero: 'Feminino',
    cpf: '123.456.789-14',
    rg: '89759478',
    dataCadastro: new Date(1988, 9, 8),
    ddd: '25',
    telefone: '978465136'
  },
  {
    nome: 'Otávio Moreira',
    nomeSocial: 'Távio M.',
    genero: 'Masculino',
    cpf: '123.456.789-15',
    rg: '89759479',
    dataCadastro: new Date(1987, 6, 7),
    ddd: '26',
    telefone: '978465137'
  },
  {
    nome: 'Paula Barros',
    nomeSocial: 'Paula B.',
    genero: 'Feminino',
    cpf: '123.456.789-16',
    rg: '89759480',
    dataCadastro: new Date(1995, 8, 22),
    ddd: '27',
    telefone: '978465138'
  },
  {
    nome: 'Rafael Teixeira',
    nomeSocial: 'Rafa T.',
    genero: 'Masculino',
    cpf: '123.456.789-17',
    rg: '89759481',
    dataCadastro: new Date(1993, 11, 3),
    ddd: '28',
    telefone: '978465139'
  },
  {
    nome: 'Sara Carvalho',
    nomeSocial: 'Sara C.',
    genero: 'Feminino',
    cpf: '123.456.789-18',
    rg: '89759482',
    dataCadastro: new Date(1989, 3, 14),
    ddd: '29',
    telefone: '978465140'
  },
  {
    nome: 'Thiago Lopes',
    nomeSocial: 'Thi Lopes',
    genero: 'Masculino',
    cpf: '123.456.789-19',
    rg: '89759483',
    dataCadastro: new Date(1994, 1, 27),
    ddd: '30',
    telefone: '978465141'
  },
  {
    nome: 'Ursula Martins',
    nomeSocial: 'Ursa M.',
    genero: 'Feminino',
    cpf: '123.456.789-20',
    rg: '89759484',
    dataCadastro: new Date(1991, 10, 15),
    ddd: '31',
    telefone: '978465142'
  },
  {
    nome: 'Victor Silva',
    nomeSocial: 'Victor S.',
    genero: 'Masculino',
    cpf: '123.456.789-21',
    rg: '89759485',
    dataCadastro: new Date(1985, 9, 23),
    ddd: '32',
    telefone: '978465143'
  },
  {
    nome: 'Wesley Farias',
    nomeSocial: 'Wes F.',
    genero: 'Masculino',
    cpf: '123.456.789-22',
    rg: '89759486',
    dataCadastro: new Date(1990, 7, 19),
    ddd: '33',
    telefone: '978465144'
  },
  {
    nome: 'Ximena Borges',
    nomeSocial: 'Xime B.',
    genero: 'Feminino',
    cpf: '123.456.789-23',
    rg: '89759487',
    dataCadastro: new Date(1992, 0, 6),
    ddd: '34',
    telefone: '978465145'
  },
  {
    nome: 'Yara Araújo',
    nomeSocial: 'Yara A.',
    genero: 'Feminino',
    cpf: '123.456.789-24',
    rg: '89759488',
    dataCadastro: new Date(1988, 1, 14),
    ddd: '35',
    telefone: '978465146'
  },
  {
    nome: 'Zeca Cardoso',
    nomeSocial: 'Zeca C.',
    genero: 'Masculino',
    cpf: '123.456.789-25',
    rg: '89759489',
    dataCadastro: new Date(1993, 5, 31),
    ddd: '36',
    telefone: '978465147'
  },
  {
    nome: 'Alan Fonseca',
    nomeSocial: 'Alan F.',
    genero: 'Masculino',
    cpf: '123.456.789-26',
    rg: '89759490',
    dataCadastro: new Date(1991, 3, 10),
    ddd: '37',
    telefone: '978465148'
  },
  {
    nome: 'Beatriz Fernandes',
    nomeSocial: 'Bia F.',
    genero: 'Feminino',
    cpf: '123.456.789-27',
    rg: '89759491',
    dataCadastro: new Date(1987, 7, 17),
    ddd: '38',
    telefone: '978465149'
  },
  {
    nome: 'Célio Rocha',
    nomeSocial: 'Célio R.',
    genero: 'Masculino',
    cpf: '123.456.789-28',
    rg: '89759492',
    dataCadastro: new Date(1989, 10, 4),
    ddd: '39',
    telefone: '978465150'
  },
  {
    nome: 'Daniela Machado',
    nomeSocial: 'Dani M.',
    genero: 'Feminino',
    cpf: '123.456.789-29',
    rg: '89759493',
    dataCadastro: new Date(1992, 8, 24),
    ddd: '40',
    telefone: '978465151'
  },
  {
    nome: 'Eduardo Marques',
    nomeSocial: 'Edu M.',
    genero: 'Masculino',
    cpf: '123.456.789-30',
    rg: '89759494',
    dataCadastro: new Date(1986, 2, 13),
    ddd: '41',
    telefone: '978465152'
  }
];