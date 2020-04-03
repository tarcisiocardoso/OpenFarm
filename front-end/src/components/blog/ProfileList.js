import React, { Component } from 'react';


class ProfileList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      profiles: [],
      isLoading: false
    };
  }

//   async componentDidMount() {
//     this.setState({isLoading: true});

//     const response = await fetch('http://localhost:8081/post/sse');
//     const data = await response.json();
//     this.setState({profiles: data, isLoading: false});
//   }

    async componentDidMount() {
        this.setState({isLoading: true});
        const response = await fetch('http://localhost:8081/post/user/1234');
        const data = await response.json();
        this.setState({profiles: data, isLoading: false});

        if( !!data){
          let dt = data.dtUpdate;
          localStorage.setItem("postLastDate", dt);
        }else{
          localStorage.setItem("postLastDate", new Date() );
        }
        const eventSource = new EventSource('http://localhost:8081/post/sse'); 
        // eventSource.onopen = (event) => console.log('open', event); 
        eventSource.onmessage = (event) => {

            // console.log(">>>event.data<<<", event.data );
            // const profile = JSON.parse(event.data).source;
            const profile = JSON.parse(event.data); 
            
            if( !(this.state.profiles.find(p => p.id === profile.id)) ){
              this.state.profiles.push(profile );
            }
            
            this.setState({profiles: this.state.profiles}); 
        };
        // eventSource.onerror = (event) => console.log('error', event);
    }

  render() {
    const {profiles, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
      <div>
        <h2>Profile List</h2>
        {profiles.map && profiles.map((profile) =>
          <div key={profile.id}>
            {profile.titulo}<br/>
          </div>
        )}
      </div>
    );
  }
}

export default ProfileList;