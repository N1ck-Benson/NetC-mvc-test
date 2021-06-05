const BlogPost = (props) => {
    const { title, date, image } = props;
    return (
        <div>
            <div className="col-lg-12">

                <h1 className="mt-4">{title}</h1>

                <p>Posted on {date}</p>

                <figure className="figure">
                    <object type="image/png" data="https://images.shiksha.com/mediadata/images/articles/1595223757phpKQlQQK.jpeg">
                        <img className="img-fluid" src={image} alt="Image" />
                    </object>
                </figure> 

            </div>
        </div>
    );
}


