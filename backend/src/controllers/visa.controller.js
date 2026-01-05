import visaConfig from "../utils/json.provider.js";

export const getCountries = async (req, res) => {
  res.send(visaConfig);
};

export const getVisaTypes = async (req,res)=>{
  const country = req.params.country
  res.send(Object.keys(visaConfig[country].visas))
}


