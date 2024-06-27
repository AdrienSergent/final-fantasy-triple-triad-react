import "./Card.css";

const Card = ({ card }) => {
  return (
    <div className="card">
      <div className="card-value top">{card.top}</div>
      <div className="card-value left">{card.left}</div>
      <div className="card-value right">{card.right}</div>
      <div className="card-value bottom">{card.bottom}</div>
    </div>
  );
};

export default Card;
