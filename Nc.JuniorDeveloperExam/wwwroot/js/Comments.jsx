class Comments extends React.Component {
    state = {
        buttonText: "Post",
        comments: this.props.comments,
        postedComment: { name: "", email: "", message: "", date: "Just now" },
    };

    handleSubmit = () => {
        this.setState({ buttonText: "Posted!" });
        const { name, email, message } = this.state.postedComment;
        const req = { Name: name, EmailAddress: email, Message: message };
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

    render() {
        const { onNameChange, onEmailChange, onMessageChange, handleSubmit } = this;
        const { buttonText } = this.state;
        return (

        // Comments form
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
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                    {buttonText}
                </button>
            </div>
        </div>
        );
    }
}