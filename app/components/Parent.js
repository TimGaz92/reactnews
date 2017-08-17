var React = require("react");

//sub components header & footer, header will change by news source 
//footer is more or less static, but served to UI via react
var Child = require("./Child");
var helpers = require("../utils/helpers");

// Create the Parent Component
var Parent = React.createClass({

  getInitialState: function() {
    return { savedArticles: ""
    };
  },

  //  On load display the number of clicks
  componentDidMount: function() {
    console.log("COMPONENT MOUNTED");

helpers.getSaved().then(function(articleData) {
      this.setState({ savedArticles: articleData.data });
      console.log("saved results", articleData.data);
    }.bind(this))
  },


  componentDidUpdate: function(prevState) {
    console.log("COMPONENT UPDATED");
    if (prevState.news !== this.state.news) {
      helpers.saveLikes({ newsID: this.state.newsID, title: this.state.title, link: this.state.link, likes: this.state.likes })
        .then(function() {
          console.log("Posted to MongoDB");
        });
    }
  },

  handleLike: function() {
    this.setState({ likes: this.state.likes + 1 });
  },
  handleScrape: function(){
    console.log('scraping 2 ');
  },
renderEmpty: function (){
      return (<div>
      <h1> Nothing to display, sorry </h1>
            </div>
  )},

renderContainer: function() {
    return  (
      <div className="container">

       <div className="row">

         <div className="jumbotron">
            <h2>React-ing to the News</h2>
            <hr />
              
           <a id="redditA" href="/findred">worldNews</a>

         </div>

         <div className="col-md-12">

           <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title text-center">Top Stories</h3>
              </div>
              <div className="panel-body text-center">

             {
                this.state.savedArticles.map(function(article, index) {    
                 return (

                   
                   <div>
                      <h3 key={index}>{article.title[0]}</h3> 
                      <h4> {article.link} </h4>
                      <h5> Likes: {article.likes} </h5>
                       <hr />
                      
                    </div>
                  )
      
               })
              }
                

             </div>
              }
            </div>
          </div>
        </div>
      </div>
    ); // end of return
    // }.bind(this)); //end of render function 
},
//render articles 
render: function(){
  if (!this.state.savedArticles) {
    return this.renderEmpty();
  }
  return this.renderContainer();
}
});
//





// Export the component back for use in other files
module.exports = Parent;