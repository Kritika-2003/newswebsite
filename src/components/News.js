import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import propTypes from 'prop-types';
import { Category } from '@mui/icons-material';
import InfiniteScroll from "react-infinite-scroll-component";


export class news extends Component {
 static defaultProps={
  country:'in',
  pageSize:8,
  category:'general',

 }
 static propTypes={
  country:propTypes.string,
  pageSize:propTypes.number,
  category:propTypes.string

 }

 capitalizeFirstLetter=(string)=> {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
  constructor(props){
    super(props);
    console.log("hello,I am a constructor from news component.")
    this.state={
      articles:[],
      loading:true,
      page:1,
      totalResults:0
    }
    document.title=`${this.capitalizeFirstLetter(this.props.category)} - NEWS MONKEY APP`;
  }

  async UpdateNews(pageNo){
    const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4bfa3c1bce9d4543b8dff418a641238b&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data=await fetch(url);
    let parseddata=await data.json()
    this.setState({articles:parseddata.articles,
      totalResults:parseddata.totalResults,
      loading:false,
   })
    
  }





async componentDidMount(){
  this.UpdateNews();
}

 handlepreviousclick= async()=>{

this.setState({page:this.state.page-1})
this.UpdateNews();
}

 handleNextclick=async()=>
{

this.setState({page:this.state.page+1})
this.UpdateNews();

}


fetchMoreData = async() => {
 
 this.setState({page:this.state.page+1})
 const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4bfa3c1bce9d4543b8dff418a641238b&page=${this.state.page}&pageSize=${this.props.pageSize}`;

 let data=await fetch(url);
 let parseddata=await data.json()
 this.setState({
  articles:this.state.articles.concat(parseddata.articles),
   totalResults:parseddata.totalResults,
   loading:false,
 })
};



  render() {
   
  
    return (
      <div className='container my-3'>
       <h1 className='text-center' style={{margin:'40px'}}>RAPID REPORT-Top  {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        
       {this.state.loading && <Spinner/>}

       
       <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className='container'>
       <div className='row'>
       {this.state.articles.map((element)=>{
        return<div className='col-md-4' key={element.url}>
         <NewsItem title={element.title} description={element.description} imageurl={element.urlToImage}
         newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
        
      </div>
    
       })}
      </div>
      </div>
        </InfiniteScroll>
        
        </div>
       
    )
  }
}

export default news
