import { Card } from "react-bootstrap";
import "./style/IconStatCard.css";

function IconStatCard({ icon: Icon, value, title }) {
    return (
        <Card className="shadow-sm h-100">
            <Card.Body className="cards">
                <Icon size={30} color="black" className="icon" />
                <div className="value-inline">
                    <h2 className="fw-bold fs-2 mb-0">{value}</h2>
                </div>
                <h2 className="text-muted fs-5">{title}</h2>
            </Card.Body>
        </Card>
    );
}

export default IconStatCard;
