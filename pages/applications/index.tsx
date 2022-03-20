import router from "next/router";
import { useEffect, useState } from "react";
import { Badge, Card, Table } from "react-bootstrap";
import Layout from "../../modules/layout/layout";
import { ApplicantService } from "../../services/applicantService";
import { Applicant, ApplicationStatusInfos } from "../../types/applicant";
import { TeamMember } from "../../types/teamMember";

const Head = () => {
  return (
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Email</th>
        <th>Status</th>
      </tr>
    </thead>
  );
};

const Status = ({ applicantStatus }) => {
  const status = ApplicationStatusInfos.find(
    (value) => value.status === applicantStatus
  ) ?? { badge: "secondary", name: "Unknown" };
  return <Badge bg={status.badge}>{status.name}</Badge>;
};

const ApplicantRow = ({
  applicant,
  onClick,
}: {
  applicant: Applicant;
  onClick: (id: string) => void;
}) => {
  return (
    <tr>
      <td className="align-middle">
        <button
          className="btn btn-link mb-0"
          onClick={() => onClick(applicant.id)}
        >
          Edit
        </button>
      </td>
      <td className="align-middle">{`${applicant.firstName} ${applicant.lastName}`}</td>
      <td className="align-middle">{applicant.email}</td>
      <td className="align-middle">
        <Status applicantStatus={applicant.status}></Status>
      </td>
    </tr>
  );
};

const Applications = () => {
  const teamService = new ApplicantService();
  const [data, setData] = useState<Applicant[]>();

  useEffect(() => {
    (async () => {
      setData(await getData());
    })();
  }, []);

  async function getData() {
    return teamService.getAll();
  }

  const [showInactive, setShowInactive] = useState(false);
  const toggleInactive = () => setShowInactive(!showInactive);

  return (
    <Layout crumbs={["Applications"]}>
      <Card className="mt-3">
        <Card.Title>Applications</Card.Title>
        <Card.Body>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              onChange={toggleInactive}
            ></input>
            <label className="form-check-label">Show all</label>
          </div>
          <div className="table-responsive p-0">
            <Table>
              <Head />
              <tbody>
                {data
                  ?.filter(
                    (a) =>
                      showInactive ||
                      !ApplicationStatusInfos.find(
                        (status) => status.status === a.status
                      )?.terminal
                  )
                  .map((applicant: Applicant) => (
                    <ApplicantRow
                      key={applicant.id}
                      applicant={applicant}
                      onClick={(id: string) => {
                        router.push({
                          pathname: "/applications/edit",
                          query: { id: id },
                        });
                      }}
                    />
                  ))}
              </tbody>
            </Table>
            {!data?.some(
              (a) =>
                showInactive ||
                !ApplicationStatusInfos.find(
                  (status) => status.status === a.status
                )?.terminal
            ) && <div className="text-center">No rows to display</div>}
          </div>
        </Card.Body>
      </Card>
    </Layout>
  );
};

export default Applications;
