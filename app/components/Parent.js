var React = require("react");

//sub components header & footer, header will change by news source 
//footer is more or less static, but served to UI via react
var Child = require("./Child");
var helpers = require("../utils/helpers");

// Create the Parent Component
var Parent = React.createClass({

  getInitialState: function() {
    return {
      title: "",
      newsID: "Main",
      likes: 0,
      link: ""
    };
  },

  //  On load display the number of clicks
  componentDidMount: function() {
    console.log("COMPONENT MOUNTED");

    helpers.getNews()
      .then(function(response) {
        // var newNews = response.data.length;
        console.log("react state responce" + response);
        this.setState({
          title: response.title,
          link: response.link,
          likes: response.likes
        });
        console.log("RESULTS", response);
        console.log("Saved clicks", newNews);
      }.bind(this));
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

  render: function() {
  return this.state.title.map(function(news, index){    
    return (
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


                <h1>{this.state.title}</h1>
                <h2>{this.state.link}</h2>
                <button
                  className="btn btn-primary btn-lg"
                  type="button"
                  onClick={this.handleLike}
                >
                Like
                </button>
                <hr />
                <Child likes={this.state.likes} />
                <Child title={this.state.title} />

              </div>
            </div>
          </div>
        </div>
      </div>
    ); // end of return
    }.bind(this),
); 
}
});

// Export the component back for use in other files
module.exports = Parent;