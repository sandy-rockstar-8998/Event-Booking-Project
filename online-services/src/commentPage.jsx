import { useEffect, useMemo, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CommentCard from "./commentCard";

const EVENT_OPTIONS = [
  { value: "birthday", label: "Birthday" },
  { value: "marriage", label: "Marriage" },
  { value: "babyshower", label: "Baby Shower" },
  { value: "cultural", label: "Cultural" },
];

function CommentPage({ eventType, showForm = true }) {
  const defaultType = useMemo(() => eventType || "birthday", [eventType]);
  const [selectedType, setSelectedType] = useState(defaultType);
  const [comments, setComments] = useState([]);
  const [reviewerName, setReviewerName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadReviews = (typeValue) => {
    fetch(`http://127.0.0.1:8000/reviews/?event_type=${typeValue}`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
      })
      .catch((err) => console.error("Review fetch error:", err));
  };

  useEffect(() => {
    setSelectedType(defaultType);
  }, [defaultType]);

  useEffect(() => {
    loadReviews(selectedType);
  }, [selectedType]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!reviewerName.trim() || !reviewText.trim()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        reviewer_name: reviewerName.trim(),
        review_text: reviewText.trim(),
        event_type: selectedType,
      };

      const response = await fetch("http://127.0.0.1:8000/reviews/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to submit review");
      }

      setReviewerName("");
      setReviewText("");
      loadReviews(selectedType);
    } catch (error) {
      console.error("Review submit error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Reviews</h2>
      <hr />

      {showForm && (
        <Form onSubmit={handleSubmit} style={{ maxWidth: "800px", marginBottom: "20px" }}>
          {!eventType && (
            <Form.Group className="mb-3">
              <Form.Label>Event Type</Form.Label>
              <Form.Select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                {EVENT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Your Name</Form.Label>
            <Form.Control type="text" value={reviewerName} onChange={(e) => setReviewerName(e.target.value)}
              placeholder="Enter your name"
              required/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Your Review</Form.Label>
            <Form.Control as="textarea" rows={3} value={reviewText} onChange={(e) => setReviewText(e.target.value)}
              placeholder="Share your feedback"
              required/>
          </Form.Group>

          <Button variant="primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
        </Form>
      )}

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "10px" }}>
        {comments.map((comment) => (
          <CommentCard key={comment.id}
            comment={{
              user: { fullName: comment.reviewer_name },
              body: comment.review_text,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default CommentPage;