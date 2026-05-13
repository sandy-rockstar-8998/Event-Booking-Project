import Card from 'react-bootstrap/Card';

function CommentCard({ comment }){
    return(
        <Card style={{ width: '1000px' }}>
      <Card.Body>
        <Card.Title><p style={{fontFamily:"Vijaya"}}>{comment.user?.fullName}</p></Card.Title>
        <Card.Text as="div">
          <h4>
          {comment.body}</h4>
        </Card.Text>
      </Card.Body>
    </Card>
    )
}
export default CommentCard;