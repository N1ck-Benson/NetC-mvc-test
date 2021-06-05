class Comments extends React.Component {
    state = {
        buttonText: "Post",
        comments: this.props.comments,
        postId: this.props.postId,
        postedComment: { name: "", email: "", message: "", date: "Just now" },
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ buttonText: "Posted!" });
        const { name, email, message } = this.state.postedComment;
        const request = new FormData();
        req.append("Name", name);
        req.append("EmailAddress", email);
        req.append("Message", message);
        const xhr = new XMLHttpRequest();
        xhr.open("post", `/blog/postcomment/${this.props.postId}`, true);
        //Re-render comments optimistically
        xhr.onload = () => {
            const newComments = this.state.comments.push(this.state.postedComment);
            this.setState({ comments: newComments });
        };
        xhr.send(request);
    };

    onNameChange = ({ nativeEvent: { data } }) => {
        const newName = this.state.postedComment.name + data;
        const newComment = this.state.postedComment;
        newComment.name = newName;
        this.setState({ postedComment: newComment });
    };

    onEmailChange = ({ nativeEvent: { data } }) => {
        const newEmail = this.state.postedComment.email + data;
        const newComment = this.state.postedComment;
        newComment.email = newEmail;
        this.setState({ postedComment: newComment });
    };

    onMessageChange = ({ nativeEvent: { data } }) => {
        const newMessage = this.state.postedComment.message + data;
        const newComment = this.state.postedComment;
        newComment.message = newMessage;
        this.setState({ postedComment: newComment });
    };

    onFocus = () => {
        if (this.state.buttonText === "Posted!") {
            this.setState({ buttonText: "Post" });
        }
    };

    render() {
        const {
            onNameChange,
            onEmailChange,
            onMessageChange,
            handleSubmit,
            onFocus,
        } = this;
        const { buttonText } = this.state;

        const comments = JSON.parse(this.state.comments);

        return (
            // Comment form
            <div>
                <div class="card my-4">
                    <h5 class="card-header">Leave a Comment:</h5>
                    <div className="card-body">
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label for="Name">Name</label>
                                <input
                                    className="form-control"
                                    id="Name"
                                    name="Name"
                                    placeholder="Name"
                                    onChange={onNameChange}
                                    onFocus={onFocus}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label for="EmailAddress">Email Address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="EmailAddress"
                                    name="EmailAddress"
                                    placeholder="Email Address"
                                    onChange={onEmailChange}
                                    onFocus={onFocus}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label for="Message">Message</label>
                            <textarea
                                id="Message"
                                name="Message"
                                className="form-control"
                                rows="3"
                                placeholder="Write your message here..."
                                onChange={onMessageChange}
                                onFocus={onFocus}
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            onClick={handleSubmit}
                        >
                            {buttonText}
                        </button>
                    </div>
                </div>
                {/* Comments thread */}
                {!comments.length ? (
                    <div>Be the first to comment!</div>
                ) : (
                        comments.map((comment) => {
                            return (
                                <div class="media mb-4">
                                    <img
                                        class="d-flex mr-3 rounded-circle user-avatar"
                                        src={`https://eu.ui-avatars.com/api/?name=${comment.Name}`}
                                        alt={comment.Name}
                                    />
                                    <div class="media-body">
                                        <h5 class="mt-0">
                                            {comment.Name}s
                    <small>
                                                <em>({comment.Date})</em>
                                            </small>
                                        </h5>
                                        {comment.Message}
                                    </div>
                                </div>
                            );
                        })
                    )}
            </div>
        );
    }
}