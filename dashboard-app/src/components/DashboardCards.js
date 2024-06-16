import React from "react";

const DashboardCards = ({ getInventoryCount, getAverageMSRP, getTotalInventoryCount, getTotalAverageMSRP }) => {
  return (
    <div className="dashboard-cards">
      {/* New Units Count Card */}
      <div className="card" data-testid="unit-count-new">
        <p>{getInventoryCount("new")}</p>
        <h2># New Units</h2>
      </div>
      
      {/* New MSRP Card */}
      <div className="card" data-testid="msrp-new">
        <p>${getAverageMSRP("new")}</p>
        <h2>New MSRP</h2>
      </div>
      
      {/* Used Units Count Card */}
      <div className="card" data-testid="unit-count-used">
        <p>{getInventoryCount("used")}</p>
        <h2># Used Units</h2>
      </div>
      
      {/* Used MSRP Card */}
      <div className="card" data-testid="msrp-used">
        <p>${getAverageMSRP("used")}</p>
        <h2>Used Average MSRP</h2>
      </div>
      
      {/* CPO Units Count Card */}
      <div className="card" data-testid="unit-count-cpo">
        <p>{getInventoryCount("cpo")}</p>
        <h2># CPO Units</h2>
      </div>
      
      {/* CPO MSRP Card */}
      <div className="card" data-testid="msrp-cpo">
        <p>${getAverageMSRP("cpo")}</p>
        <h2>CPO Average MSRP</h2>
      </div>

      {/* Total Units Count Card */}
      <div className="card" data-testid="unit-count-total">
        <p>{getTotalInventoryCount()}</p>
        <h2># Total Units</h2>
      </div>

      {/* Total Average MSRP Card */}
      <div className="card" data-testid="msrp-total">
        <p>${getTotalAverageMSRP()}</p>
        <h2>Total MSRP</h2>
      </div>
    </div>
  );
};

export default DashboardCards;
