import { Link } from "react-router-dom";

export default function PageHeader({ title, subtitle, buttonText, buttonLink }) {
  return (
    <div className="page-header">
      <div>
        <h2 className="page-title">{title}</h2>
        {subtitle ? <p className="page-subtitle">{subtitle}</p> : null}
      </div>

      {buttonText && buttonLink ? (
        <Link to={buttonLink} className="btn btn-primary">
          {buttonText}
        </Link>
      ) : null}
    </div>
  );
}