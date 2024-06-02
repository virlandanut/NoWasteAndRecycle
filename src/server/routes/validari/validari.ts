import express, { Router } from "express";
import rutaValidariUtilizator from "./Utilizator/validari_utilizator.js";
import rutaValidariContainer from "./Container/validari_container.js";

const router: Router = express.Router({ mergeParams: true });
router.use(express.json());

router.use("/utilizator", rutaValidariUtilizator);
router.use("/container", rutaValidariContainer);

export default router;
