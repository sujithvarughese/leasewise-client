
const prod = {
  url: {
    API_URL: "https://realty-solutions-api-568d2fe47891.herokuapp.com/api/v1"
  }
}

const dev = {
  url : {
    API_URL: "http://localhost:3000/api/v1"
  }
}

export const config =
  process.env.NODE_ENV === "development" ? dev : prod
