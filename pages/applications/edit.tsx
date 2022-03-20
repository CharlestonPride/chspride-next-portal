import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Card, Row, Col, Button, Modal } from "react-bootstrap";
import { LinkButton, GradientButton } from "../../components/button";
import Layout from "../../modules/layout/layout";
import { ApplicantService } from "../../services/applicantService";
import {
  Applicant,
  ApplicationStatusInfos,
  StatusInfo,
} from "../../types/applicant";
import { Select, TextArea } from "../../components/form";

const Label = ({ label, children }) => {
  return (
    <div>
      <span className="form-label">{label}: </span>
      {children}
    </div>
  );
};

const BoolPresenter = ({ value }) => {
  if (value) {
    return <FontAwesomeIcon icon={faCheck} className="text-success" />;
  }
  return <FontAwesomeIcon icon={faXmark} className="text-secondary" />;
};

const BasicInfoSection = ({
  firstName,
  lastName,
  email,
  phoneNumber,
  pronouns,
}: Applicant) => {
  return (
    <Card>
      <Card.Title>Basic Info</Card.Title>
      <Card.Body>
        <Label label="Name">{`${firstName} ${lastName}`}</Label>
        <Label label="Pronouns">
          {`${pronouns?.subjective ?? "-"}/${pronouns?.objective ?? "-"}/${
            pronouns?.possessive ?? "-"
          }`}
        </Label>
        <Label label="Email">
          <a href={`mailto:${email}`}>{email}</a>
        </Label>
        <Label label="Phone number">
          <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
        </Label>
      </Card.Body>
    </Card>
  );
};

const QuestionSection = ({ statement, liaison }: Applicant) => {
  return (
    <Card>
      <Card.Title>Questionnaire</Card.Title>
      <Card.Body>
        <Label label='"Why do you want to join the Charleston Pride Board of Directors?"'>
          <textarea
            className="mx-2 d-block w-100"
            rows={6}
            readOnly
            value={statement}
          ></textarea>
        </Label>
        <Label label="Please list any groups, organizations or businesses that you could serve as a liaison to on behalf of Charleston Pride Festival">
          <textarea
            className="mx-2 d-block w-100"
            rows={6}
            readOnly
            value={liaison}
          ></textarea>
        </Label>
      </Card.Body>
    </Card>
  );
};

const ResumeSection = ({ resume, id }: Applicant) => {
  const url = `${
    process.env.NEXT_PUBLIC_APPLICATIONS_CONTAINER
  }${id}/${encodeURI(resume.fileName)}${
    process.env.NEXT_PUBLIC_APPLICATIONS_SAS
  }`;

  return (
    <Card>
      <Card.Title>Resume</Card.Title>
      <Card.Body>
        <a className="btn btn-primary " href={url} download>
          Download
        </a>
        <div className="my-2">
          <span className="badge bg-gradient-warning">Warning</span> The resume
          was uploaded by the applicant and has not been scanned by a virus
          scanner. It is advised that you scan the file for viruses before
          opening. If you don't have a virus scanner you can use{" "}
          <a href="https://opentip.kaspersky.com/" target="_blank">
            this
          </a>{" "}
          online one.
        </div>
      </Card.Body>
    </Card>
  );
};

const SkillsSection = ({ skills }: Applicant) => {
  return (
    <Card>
      <Card.Title>Skills</Card.Title>
      <Card.Body>
        <Label label="Administration/Management">
          <BoolPresenter
            value={skills.administrationManagement}
          ></BoolPresenter>
        </Label>
        <Label label="Entertainment">
          <BoolPresenter value={skills.entertainment}></BoolPresenter>
        </Label>
        <Label label="Event Planning">
          <BoolPresenter value={skills.eventPlanning}></BoolPresenter>
        </Label>
        <Label label="Finance/Accounting">
          <BoolPresenter value={skills.financeAccounting}></BoolPresenter>
        </Label>
        <Label label="Fundraising">
          <BoolPresenter value={skills.fundraising}></BoolPresenter>
        </Label>
        <Label label="Grant Writing">
          <BoolPresenter value={skills.grantWriting}></BoolPresenter>
        </Label>
        <Label label="Outreach/Advocacy">
          <BoolPresenter value={skills.outreachAdvocacy}></BoolPresenter>
        </Label>
        <Label label="Policy Development">
          <BoolPresenter value={skills.policyDevelopment}></BoolPresenter>
        </Label>
        <Label label="Program Evaluation">
          <BoolPresenter value={skills.programEvaluation}></BoolPresenter>
        </Label>
        <Label label="Social Media/Communications">
          <BoolPresenter
            value={skills.socialMediaCommunications}
          ></BoolPresenter>
        </Label>
        <Label label="Visual Media">
          <BoolPresenter value={skills.visualMedia}></BoolPresenter>
        </Label>
        <Label label="Volunteer Management">
          <BoolPresenter value={skills.volunteerManagement}></BoolPresenter>
        </Label>
        <Label label="Technology/Web Management">
          <BoolPresenter value={skills.technologyWebManagement}></BoolPresenter>
        </Label>
        <Label label="Other">
          {!!skills.other ? skills.other : <em>No response</em>}
        </Label>
      </Card.Body>
    </Card>
  );
};

const Edit = () => {
  const parentRoute = "/applications";
  const router = useRouter();
  const applicantService = new ApplicantService();
  const { id } = router.query;

  const [data, setData] = useState<Applicant>();
  const [showSaved, setShowSaved] = useState(false);
  const [showError, setShowError] = useState(false);

  const savedModalClosed = (close?: boolean) => {
    setShowSaved(false);
    if (close) {
      router.push(parentRoute);
    }
  };

  const errorModalClosed = () => {
    setShowError(false);
  };

  useEffect(() => {
    (async () => {
      setData(await getData());
    })();
  }, []);

  async function getData() {
    if (!id) {
      router.push(parentRoute);
    }
    return applicantService.getById(id as string);
  }

  const statusOptions = ApplicationStatusInfos.map((value: StatusInfo) => (
    <option key={value.status} value={value.status}>
      {value.name}
    </option>
  ));

  return (
    <Layout crumbs={["Applicant", id as string]}>
      {data && (
        <>
          <Row>
            <Col lg="6">
              <BasicInfoSection {...data} />
              <ResumeSection {...data} />
            </Col>
            <Col lg="6">
              <SkillsSection {...data} />
            </Col>
          </Row>
          <Row>
            <Col>
              <QuestionSection {...data} />
            </Col>
          </Row>
        </>
      )}
      <Row>
        <Col>
          {data && (
            <Formik
              initialValues={{
                ...data,
              }}
              onSubmit={async (values) => {
                await applicantService.save(values as Applicant).then(() => {
                  setShowSaved(true);
                });
              }}
            >
              <Form>
                <Row>
                  <Col>
                    <Card>
                      <Card.Title>Status &amp; Notes</Card.Title>
                      <Card.Body>
                        <Select label="Status" name="status">
                          {statusOptions}
                        </Select>

                        <TextArea label="Notes" name="notes" rows="9" />

                        <div>Status descriptions</div>
                        <ul>
                          {ApplicationStatusInfos.map((value) => (
                            <li key={value.status}>
                              <Label label={value.name}>
                                {value.description}
                              </Label>
                            </li>
                          ))}
                        </ul>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
                <div className="float-end mt-3">
                  <LinkButton color="default" href={parentRoute}>
                    Cancel
                  </LinkButton>
                  <GradientButton
                    type="submit"
                    color="success"
                    className="mx-2"
                  >
                    Save
                  </GradientButton>
                </div>
              </Form>
            </Formik>
          )}
        </Col>
      </Row>
      <Modal onClose={() => setShowSaved(false)} show={showSaved}>
        <Modal.Header>
          <strong className="me-auto">Saved</strong>
        </Modal.Header>
        <Modal.Body>Your edits were successfully saved.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => savedModalClosed(false)}>
            Ok
          </Button>
          <Button variant="primary" onClick={() => savedModalClosed(true)}>
            Back to applications
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal onClose={() => setShowError(false)} show={showError}>
        <Modal.Header>
          <strong className="me-auto">An error occurred</strong>
        </Modal.Header>
        <Modal.Body>There was an error saving your changes.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={errorModalClosed}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
};

export default Edit;
