
import CustomerEvent from './customerpage';
import CommentPage from './commentPage';

function BabyShower() {
  return (
  <div>
    
    <CustomerEvent type="babyshower"/>
    <div style={{ marginTop: '24px' }}>
      <CommentPage eventType="babyshower" showForm={false} />
    </div>
  </div>
  );
}

export default BabyShower;