import React from 'react';
import Change from './change';

export default class Changes extends React.Component {
  render() {
    const changes = this.props.changes.map((change) => {
      return <Change key={change.code} change={change} />;
    });

    return (
      <div>
        { changes }
      </div>
    );
  }
}
