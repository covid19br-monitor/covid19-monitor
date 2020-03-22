const data = [
  {
    id: 0,
    name: "Rio Grande do Sul",
    capital: "Porto Alegre",
    confirmed: 61,
    deaths: 0,
    compromised: 0,
    status: null,
    coord: {
      lat: -30,
      lng: -53.6
    }
  },
  {
    id: 1,
    name: "Acre",
    capital: "Rio Branco",
    confirmed: 5,
    deaths: 0,
    compromised: 0,
    status: null,
    coord: {
      lat: -9.1,
      lng: -70.3
    }
  },
  {
    id: 2,
    name: "Amapá",
    capital: "Macapá",
    confirmed: 1,
    deaths: 0,
    compromised: 0,
    status: null,
    coord: {
      lat: 1.6,
      lng: -52.3
    }
  },
  {
    id: 3,
    name: "Amazonas",
    capital: "Manaus",
    confirmed: 11,
    deaths: 0,
    compromised: 0,
    status: null,
    coord: {
      lat: -3.8,
      lng: -64.95
    }
  },
  {
    id: 4,
    name: "Bahia",
    capital: "Salvador",
    confirmed: 41,
    deaths: 0,
    compromised: 0,
    status: null,
    coord: {
      lat: -13.5,
      lng: -41.9
    }
  },
  {
    id: 5,
    name: "Paraná",
    capital: "Curitiba",
    confirmed: 43,
    deaths: 0,
    compromised: 0,
    status: null,
    coord: {
      lat: -24.6,
      lng: -51.2
    }
  },
  {
    id: 6,
    name: "Ceará",
    capital: "Fortaleza",
    confirmed: 84,
    deaths: 0,
    compromised: 0,
    status: null,
    coord: {
      lat: -5.27,
      lng: -39.29
    }
  },
  {
    id: 7,
    name: "Distrito Federal",
    capital: "Brasília",
    confirmed: 108,
    deaths: 0,
    compromised: 0,
    status: "alert",
    coord: {
      lat: -15.77,
      lng: -47.79
    }
  },
  {
    id: 8,
    name: "Espirito Santo",
    capital: "Vitória",
    confirmed: 26,
    deaths: 0,
    compromised: 0,
    status: null,
    coord: {
      lat: -19.18,
      lng: -40.3
    }
  },
  {
    id: 9,
    name: "Goiás",
    capital: "Goiânia",
    confirmed: 18,
    deaths: 0,
    compromised: 0,
    status: null,
    coord: {
      lat: -15.97,
      lng: -49.57
    }
  },
  {
    id: 10,
    name: "Paraíba",
    capital: "João Pessoa",
    confirmed: 1,
    deaths: 0,
    compromised: 0,
    status: null,
    coord: {
      lat: -7.16,
      lng: -36.72
    }
  },
  {
    id: 11,
    name: "Minas Gerais",
    capital: "Belo Horizonte",
    confirmed: 55,
    deaths: 0,
    compromised: 0,
    status: null,
    coord: {
      lat: -18.63,
      lng: -45.45
    }
  },
  {
    id: 12,
    name: "Maranhão",
    capital: "São Luís",
    confirmed: 2,
    deaths: 0,
    compromised: 0,
    status: null,
    coord: {
      lat: -5.62,
      lng: -45.24
    }
  },
  {
    id: 13,
    name: "Mato Grosso",
    capital: "Cuiabá",
    confirmed: 2,
    deaths: 0,
    compromised: 0,
    status: null,
    coord: {
      lat: -12.75,
      lng: -55.92
    }
  },
  {
    id: 14,
    name: "Mato Grosso do Sul",
    capital: "Campo Grande",
    confirmed: 16,
    deaths: 0,
    compromised: 0,
    status: null,
    coord: {
      lat: -20.65,
      lng: -54.54
    }
  },
  {
    id: 15,
    name: "Pará",
    capital: "Belém",
    confirmed: 2,
    deaths: 0,
    compromised: 0,
    status: null,
    coord: {
      lat: -3.63,
      lng: -52.45
    }
  },
  {
    id: 16,
    name: "Pernambuco",
    capital: "Recife",
    confirmed: 33,
    deaths: 0,
    compromised: 0,
    status: null,
    coord: {
      lat: -8.61,
      lng: -36.82
    }
  },
  {
    id: 17,
    name: "Piauí",
    capital: "Teresina",
    confirmed: 4,
    deaths: 0,
    compromised: 0,
    status: null,
    coord: {
      lat: -7.2,
      lng: -42.18
    }
  },
  {
    id: 18,
    name: "Rio de Janeiro",
    capital: "Rio de Janeiro",
    confirmed: 119,
    deaths: 0,
    compromised: 0,
    status: "alert",
    coord: {
      lat: -22.12,
      lng: -42.87
    }
  },
  {
    id: 19,
    name: "Rio Grande do Norte",
    capital: "Natal",
    confirmed: 6,
    deaths: 0,
    compromised: 0,
    status: null,
    coord: {
      lat: -5.88,
      lng: -36.72
    }
  },
  {
    id: 20,
    name: "Rondônia",
    capital: "Porto Velho",
    confirmed: 3,
    deaths: 0,
    compromised: 0,
    status: null,
    coord: {
      lat: -10.84,
      lng: -63.29
    }
  },
  {
    id: 21,
    name: "Roraima",
    capital: "Boa Vista",
    confirmed: 2,
    deaths: 0,
    compromised: 0,
    status: null,
    coord: {
      lat: 1.84,
      lng: -61.3
    }
  },
  {
    id: 22,
    name: "Santa Catarina",
    capital: "Florianópolis",
    confirmed: 51,
    deaths: 0,
    compromised: 0,
    status: null,
    coord: {
      lat: -27.2423,
      lng: -50.2189
    }
  },
  {
    id: 23,
    name: "São Paulo",
    capital: "São Paulo",
    confirmed: 459,
    deaths: 0,
    compromised: 0,
    status: "alert",
    coord: {
      lat: -22.6,
      lng: -48.63
    }
  },
  {
    id: 24,
    name: "Tocantins",
    capital: "Palmas",
    confirmed: 2,
    deaths: 0,
    compromised: 0,
    status: null,
    coord: {
      lat: -9.34,
      lng: -48.21
    }
  },
  {
    id: 25,
    name: "Sergipe",
    capital: "Aracaju",
    confirmed: 10,
    deaths: 0,
    compromised: 0,
    status: null,
    coord: {
      lat: -10.54,
      lng: -37.27
    }
  },
  {
    id: 26,
    name: "Alagoas",
    capital: "Maceió",
    confirmed: 7,
    deaths: 0,
    compromised: 0,
    status: null,
    coord: {
      lat: -9.69,
      lng: -36.64
    }
  }
];

export default data;
