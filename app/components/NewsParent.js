var React = require("react");

//sub components header & footer, header will change by news source 
//footer is more or less static, but served to UI via react
var Child = require("./Header");
var helpers = require("../utils/helpers");

// Create the Parent Component
var Parent = React.createClass({

  getInitialState: function() {
    return {
      clicks: 0,
      clickID: "Main"
    };
  },

  //  On load display the number of clicks
  componentDidMount: function() {
    console.log("COMPONENT MOUNTED");

    helpers.getClicks()
      .then(function(response) {
        var newNews = response.data.length ? response.data[0].clicks : 0;
        this.setState({
          clicks: newClicks
        });
        console.log("RESULTS", response);
        console.log("Saved clicks", newClicks);
      }.bind(this));
  },


  componentDidUpdate: function(prevState) {
    console.log("COMPONENT UPDATED");
    if (prevState.clicks !== this.state.clicks) {
      helpers.saveClicks({ clickID: this.state.clickID, clicks: this.state.clicks })
        .then(function() {
          console.log("Posted to MongoDB");
        });
    }
  },

  handleClick: function() {
    this.setState({ clicks: this.state.clicks + 1 });
  },

  resetClick: function() {
    this.setState({ clicks: 0 });
  },

  render: function() {
    return (
      <div className="container">

        <div className="row">

          <div className="jumbotron">
            <h2>React-ing to the News</h2>
            <hr />
            <p>
              <button
                className="btn btn-primary btn-lg"
                type="button"
                onClick={this.handleClick}
              >
                CLICK ME!!!!
              </button>

              <button
                className="btn btn-danger btn-lg"
                type="button"
                onClick={this.resetClick}
              >
                Reset
              </button>
            </p>
          </div>

          <div className="col-md-12">

            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title text-center">Parent</h3>
              </div>
              <div className="panel-body text-center">


                <h1>{this.state.clicks}</h1>

                <Child clicks={this.state.clicks} />

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Parent;