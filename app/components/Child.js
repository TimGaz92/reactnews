// Include React
var React = require("react");


// Create the Child Component
var Child = React.createClass({

  // Child has a state that follows the number of clicks
  getInitialState: function() {
    return {
      number: 0
    };
  },
  render: function() {
    return (

        <div className="panel-body text-center">
          <h5>{this.props.likes}</h5>
        </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Child;
