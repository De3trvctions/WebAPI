import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Popup from 'react-popup';
import './Popup.css';
import {
  Jumbotron,
  Alert,
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody
} from 'reactstrap';

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getAllMovies = () => {
    axios
      .get('/getallmovies')
      .then(result => {
        this.setState({ movies: result.data });
        console.log(this.state.movies);
      })
      .catch(error => {
        console.log(error);
      });
  };
  componentDidMount() {
    this.getAllMovies();
  }

  handleSubmit(e) {
    const query = `/getmovie?title=${this.input.value}`;

    console.log(query);
    e.preventDefault();
    axios
      .get(query)
      .then(result => {
        console.log(result);
        if (result.data === 'Not found') {
          Popup.alert('Movie Not Found');
        }
        this.getAllMovies();
      })
      .catch(error => {
        alert('Error: ', error);
      });
  }

  deleteRecord = value => {
    console.log('to delete: ', value);
    const query = `/deletemovie?title=${value}`;
    axios
      .get(query)
      .then(result => {
        this.getAllMovies();
      })
      .catch(error => {
        alert('Error: ', error);
      });
  };

  //https://www.codementor.io/blizzerand/building-forms-using-react-everything-you-need-to-know-iz3eyoq4y
  //todo add buttons to delete rows
  //https://codepen.io/aaronschwartz/pen/awOyQq?editors=0010
  //https://github.com/react-tools/react-table/issues/324
  render() {
    var data = this.state.movies;
    data = data.reverse();

    return (
      <div className="App">
        <Container>
          <Jumbotron>
            <h1 className="display-3">Game Search</h1>
            <p className="lead">Search for game</p>
          </Jumbotron>
          <Row>
            <Col>
              <Alert
                color="danger"
                isOpen={this.state.alertVisible}
                toggle={this.onDismiss}
              >
              Game not found
              </Alert>
            </Col>
          </Row>
          <Row>
            <Col sm="9">
              <Input
                type="text"
                name="title"
                id="findGame"
                placeholder="Search a game title..."
                onChange={this.onFindGame}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
