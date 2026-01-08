import { Card } from "react-bootstrap";
import "./style/StatCard.css";

function StatCard({ title, value }) {
    return (
        <Card className="shadow-sm h-100">
            <Card.Body className="cards">
                <h2 className="text-muted fs-5">{title}</h2>
                <div className="value-inline">
                    <h2 className="fw-bold fs-2 mb-0">{value}</h2>
                </div>
            </Card.Body>
        </Card>
    );
}

export default StatCard;