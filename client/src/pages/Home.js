import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';

import Login from './Login';
import Signup from './Signup';

function Home() {
  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="first"  >
      <Row className="justify-content-center">
     
          <Nav variant="pills" className="justify-content-center">
            <Nav.Item>
              <Nav.Link eventKey="first">Login</Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link eventKey="second">Signup</Nav.Link>
            </Nav.Item>
          </Nav>
        

        <Row sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="first">
              <Login />
            </Tab.Pane>
            <Tab.Pane eventKey="second">
              <Signup />
            </Tab.Pane>
          </Tab.Content>
        </Row>

      </Row>
    </Tab.Container>
  );
}

export default Home;