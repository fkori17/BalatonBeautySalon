import { Card } from "react-bootstrap";

function HomePageComps({ icon: Icon, value, title }) {
    return (
        <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column gap-2">
                <Icon size={28} className="text-primary" />
                <h2 className="fw-bold fs-2">{value}</h2>
                <h2 className="text-muted">{title}</h2>
            </Card.Body>
        </Card>
    );
}

export default HomePageComps;
