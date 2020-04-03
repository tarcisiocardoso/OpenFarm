import React, { Component } from 'react';

class OvinoList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ovinos: [],
      isLoading: false
    };
  }

  async componentDidMount() {
    this.setState({isLoading: true});

    // const response = await fetch('/api/ovino');
    // console.log(">>>componentDidMount<<<", response );
    // const data = await response.json();
    // this.setState({ovinos: data, isLoading: false});
    fetch('/api/ovino')
    .then(response => response.json())
    .then(data => this.setState({ ovinos: data, isLoading: false }))
    .catch(error => this.setState({ error, isLoading: false }));

  }

  render() {
    const {ovinos, isLoading, error} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }
    if (error) {
      console.log( error );
      return <p>Problema</p>;
    }
    return (
      <div>
        <h2>Ovino List</h2>
        {ovinos.map((ovino ) =>
          <div key={ovino.id}>
            {ovino.raca}<br/>
          </div>
        )}
      </div>
    );
  }
}

export default OvinoList;
