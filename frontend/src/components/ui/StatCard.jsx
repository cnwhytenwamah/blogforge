import { LuArrowUpRight } from "react-icons/lu";

const StatCard = ({ icon: Icon, label, value, description }) => {
  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <div className="stat-icon">
          <Icon />
        </div>

        <LuArrowUpRight className="stat-arrow" />
      </div>

      <div className="stat-content">
        <span>{label}</span>
        <strong>{value}</strong>
        <small>{description}</small>
      </div>
    </div>
  );
};

export default StatCard;