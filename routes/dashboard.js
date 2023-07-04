import { Router } from 'express';
import DashboardController from '../controllers/dashboard.js';

const routerDashboard = Router();
const dashboardController = new DashboardController();

routerDashboard.get('/number1', [], dashboardController.totalVentas);
routerDashboard.get('/number2', [], dashboardController.cantidadTotalProductosVendidos);
routerDashboard.get('/grap1', [], dashboardController.cantidadIngresoGeneradoPorCategoria);
routerDashboard.get('/grap2', [], dashboardController.unidadesVendidasPorCategoria);
routerDashboard.get('/grap3', [], dashboardController.cantidadIngresoGeneradoPorProveedor);
routerDashboard.get('/grap4', [], dashboardController.comprasAnualesPorCliente);

export default routerDashboard;
