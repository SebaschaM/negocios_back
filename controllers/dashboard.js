import DashboardService from '../services/Dashboard.js';

class DashboardController {
  constructor() {
    this.dashboardService = new DashboardService();
  }

  cantidadIngresoGeneradoPorCategoria = async (req, res) => {
    const resp = await this.dashboardService.cantidadIngresoGeneradoPorCategoria();
    return res.json(resp);
  };

  unidadesVendidasPorCategoria = async (req, res) => {
    const resp = await this.dashboardService.unidadesVendidasPorCategoria();
    return res.json(resp);
  };

  cantidadIngresoGeneradoPorProveedor = async (req, res) => {
    const resp = await this.dashboardService.cantidadIngresoGeneradoPorProveedor();
    return res.json(resp);
  };

  comprasAnualesPorCliente = async (req, res) => {
    const resp = await this.dashboardService.comprasAnualesPorCliente();
    return res.json(resp);
  };
}

export default DashboardController;
