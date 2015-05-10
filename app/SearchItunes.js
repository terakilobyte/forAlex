var React = require('react');
var $ = require('jquery');
var {debounce} = require('lodash');

var SearchItunes = React.createClass({

  propTypes: {
    cb: React.PropTypes.func.isRequired
  },

  formatURL: function() {
    var url = 'https://itunes.apple.com/search?term=' +
      this.refs.searchInput.getDOMNode().value +
      '&entity=' +
      this.refs.selectInput.getDOMNode().value;
    return url;
  },

  handleInput: function(e) {
    this.debounced();
  },



  componentWillMount: function() {
    this.debounced = debounce(function() {
      $.ajax({
        url: this.formatURL(),
        dataType: 'jsonp',
        success: (data, textStatus, jqXHR) => {
          this.props.cb(data.results);
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.error(textStatus, errorThrown);
          // error callback
        }
      });
    }, 1000);
  },

  render: function(){
    return (
      <div className="row">
        <div className="col-sm-12">
          <div className="input-group-inline col-sm-4">
            <input className="form-control" ref="searchInput"
              autoFocus = 'true'
              onKeyPress={this.handleInput}
            />
          </div>{' '}
          <div className="input-group-inline col-sm-4">
            <select className="form-control"
              ref="selectInput"
              onChange={this.handleInput}
            >
              <option value="musicTrack">Music</option>
              <option value="movie">Movie</option>
            </select>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = SearchItunes;
