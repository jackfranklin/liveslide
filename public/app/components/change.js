import React from 'react';

export default class Change extends React.Component {
  render() {
    return (
      <div className="code-change">
        <h5>File: { this.props.change.file }</h5>
        <pre>
          <code>
            { this.props.change.code }
          </code>
        </pre>
      </div>
    );
  }
}
