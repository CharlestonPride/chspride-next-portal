import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Row, Col, Card, CardGroup } from "react-bootstrap";
import { LinkGradientButton } from "../components/button";
import Layout from "../modules/layout/layout";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  IconDefinition,
} from "@fortawesome/free-brands-svg-icons";
import {
  faHandHoldingDollar,
  faStore,
} from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  return (
    <Layout crumbs={["Dashboard"]}>
      <Row>
        <Col md="9" lg="6">
          <Card bg="gradient-primary">
            <Card.Body>
              <h1 className="text-white">Dashboard</h1>
              <p className="text-white">
                This will eventually contain useful info, for now jump to the
                team page.
              </p>
              <p className="text-white">The below is just for demo purposes.</p>
              <LinkGradientButton color="light" href="/team">
                Go to team
              </LinkGradientButton>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col xs="6" md="2">
          <Card>
            <Card.Header className="text-center">
              <FontAwesomeIcon icon={faFacebook} size="4x" />
            </Card.Header>
            <Card.Body className="text-center pt-0 p-3 ">
              <h6 className="text-center mb-0">Likes</h6>
              <hr className="horizontal dark my-3" />
              <h5 className="mb-0">12,948</h5>
            </Card.Body>
          </Card>
        </Col>
        <Col xs="6" md="2">
          <Card>
            <Card.Header className="text-center">
              <FontAwesomeIcon icon={faInstagram} size="4x" />
            </Card.Header>
            <Card.Body className="text-center pt-0 p-3 ">
              <h6 className="text-center mb-0">Followers</h6>
              <hr className="horizontal dark my-3" />
              <h5 className="mb-0">5,161</h5>
            </Card.Body>
          </Card>
        </Col>
        <Col md="4">
          <Card>
            <Card.Body>
              <Row>
                <Col xs="10" md="8">
                  <span>Total sponsorships</span>
                  <h5>
                    26 <small className="text-success">$24,200</small>
                  </h5>
                </Col>
                <Col xs="2" md="4">
                  <div className="icon-lg icon-shape bg-gradient-primary shadow text-center border-radius-md">
                    <FontAwesomeIcon
                      icon={faHandHoldingDollar}
                      size="2x"
                      className="text-white p-2"
                    />
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col md="4">
          <Card>
            <Card.Body>
              <Row>
                <Col xs="10" md="8">
                  <span>Festival vendors</span>
                  <h5>
                    11 <small className="text-success">$1,200</small>
                  </h5>
                </Col>
                <Col xs="2" md="4">
                  <div className="icon-lg icon-shape bg-gradient-primary shadow text-center border-radius-md">
                    <FontAwesomeIcon
                      icon={faStore}
                      size="2x"
                      className="text-white p-2"
                    />
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default Dashboard;
