import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Home.css';


class Home extends Component {

    // state = {
    //     movieId: 0,
    //     movieTitle: '',
    //     movieDescription: ''
    // }

  componentDidMount = () => {      
      console.log('in componentDidMount HOME');
      this.props.dispatch({type: 'REQUEST_MOVIES'})
    }

  movieDetails = (taco) => {
      this.props.dispatch({type: 'SET_DETAILS', payload: taco})
      this.props.history.push('/Details')
    //   console.log('this.state.movieId', this.state.movieId);
  }

  render() {
    return (
        <div className="App">
            <div className="container">
                {this.props.reduxStore.movies.map((movieItem) => {
                    // console.log('movieItem.id', this.movieItem.id);
                    
                    return (
                        <div key={movieItem.id} className="container">
                            <img src={movieItem.poster} alt='' onClick={ () => this.movieDetails(movieItem)}/>
                            <h1>{movieItem.title}</h1>
                            <p>{movieItem.description}</p>
                        </div>

                        // <div key={movieItem.id}>
                        //     <img src={movieItem.poster} alt=''/>
                        //     <h1>{movieItem.title}</h1>
                        //     <p>{movieItem.description}</p>
                        // </div>
                    )
                })}
            </div>
            {/* <p>{JSON.stringify(this.props.reduxStore.movies)}</p> */}
        </div>
    );
  }
}

const mapStateToProps = (reduxStore) => ({ reduxStore });
export default connect(mapStateToProps)(Home);