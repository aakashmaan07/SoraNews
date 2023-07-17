//rce
import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {
  const [articles, setarticles] = useState([]);
  const [loading, setloading] = useState(true);
  const [page, setpage] = useState(1);
  const [totalResults, settotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setloading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(70);
    setarticles(parsedData.articles);
    settotalResults(parsedData.totalArticles);
    setloading(false);
    props.setProgress(100);
  }

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)}-SoraNews`
    updateNews();
  }, []);


  // const handlePrevClick = async () => {

  //   // let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ce79795c9c8348e998d1805f3d75f873&page=${this.state.page-1}&pageSize=${props.pageSize}`;
  //   // this.setState({loading:true});
  //   // let data=await fetch(url);
  //   // let parsedData=await data.json();
  //   // console.log(parsedData);

  //   // this.setState({
  //   //   page: this.state.page-1,
  //   //   articles:parsedData.articles,
  //   //   loading:false
  //   // })
  //   setpage(page - 1);
  //   updateNews();
  // }

  // const handleNextClick = async () => {
  //   // if(!(this.state.page +1 > Math.ceil(this.state.totalArticles/props.pageSize))){
  //   //   let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ce79795c9c8348e998d1805f3d75f873&page=${this.state.page+1}&pageSize=${props.pageSize}`;
  //   //   this.setState({loading:true});
  //   //   let data=await fetch(url);
  //   //   let parsedData=await data.json();
  //   //   console.log(parsedData);
  //   //   this.setState({
  //   //     page: this.state.page+1,
  //   //     articles:parsedData.articles,  
  //   //     loading: false
  //   //   })
  //   // }
  //   setpage(page + 1);
  //   updateNews();
  // }

  const fetchMoreData = async () => {
    setpage(page + 1);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
    setpage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setarticles(articles.concat(parsedData.articles));
    settotalResults(parsedData.totalResults);
  }

  return (
    <>
      <h1 className="text-center" style={{ backgroundColor: "#023e8a", paddingTop: '90px', paddingBottom: '35px', margin: '0px', color: "antiquewhite" }}><b>SoraNews - Top Headlines from {capitalizeFirstLetter(props.category)}</b></h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
        style={{ backgroundColor: "#023e8a" }}
      >

        <div className="container" >
          <div className="row">
            {articles.map((element) => {
              return <div className="col-md-3" style={{ marginBottom: "7px" }} key={element.url}>
                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""}
                  imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
              </div>
            })}
          </div>
        </div>
      </InfiniteScroll>
      {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalArticles / props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
    </>
  )
}

News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general'
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}


export default News