import React, { Component } from 'react'

export class NewsItem extends Component {
 
  render() {
    let {title,description,imageurl,newsurl,author,date,source} = this.props;
    return (
      <div className='my-3'>
       <div className="card" >
      <div style={
      {display:'flex',
        justifyContent:'flex-end',
        position:'absolute',
        right:0}
      }>
  <span className=" badge rounded-pill bg-danger" >
   {source}
    
  </span>
  </div>
  <img src={!imageurl ?"https://lh3.googleusercontent.com/J6_coFbogxhRI9iM864NL_liGXvsQp2AupsKei7z0cNNfDvGUmWUy20nuUhkREQyrpY4bEeIBuc=s0-w300-rw":imageurl} className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title">{title} </h5>
    <p className="card-text">{description}</p>
    
      
      <p className="card-text"><small className="text-danger">By {!author?'unknown':author} on{new Date(date).toGMTString()}</small></p>
    
  
    <a rel='norefferer' href={newsurl} target="_blank"className="btn btn-sm btn-dark">Read More</a>
  </div>
</div>
      </div>
    )
  }
}

export default NewsItem