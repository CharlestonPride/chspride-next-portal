import { useRouter } from "next/router";
import Layout from "../../modules/layout/layout";
import { Formik, Form } from "formik";
import { useState, useEffect } from "react";
import { TeamMember } from "../../types/teamMember";
import { Card, Col, Row, Toast, ToastContainer } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import {
  TextInput,
  Checkbox,
  TextArea,
  Select,
  HelpText,
  UsernameInput,
} from "../../components/form";
import { GradientButton, LinkButton } from "../../components/button";
import { TeamService } from "../../services/teamService";

const NameSection = ({ disabled }) => {
  return (
    <Card>
      <Card.Title>Name</Card.Title>
      <Card.Body>
        <Row>
          <UsernameInput
            label="Username"
            name="id"
            disabled={disabled}
          ></UsernameInput>
        </Row>
        <Row>
          <TextInput label="Prefix" name="prefix" type="text" />

          <TextInput label="First Name" name="firstName" type="text" />
        </Row>
        <Row>
          <TextInput label="Last Name" name="lastName" type="text" />

          <TextInput label="Suffix" name="suffix" type="text" />
        </Row>
      </Card.Body>
    </Card>
  );
};

const PositionSection = () => {
  return (
    <Card>
      <Card.Title>Position</Card.Title>
      <Card.Body>
        <Row>
          <Col lg="6">
            <Checkbox name="active">Active</Checkbox>
            <Checkbox name="executive">Executive board member</Checkbox>
          </Col>
          <Col lg="6"></Col>
        </Row>
        <Row>
          <Col>
            <TextInput label="Title" name="title" type="text" />
            <HelpText>
              If you have more than one title, please separate by a / e.g.
              TitleA / TitleB
            </HelpText>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

const BiographySection = () => {
  return (
    <Card className="mt-3">
      <Card.Title>Biography</Card.Title>
      <Card.Body>
        <TextArea label="Biography" name="bio" rows="9" />
      </Card.Body>
    </Card>
  );
};

const PronounsSection = () => {
  return (
    <Card className="mt-3">
      <Card.Title>Pronouns</Card.Title>
      <Card.Body>
        <Row>
          <Col>
            <Select label="Subjective" name="pronouns.subjective">
              <option value="">Select a pronoun</option>
              <option value="he">he</option>
              <option value="she">she</option>
              <option value="they">they</option>
            </Select>
          </Col>
          <Col>
            <Select label="Objective" name="pronouns.objective">
              <option value="">Select a pronoun</option>
              <option value="him">him</option>
              <option value="her">her</option>
              <option value="them">them</option>
            </Select>
          </Col>
          <Col>
            <Select label="Possessive" name="pronouns.possessive">
              <option value="">Select a pronoun</option>
              <option value="his">his</option>
              <option value="hers">hers</option>
              <option value="theirs">theirs</option>
            </Select>
          </Col>
        </Row>

        <div>
          <HelpText>
            If your gender pronouns are not listed, please ask form them to be
            added.
          </HelpText>
        </div>
      </Card.Body>
    </Card>
  );
};

const Edit = () => {
  const router = useRouter();
  const teamService = new TeamService();
  const { id } = router.query;

  const [data, setData] = useState<TeamMember>();
  const [isNew, SetNew] = useState(id && id === "new");
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    (async () => {
      setData(await getData());
    })();
  }, []);

  async function getData() {
    if (!id) {
      router.push("/team");
    } else if (id === "new") {
      return teamService.getNew();
    } else {
      return teamService.getById(id as string);
    }
  }

  return (
    <Layout crumbs={["Team", id as string]}>
      <Row>
        <Col>
          {data && (
            <Formik
              initialValues={{
                dateElected: new Date(),
                ...data,
              }}
              onSubmit={async (values) => {
                await (isNew
                  ? teamService.saveNew(values as TeamMember)
                  : teamService.save(values as TeamMember)
                ).then(() => {
                  setShowSaved(true);
                });
              }}
            >
              <Form>
                <Row>
                  <Col lg="6">
                    <NameSection disabled={!isNew} />
                  </Col>
                  <Col lg="6">
                    <PositionSection />
                  </Col>
                  <Col lg="6">
                    <BiographySection />
                  </Col>
                  <Col lg="6">
                    <PronounsSection />
                  </Col>
                </Row>
                <div className="float-end mt-3">
                  <LinkButton color="default" href="/team">
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
      <ToastContainer position="bottom-end">
        <Toast
          onClose={() => setShowSaved(false)}
          show={showSaved}
          delay={3000}
          autohide
          bg="success"
        >
          <Toast.Header>
            <strong className="me-auto">Saved</strong>
          </Toast.Header>
          <Toast.Body>Your edits were successfully saved.</Toast.Body>
        </Toast>
      </ToastContainer>
    </Layout>
  );
};

export default Edit;
