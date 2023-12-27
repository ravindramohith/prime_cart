import React from 'react'
import StarRatings from 'react-star-ratings';

const Reviews = ({ reviews }) => {
    return (
        <div class="reviews w-75">
            <h3>Reviews:</h3>
            <hr />
            {reviews?.map((review) => (
                <div key={review?._id} class="review-card my-3">
                    <div class="row">
                        <div class="col-1">
                            <img
                                src={review?.user?.avatar ? review?.user?.avatar?.url : "../images/default_avatar.jpg"}
                                alt={review?.user?.name}
                                width="50"
                                height="50"
                                class="rounded-circle"
                            />
                        </div>
                        <div class="col-11">
                            <StarRatings
                                rating={review?.rating}
                                starRatedColor="#ffb829"
                                numberOfStars={5}
                                name='rating'
                                starDimension='22px'
                                starSpacing='1px'
                            />
                            <p class="review_user">by {review?.user?.name}</p>
                            <p class="review_comment">{review?.comment}</p>
                        </div>
                    </div>
                    <hr />
                </div>
            ))}
        </div>
    )
}

export default Reviews