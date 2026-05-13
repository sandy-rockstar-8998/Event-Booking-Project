import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ProfileCard from './EventCard';
import FormExample from './RegisterForm';
import CommentPage from './commentPage';


function Menuu() {
  return (
    <div className='container'>
    <Tabs
      defaultActiveKey="Events"
      transition={false}
      id="noanim-tab-example"
      className="my-3"
    >
      <Tab eventKey="Events" title="Events">
        <ProfileCard/>
      </Tab>
      <Tab eventKey="Register Your Event" title="Register Your Event">
        <FormExample/>
      </Tab>
      <Tab eventKey="Reviews" title="Reviews">
        <CommentPage/>
      </Tab>
    </Tabs>
  </div>
  );
}

export default Menuu;