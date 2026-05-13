import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import BirthdayEvent from './BirthdayEvent';
import MarriageEvent from './MarriageEvent';
import BabyShower from './BabyShower';
import Cultural from './Cultural';

function ProfileCard() {
  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="first">Birthday Event</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">Marriage Event</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="third">Baby Shower Event</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="fourth">School & College Cultural Event</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="first"><BirthdayEvent/></Tab.Pane>
            <Tab.Pane eventKey="second"><MarriageEvent/></Tab.Pane>
            <Tab.Pane eventKey="third"><BabyShower/></Tab.Pane>
            <Tab.Pane eventKey="fourth"><Cultural/></Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}

export default ProfileCard;