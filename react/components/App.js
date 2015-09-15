var React = require('react'),
    Row = require('react-bootstrap').Row,
    Col = require('react-bootstrap').Col,
    Navbar = require('react-bootstrap').Navbar,
    Button = require('react-bootstrap').Button,
    _ = require('lodash'),
    GoogleMap = require('react-google-maps').GoogleMap,
    Input = require('react-bootstrap').Input,
    DirectionsRenderer = require('react-google-maps').DirectionsRenderer,
    Marker = require('react-google-maps').Marker,
    SearchBox = require('react-google-maps').SearchBox,
    Geosuggest = require('react-geosuggest');


var PhoneButton = React.createClass({
  render: function() {
    return(
      <Row >
        <Col xs={12} >
          <Button bsStyle="primary" bsSize="large" block>
            Text me when the price is {this.props.lowestPrice}
          </Button>
        </Col>
      </Row>
    )
  }
});

var PhoneInput = React.createClass({
  render: function() {
    return(
      <Row >
        <Col xs={12} >
          <Input
            type="text"
            label={'Phone:'}
            placeholder={'Number to text'}
            ref="input"
            onChange={this.props.handleChange} />
        </Col>
      </Row>
    )
  }
})

var CheckPriceButton = React.createClass({
  render: function() {
    return(
      <Row >
        <Col xs={12} >
          <Button bsStyle="primary" bsSize="large" block>
            Check price on uber
          </Button>
        </Col>
      </Row>
    )
  }
});

var PriceWells = React.createClass({
  render: function() {
    return(
      <Row >
        <Col xs={6} >
          <div className='well'>Current Price: {this.props.prices.currentPrice}</div>
        </Col>
        <Col xs={6} >
          <div className='well'>Lowest Price: {this.props.prices.lowestPrice}</div>
        </Col>
      </Row>
    )
  }
});

var LoadScreen = React.createClass({ // if from locaton is not set
  render: function() {
    return(
      <Row >
        <Col xs={12} >
          <div className='jumbotron'>
            <div className="container">
              <h3 className='text-center'>
                Allow geolocation or enter your starting point to begin
              </h3>
            </div>
          </div>
        </Col>
      </Row>
    )
  }
});

var To = React.createClass({
  getInitialState: function() {
    return {
      latitude: this.props.latitude,
      longitude: this.props.longitude
    }
  },

  render: function() {
    return (
      <Row >
        <Col xs={12} >
          <Geosuggest
            placeholder='Destination:'
            onSuggestSelect={this.onSuggestSelect}
            location={new google.maps.LatLng(this.state.latitude, this.state.longitude)}
            radius="20" />
        </Col>
      </Row>
    )
  },

  onSuggestSelect: function(suggest) {
    this.setState({
      latitude: suggest.location.lat,
      longitude: suggest.location.lng
    })
  }
});

var From = React.createClass({
  getInitialState: function() {
    return {
      latitude: 53.5459,
      longitude: 9.966576 
    }
  },

  componentWillMount: function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setGeolocationState);
    }
  },

  setGeolocationState: function(position) {
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  },

  render: function() {
    return (
      <Row >
        <Col xs={12} >
          <Geosuggest
            placeholder='Starting Point:'
            onSuggestSelect={this.onSuggestSelect}
            location={new google.maps.LatLng(this.state.latitude, this.state.longitude)}
            radius="20" />
        </Col>
      </Row>
    )
  },

  onSuggestSelect: function(suggest) {
    this.setState({
      latitude: suggest.location.lat,
      longitude: suggest.location.lng
    })
  }
});

var FromInput = React.createClass({
  getInitialState: function() {
    return {
      value: '',
      bounds: null,
      center: {
        lat: 40.778078,
        lng: -73.969037
      },
      markers: []
    };
  },

  componentDidMount: function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setGeolocationState);
    }
  },

  setGeolocationState: function(position) {
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  },

  handleChange: function() {
    this.setState({
      value: this.refs.input.getValue()
    });
  },

  render: function() {
    return (
      <Input
        type="text"
        value={this.state.value}
        label={'From:'}
        placeholder={'Enter starting point'}
        ref="input"
        onChange={this.handleChange} />
    );
  }
});

var ToInput = React.createClass({
  getInitialState: function() {
    return {
      value: ''
    };
  },

  componentDidMount: function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setGeolocationState);
    }
  },

  setGeolocationState: function(position) {
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  },

  handleChange: function() {
    this.setState({
      value: this.refs.input.getValue()
    });
  },

  render: function() {
    return (
      <Input
        type="text"
        value={this.state.value}
        label={'To:'}
        placeholder={'Enter Destination'}
        ref="input"
        onChange={this.handleChange} />
    );
  }
});

var Directions = React.createClass({
  getInitialState: function() {
    return {
      origin: new google.maps.LatLng(41.8507300, -87.6512600),
      destination: new google.maps.LatLng(41.8525800, -87.6514100),
      directions: null,
    }
  },

  componentDidMount: function()  {
    var DirectionsService = new google.maps.DirectionsService();

    DirectionsService.route({
      origin: this.state.origin,
      destination: this.state.destination,
      travelMode: google.maps.TravelMode.DRIVING
    }, function(result, status) {
      if(status == google.maps.DirectionsStatus.OK) {
        this.setState({
          directions: result
        })
      }
      else {
        console.error('error fetching directions ' +  result );
      }
    }.bind(this));
  },

  render: function() {
    var origin = this.state.origin,
        directions = this.state.directions;

    return (
      <Row >
        <Col xs={12} >
          <GoogleMap containerProps={{...this.props, style: {height: "300px", margin: '0 0 20px 0'}}}
            defaultZoom={7}
            defaultCenter={origin}>
            {directions ? <DirectionsRenderer directions={directions} /> : null}
          </GoogleMap>
        </Col>
      </Row >
    );
  }
});

module.exports = React.createClass({
  displayName: 'App',

  getInitialState: function() {
    return {
      directionLocations: {},
      prices: {}
    };
  },

  showDirectionsValidation: function(value) {
    return (typeof value === 'number');
  },

  showDirections: function() {
    return _.keys(this.state.directionLocations).length === 4 &&  _.all(_.values(this.state.directionLocations), showDirectionsValidation);
  },

  render: function(){
    return (
      <div>
        <nav className='navbar navbar-inverse navbar-static-top'>
          <div className='navbar-header'>
            <div className='navbar-brand navbar-brand active'>
              Textmewhen
            </div>
          </div>
        </nav>
        <div className='jumbotron'>
          <div className="container">
            <h1 className='text-center'>
              Get a text when your Uber is cheapest
            </h1>
          </div>
        </div>
          <div className="container">
            <From />
            <To latitude={53.5459} longitude={9.966576} />
            {true ? null : <LoadScreen/>}
            {this.showDirections() ?  <Directions /> : null}
            {true ? null : <PriceWells prices={this.state.prices}/>}
            {true ? null : <CheckPriceButton/>}
            {true ? null : <PhoneInput handleChange={null}/>}
            {true ? null : <PhoneButton lowestPrice={this.state.prices.lowestPrice}/>}
          </div>
      </div>
    );
  }
})
