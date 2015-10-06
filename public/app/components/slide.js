import React from 'react';
import { Link } from 'react-router';
import Changes from './changes';

export default class Slide extends React.Component {

  constructor(props) {
    super(props);
    this.state = { index: this.props.params.number };
  }

  fetchSlide() {
    fetch(`/slides/${this.props.params.number}`)
      .then((r) => r.json())
      .then((slide) => this.setState({ slide: slide.slide }));
  }

  componentDidMount() {
    this.fetchSlide();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.params.number === this.props.params.number) return;
    this.fetchSlide();
  }


  renderPreviousLink() {
    const slideIndex = parseInt(this.props.params.number, 10);
    if (slideIndex === 0) return null;
    return (
      <span id="slide-navigation-prev">
        <Link to={`/slides/${slideIndex-1}`}>&lt;&lt; { slideIndex - 1}</Link>
      </span>
    );
  }

  renderNextLink() {
    //TODO: don't render it if it's the last slide
    const slideIndex = parseInt(this.props.params.number, 10);
    return (
      <span id="slide-navigation-next">
        <Link to={`/slides/${slideIndex+1}`}>{ slideIndex + 1} &gt;&gt;</Link>
      </span>
    );
  }
  render() {
    if (!(this.state && this.state.slide)) return null;

    const slideIndex = parseInt(this.props.params.number, 10);
    const slide = this.state.slide;
    console.log('got slide', slide);

    const notes = this.state.slide.notes.map((note) => {
      return <li key={note}>{ note }</li>;
    });

    return (
      <div id="slide">
        <div id="slide-heading">
          { this.renderPreviousLink() }
          <h3 id="slide-name">{ slideIndex }: { this.state.slide.name }</h3>
          { this.renderNextLink() }
        </div>

        <div id="slide-notes">
          <ul>{ notes }</ul>
        </div>

        <div id="slide-changes">
          <Changes changes={this.state.slide.changes} />
        </div>
      </div>
    );
  }
}
