import { Router } from "express";
import { getCountries, getVisaTypes } from "../controllers/visa.controller.js";

const visaRouter = Router();

visaRouter.get("/supported-countries", getCountries);
visaRouter.get("/visa-types", getVisaTypes);

export default visaRouter;
