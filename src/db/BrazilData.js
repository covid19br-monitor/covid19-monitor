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
      lat: -30.03,
      lng: -51.21
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
      lat: -9.02,
      lng: -70.81
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
      lat: -0.9,
      lng: -53.0
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
      lat: -3.41,
      lng: -65.85
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
      lat: -12.57,
      lng: -41.7
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
      lat: -25.25,
      lng: -52.02
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
      lat: -5.49,
      lng: -39.32
    }
  },
  {
    id: 7,
    name: "Destrito Federal",
    capital: "Brasília",
    confirmed: 108,
    deaths: 0,
    compromised: 0,
    status: "alert",
    coord: {
      lat: -15.82,
      lng: -47.92
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
      lat: -15.82,
      lng: -49.83
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
      lat: -7.24,
      lng: -36.78
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
      lat: -18.51,
      lng: -44.55
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
      lat: -4.96,
      lng: -45.27
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
      lat: -12.68,
      lng: -56.92
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
      lat: -20.77,
      lng: -54.78
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
      lat: -1.9981,
      lng: -54.9306
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
      lat: -8.8137,
      lng: -36.9541
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
      lat: -7.7183,
      lng: -42.7289
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
      lat: -22.9099,
      lng: -43.2095
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
      lat: -5.79448,
      lng: -35.211
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
      lat: -11.5057,
      lng: -63.5806
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
      lat: -2.7376,
      lng: -62.0751
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
      lat: -23.5432,
      lng: -46.6292
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
      lat: -10.1753,
      lng: -48.2982
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
      lat: -10.5741,
      lng: -37.3857
    }
  },
  {
    id: 25,
    name: "Alagoas",
    capital: "Maceió",
    confirmed: 7,
    deaths: 0,
    compromised: 0,
    status: null,
    coord: {
      lat: -9.5713,
      lng: -36.782
    }
  }
];

export default data;
