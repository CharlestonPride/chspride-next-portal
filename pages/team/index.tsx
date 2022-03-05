import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Badge, Card, Col, Row, Table } from "react-bootstrap";
import { GradientButton, LinkGradientButton } from "../../components/button";
import Layout from "../../modules/layout/layout";
import { TeamService } from "../../services/teamService";
import { TeamMember } from "../../types/teamMember";

const Head = () => {
  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>Title</th>
        <th>Type</th>
        <th>Status</th>
        <th></th>
      </tr>
    </thead>
  );
};

const TeamRow = ({
  teamMember,
  onClick,
}: {
  teamMember: TeamMember;
  onClick: (id: string) => void;
}) => {
  return (
    <tr>
      <td>
        <div className="d-flex flex-column justify-content-center">
          <h6 className="mb-0 ">{`${teamMember.firstName} ${teamMember.lastName}`}</h6>
          <a
            className="text-sm text-secondary mb-0"
            href={`mailto:${teamMember.id}@charlestonpride.org`}
          >{`${teamMember.id}@charlestonpride.org`}</a>
        </div>
      </td>
      <td className="align-middle">{teamMember.title}</td>
      <td className="align-middle">
        {teamMember.executive ? (
          <Badge bg="primary">Executive</Badge>
        ) : (
          <Badge bg="info">Board Member</Badge>
        )}
      </td>
      <td className="align-middle">
        {teamMember.active ? (
          <Badge bg="success">Active</Badge>
        ) : (
          <Badge bg="secondary">Not Active</Badge>
        )}
      </td>
      <td className="align-middle">
        <button
          className="btn btn-link mb-0"
          onClick={() => onClick(teamMember.id)}
        >
          Edit
        </button>
      </td>
    </tr>
  );
};

const Team = () => {
  const router = useRouter();
  const teamService = new TeamService();
  const [data, setData] = useState<TeamMember[]>();

  useEffect(() => {
    (async () => {
      setData(await getData());
    })();
  }, []);

  async function getData() {
    return teamService.getTeam();
  }

  const [showInactive, setShowInactive] = useState(false);
  const toggleInactive = () => setShowInactive(!showInactive);

  return (
    <Layout crumbs={["Team"]}>
      <Row>
        <Col>
          <Card>
            <Card.Title>Team</Card.Title>
            <Card.Body>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  onChange={toggleInactive}
                ></input>
                <label className="form-check-label">Show Inactive</label>
              </div>
              <div className="table-responsive p-0">
                <Table>
                  <Head />
                  <tbody>
                    {data
                      ?.filter((a) => showInactive || a.active)
                      .sort((a) => (a.executive ? -1 : 1))
                      .map((teamMember: TeamMember) => (
                        <TeamRow
                          key={teamMember.id}
                          teamMember={teamMember}
                          onClick={(id: string) => {
                            router.push({
                              pathname: "/team/edit",
                              query: { id: id },
                            });
                          }}
                        />
                      ))}
                  </tbody>
                </Table>
              </div>
              <GradientButton
                color="primary"
                onClick={() => {
                  router.push({
                    pathname: "/team/edit",
                    query: { id: "new" },
                  });
                }}
              >
                Add
              </GradientButton>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};

export default Team;
