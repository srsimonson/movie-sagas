import React, { Component } from 'react';
import { connect } from 'react-redux';

class Edit extends Component {

    state = {
        title: '',
        description: ''
    }

  componentDidMount = () => {
    // this.props.dispatch({type: 'REQUEST_DETAILS'})
  }

  cancel = () => {
      this.props.history.push('/Details')
  }

  save = () => {
      console.log('this.props.reduxStore', this.props.reduxStore);
      console.log('save clicked');
      this.props.dispatch({type: 'UPDATE_MOVIES', payload: 
      {title: this.state.title,
        description: this.state.description,
        id: this.props.reduxStore.details.id
        }})
        this.props.dispatch({type: 'REQUEST_DETAILS'})
        // this.props.history.push('/')
  }

  titleChange = (event) => {
      this.setState({
          ...this.state,
          title: event.target.value
      })
      console.log('event.target.value', this.state.title);
  }

  descriptionChange = (event) => {
    this.setState({
        ...this.state,
        description: event.target.value
    })
    console.log('event.target.value', this.state.description);
}

  render() {
    return (
        <div className="App">
            <h1>EDIT</h1>
            <button onClick={this.cancel}>Cancel</button>
            <button onClick={this.save}>Save</button>
            {/* <h1>{this.props.reduxStore.details.title}</h1>
            <p>{this.props.reduxStore.details.description}</p> */}
            <label>Title</label>
                <input onChange={this.titleChange} value={this.state.title}></input>
            <label>Description</label>
                <input onChange={this.descriptionChange} value={this.state.description}></input>
   
            {/* <p>{JSON.stringify(this.props.reduxStore.submitSurveyData)}</p> */}
            {/* display genres below */}
        </div>
    );
  }
}

const mapStateToProps = (reduxStore) => ({ reduxStore });
export default connect(mapStateToProps)(Edit);