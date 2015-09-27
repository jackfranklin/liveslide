import React from 'react';
import { Link } from 'react-router';
import Slide from './slide';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { talk: {} };
  }
  static childContextTypes = {
    talk: React.PropTypes.object
  }

  getChildContext() {
    return { talk: this.state && this.state.talk };
  }

  componentDidMount() {
    fetch('/slides').then((r) => r.json()).then((talk) => {
      this.setState({ talk: talk.slides });
    });
  }

  render() {
    return (
      <div>
        <h1>{ this.state.talk.title }</h1>
        <Link to="/slides/0">START</Link>
        { this.props.children }
      </div>
    );
  }
}
