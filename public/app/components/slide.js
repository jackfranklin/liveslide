import React from 'react';

export default class Slide extends React.Component {

  static contextTypes = {
    talk: React.PropTypes.object
  }

  componentDidMount() {
    fetch(`/slides/${this.props.params.number}`)
      .then((r) => r.json())
      .then((slide) => this.setState({ slide }));
  }

  render() {
    if (!(this.state && this.state.slide)) return null;

    const slideIndex = this.props.params.number;
    const slide = this.state.slide;
    console.log('got slide', slide);

    return (
      <div id="slide">
        <h3>{ this.state.slide.name }</h3>
      </div>
    );
  }
}
