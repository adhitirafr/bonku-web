import Spinner from 'react-bootstrap/Spinner';
import Col from 'react-bootstrap/Col';

const loadingPage = () => {
    return (
        <>
            <Col className="text-center mt-5">
                <Spinner
                as="span"
                animation="border"
                size="lg"
                aria-hidden="true"
                className="mb-2"
                />
                <Col>Mohon Tunggu ...</Col>
            </Col>
        </>
    )
}

export default loadingPage