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
        request.append("Name", name);
        request.append("EmailAddress", email);
        request.append("Message", message);
        const xhr = new XMLHttpRequest();
        xhr.open("post", `/blog/postcomment/${this.props.postId}`, true);
        //Re-render comments optimistically
        xhr.send(request);
        const newComments = this.state.comments.slice(0, -1);
        const postedCommentString = JSON.stringify(this.state.postedComment);
        newComments = newComments + "," + postedCommentString + "]";
        this.setState({ comments: newComments });
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
                                <label htmlFor="Name">Name</label>
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
                                <label htmlFor="EmailAddress">Email Address</label>
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
                            <label htmlFor="Message">Message</label>
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
                {!comments ? (
                    <div>Be the first to comment!</div>
                ) : (
                        comments.map((comment) => {
                            const { Name, Date, Message } = comment;
                            const trimmedDate = Date.slice(0, Date.indexOf("T"));
                            return (
                                <div class="media mb-4" key={Date}>
                                    <img
                                        class="d-flex mr-3 rounded-circle user-avatar"
                                        src={`https://eu.ui-avatars.com/api/?name=${comment.Name}`}
                                        alt={Name}
                                    />
                                    <div class="media-body">
                                        <h5 class="mt-0">
                                            {comment.Name} &nbsp;
                    <small>
                                                <em>({trimmedDate})</em>
                                            </small>
                                        </h5>
                                        {Message}
                                    </div>
                                </div>
                            );
                        })
                    )}
            </div>
        );
    }
}