import React from 'react';
import StarRatings from 'react-star-ratings';
import { useCheckReviewQuery, useSubmitReviewMutation } from '../../redux/api/product';
import toast from 'react-hot-toast';

const Review = ({ productId }) => {
    const [rating, setRating] = React.useState(0);
    const [comment, setComment] = React.useState("");

    const [submitReview, { data, isLoading, error, isSuccess }] = useSubmitReviewMutation();
    const { data: checkReview } = useCheckReviewQuery(productId);

    const SubmitReview = () => submitReview({ rating, comment, productId });

    React.useEffect(() => {
        if (error) {
            toast.error(error?.data?.message || "Something went wrong")
        }

        if (isSuccess) toast.success(data?.message || "Review Posted successfully");
    }, [error, isSuccess])
    return (
        <>
            <div>
                {checkReview?.canReview &&
                    <button
                        id="review_btn"
                        type="button"
                        className="btn btn-primary mt-4"
                        data-bs-toggle="modal"
                        data-bs-target="#ratingModal"
                    >
                        Submit Your Review
                    </button>
                }
                <div className="row mt-2 mb-5">
                    <div className="rating w-50">
                        <div
                            className="modal fade"
                            id="ratingModal"
                            tabindex="-1"
                            role="dialog"
                            aria-labelledby="ratingModalLabel"
                            aria-hidden="true"
                        >
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="ratingModalLabel">
                                            Submit Review
                                        </h5>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                        ></button>
                                    </div>
                                    <div className="modal-body">
                                        <StarRatings
                                            rating={rating}
                                            starRatedColor="#ffb829"
                                            numberOfStars={5}
                                            name='rating'
                                            changeRating={(e) => setRating(e)}
                                        />

                                        <textarea
                                            name="review"
                                            id="review"
                                            className="form-control mt-4"
                                            placeholder="Enter your comment"
                                            value={comment}
                                            onChange={e => setComment(e.target.value)}
                                        ></textarea>

                                        <button
                                            id="new_review_btn"
                                            className="btn w-100 my-4 px-4"
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                            onClick={SubmitReview}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Review