
import CustomerEvent from './customerpage';
import CommentPage from './commentPage';

function Cultural() {
  return (
  <div>
    <CustomerEvent type="cultural"/>
    <div style={{ marginTop: '24px' }}>
      <CommentPage eventType="cultural" showForm={false} />
    </div>
  </div>
  );
}

export default Cultural;