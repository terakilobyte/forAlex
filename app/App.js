var React = require('react');
var SearchItunes = require('./SearchItunes');
var Griddle = require('griddle-react');
var InfiniteGrid = require('react-infinite-grid');
var {ScrollbarWrapper} = require('react-scrollbars');


var ImageComponent = React.createClass({

  propTypes: {
    data: React.PropTypes.string.isRequired
  },

  render() {
    return (
      <img className="infinite-list-item" src={this.props.data} />
    );
  }
});



var UrlComponent = React.createClass({

render() {
  return (
    <a href={this.props.data}>{this.props.rowData.trackName}</a>
  );
}

});

var App = React.createClass({
  getInitialState() {
    return {
      data: ''
    };
  },

  updateState(data) {
    this.setState({
      data
    });
  },

  styles: {
    griddleStyle: {
      marginTop: '100',
      overflow: 'hidden'
    },
    searchBarStyle: {
      marginTop: '10',
      marginBottom: '49'
    },
    gridStyle: {
      overflowY: 'hidden'
    }
  },

  render(){
    /*
    var griddleMeta = [
      {
        columnName: 'trackName',
        displayName: 'Name'
      },
      {
        columnName: 'artistName',
        displayName: 'Artist'
      },
      {
        columnName: 'primaryGenreName',
        displayName: 'Genre'
      },
      {
        columnName: 'artworkUrl100',
        displayName: 'Artwork',
        customComponent: ImageComponent
      },
      {
        columnName: 'trackPrice',
        displayName: 'Price'
      },
      {
        columnName: 'kind',
        displayName: 'Type'
      },
      {
        columnName: 'trackViewUrl',
        displayName: 'Online Link',
        customComponent: UrlComponent
      }
    ];
*/
    console.log(this.state.data);

    if (this.state.data) {
      var items = this.state.data.map(elem => {
        return (
          <ImageComponent className="infinite" data={elem.artworkUrl100}/>
        );
      });
    }
    return (
      <span className="infinite">
        <div className="navbar navbar-default navbar-fixed-top"
          role="navigation"
          style={this.styles.searchBarStyle}>
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                <SearchItunes cb={this.updateState} />
              </div>
            </div>
          </div>
        </div>
        <div className="row infinite" style={this.styles.griddleStyle}>
        {/*
        <div className="panel panel-default" style={this.styles.griddleStyle}>
          <div className="panel-heading">
            {this.state.data ? 'Your Search Results' : 'Make a search'}
          </div>
          <Griddle results={this.state.data}
            columnMetadata={griddleMeta}
            tableClassName="table"
            columns={["trackName", "artistName", "primaryGenreName",
              "artworkUrl100", "trackPrice", "kind", "trackViewUrl"]}
            resultsPerPage={5}
            enableInfiniteScroll={true}
            bodyHeight={400}
          />
        </div>
        */}
          {this.state.data ? (
            <ScrollbarWrapper vertical={true} horizontal={true}>
          <InfiniteGrid
            className="infinite"
            style={this.styles.gridStyle}
            entries={items}
            wrapperHeight={150}
            padding={10}
            height={100}
            width={100}>
          </InfiniteGrid>
          </ScrollbarWrapper>
            ) : ( <div /> )}
        </div>
      </span>
    )
  }
});


React.render(
  <App />,
  document.getElementById('app')
);
