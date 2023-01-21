
const parseAirportCode = (airCode, codes) => {
  if(!codes || !airCode) return null
  const finder = codes.iata.find((c) => c.codigo == airCode)
  const result = finder ? finder.ciudad || null : null
  return result
}

export default parseAirportCode