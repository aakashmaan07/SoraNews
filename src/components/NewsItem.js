//rce
import React from 'react'

const NewsItem = (props) => {
  let { title, description, imageUrl, newsUrl, author, date, source } = props;
  return (
    <div>
      <div className="card" style={{border:"2px solid black"}}>
        <div >
          <span className="badge rounded-pill" style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0',backgroundColor:"#ffbd00",color:"black" }}>
            {source}
          </span>
        </div>
        <img src={!imageUrl ? "https://a.c-dn.net/b/4hk9r3/ukbig.jpg" : imageUrl} className="card-img-top" alt="..." />
        <div className="card-body" style={{padding:"0px"}}>
          <h5 className="card-title" style={{backgroundColor:"#d00000",color:"white",padding:"15px",margin:"0px", fontSize:"19px"}}>{title}</h5>
          <p className="card-text" style={{padding:"12px",backgroundColor:"antiquewhite",margin:"0px"}}>{description}</p>
          <p className="card-text" style={{padding:"12px",backgroundColor:"antiquewhite",margin:"0px"}}><small className="text-muted">By {author ? author : "Unknown"} on {new Date(date).toGMTString()} </small></p>
          <a rel='noreferrer' href={newsUrl} target="_blank" className="btn btn-sm btn-dark d-flex justify-content-center">Read More</a>
        </div>
      </div>
    </div>
  )
}

export default NewsItem
