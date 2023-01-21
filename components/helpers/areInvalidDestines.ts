// import codes from "../../public/static/data/codigos.json";

const areInvalidDestines = async (orgCode, arrCode) => {
  return new Promise(async resolve => {
    const codes = await import(`../../public/static/data/codigos.json`);
    const org = codes.iata.find((c) => c.codigo == orgCode)
    const dest = codes.iata.find((c) => c.codigo == arrCode)
    const same = org && dest ? org.ciudad === dest.ciudad : true
    
    resolve(same);
  })
}

export default areInvalidDestines