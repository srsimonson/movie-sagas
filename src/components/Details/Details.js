import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Details.css';


class Details extends Component {

  componentDidMount = () => {
    //   this.props.dispatch({type: 'REQUEST_DETAILS'})
      this.props.dispatch({type: 'REQUEST_GENRES', payload: this.props.reduxStore.details.id})
      console.log('details.js details:', this.props.reduxStore.details);
      console.log('details.js genres:', this.props.reduxStore.details);
      
  }

  back = () => {
      this.props.history.push('/')
  }

  edit = () => {
      this.props.history.push('/Edit')
  }

  render() {
    return (
        <div className="App">
            <button onClick={this.back}>Back to List</button>
            <button onClick={this.edit}>Edit</button>
            <h1>{this.props.reduxStore.details.title}</h1>
            <p>{this.props.reduxStore.details.description}</p>
            <ul>
                {this.props.reduxStore.genres.map(item =>
                    <li key={item.id}>{item.name}</li>)}
            </ul>


        </div>
    );
  }
}

const mapStateToProps = (reduxStore) => ({ reduxStore });
export default connect(mapStateToProps)(Details);