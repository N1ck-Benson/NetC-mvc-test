const BlogPost = (props) => {
    const { title, date, image } = props;
    return (
        <div>
            <div className="col-lg-12">

                <h1 className="mt-4">{title}</h1>

                <p>Posted on {date}</p>

                <figure className="figure">
                    <img className="img-fluid" src={image} alt="Image" />
                </figure> 

            </div>
        </div>
    );
}


