
import CustomerEvent from './customerpage';
import CommentPage from './commentPage';

function MarriageEvent() {
  return (
  <div>
    <CustomerEvent type="marriage"/>
    <div style={{ marginTop: '24px' }}>
      <CommentPage eventType="marriage" showForm={false} />
    </div>
  </div>
  );
}

export default MarriageEvent;