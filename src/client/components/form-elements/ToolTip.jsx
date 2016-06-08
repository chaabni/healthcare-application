import React from 'react';

class ToolTip extends React.Component {
  constructor(props) {
    super(props);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {};
  }

  componentWillMount() {
    this.setState({ closed: true });
  }

  handleOpen() {
    this.setState({ closed: false });
  }

  handleClose() {
    this.setState({ closed: true });
  }

  render() {
    return (
      <div className="hca-tooltip">
        <button className="help-link" tabIndex={this.props.tabIndex} onClick={this.handleOpen}>More Info</button>
        <div className="help-content call-out" aria-hidden={this.state.closed}>
          {this.props.toolTipText}
          <br/>
          <button className="close-link" tabIndex={this.props.tabIndex} onClick={this.handleClose}>Close</button>
        </div>
      </div>
    );
  }
}

ToolTip.propTypes = {
  view: React.PropTypes.string,
};

export default ToolTip;
