import axios from "axios";
import { useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroller";

function App() {
  const accesskey="6c446b49b72a4c559d9b9d67183d5c1de1981d16f309063c3b994086e6ce1a26";
  const loader = <div className="loader">Loading ...</div>;
  
  const [posts, setPost] = useState({
    post: [],
    valid: false,
  });

  async function getPhotos(params) {
    let url = "https://api.unsplash.com/photos";
    let next = params;
    if(next){
      url = `${url}?page=${params.page}`;
    }
    try {
      let resp = await axios.get(url,{
        headers: {
          Authorization: `Client-ID ${accesskey}`,
        },
      });
      let data = resp.data;
      let newPost = posts.post;
      Object.keys(data).map((post)=>(
        newPost.push(data[post])
      ));
      setPost({post:newPost, valid: true});
    } catch (error) {}
  }

  let items = [];
  if(posts.valid){
      posts.post.map((post, i) => (
        items.push(
        <Card key={i} className="mt-4 mb-4" style={{ textAlign: "center" }}>
          <Card.Img variant="top" src={post.urls.small} />
          <Card.Body >
            <Card.Text>{post.alt_description}</Card.Text>
          </Card.Body>
        </Card>
        )       
      ))
  }

  return (
    <Container>
    <InfiniteScroll
      pageStart={0} 
      loadMore={()=>getPhotos({ page: items.length + 10})}
      hasMore={true || false}
      loader={loader}
      > 
      
        <Row>
          <Col>
            <h1 style={{ textAlign: "center" }} >BOLT React Coding Challenge</h1>
            <h3 style={{ textAlign: "center" }}>Images from Unsplash</h3>
            {items}
          </Col>
        </Row>
    </InfiniteScroll>
    </Container>
  );
}

export default App;
