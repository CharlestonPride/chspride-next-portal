import router from "next/router";
import { useState } from "react";
import { Badge, Card, Table } from "react-bootstrap";
import Layout from "../../modules/layout/layout";

interface Applicant {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  status: string;
}

const applicantData: Applicant[] = [
  {
    id: "1",
    firstName: "Charles",
    lastName: "Dickens",
    email: "charles@aol.com",
    status: "scheduled",
  },
  {
    id: "2",
    firstName: "George",
    lastName: "Orwell",
    email: "gorwell1984@yahoo.com",
    status: "new",
  },
  {
    id: "3",
    firstName: "Agatha",
    lastName: "Christie",
    email: "agatha.chistie@gmail.com",
    status: "scheduled",
  },
];

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
          disabled
          onClick={() => onClick(applicant.id)}
        >
          Edit
        </button>
      </td>
      <td className="align-middle">{`${applicant.firstName} ${applicant.lastName}`}</td>
      <td className="align-middle">{applicant.email}</td>
      <td className="align-middle">
        {applicant.status == "scheduled" ? (
          <Badge bg="primary">Interview Scheduled</Badge>
        ) : (
          <Badge bg="info">New Applicant</Badge>
        )}
      </td>
    </tr>
  );
};

const Applications = () => {
  const [data, setData] = useState<Applicant[]>(applicantData);

  return (
    <Layout crumbs={["Applications"]}>
      <Card className="mt-3">
        <Card.Title>Applications</Card.Title>
        <Card.Body>
          <p>
            This is where applications for the board will eventually show up.
            The intent is to track applicants through this instead of the drive
            sheet that is currently utilized.
          </p>
          <div className="table-responsive p-0">
            <Table>
              <Head />
              <tbody>
                {data.map((applicant: Applicant) => (
                  <ApplicantRow
                    key={applicant.id}
                    applicant={applicant}
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
        </Card.Body>
      </Card>
    </Layout>
  );
};

export default Applications;
