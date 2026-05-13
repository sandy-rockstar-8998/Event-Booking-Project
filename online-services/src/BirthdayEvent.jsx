
import CustomerEvent from './customerpage';
import CommentPage from './commentPage';

function BirthdayEvent() {
  return (
  <div>
    <CustomerEvent type="birthday"/>
    <div style={{ marginTop: '24px' }}>
      <CommentPage eventType="birthday" showForm={false} />
    </div>
  </div>
  );
}

export default BirthdayEvent;