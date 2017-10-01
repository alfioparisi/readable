import React, { Component } from 'react';

class EditingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textarea: ''
    };
  }

  componentDidMount() {
    const { body } = this.props;
    this.setState({textarea: body});
  }

  render() {
    const { textarea } = this.state;
    const { onEdit } = this.props;
    return (
      <form>
        <textarea value={textarea} onChange={evt => this.setState({textarea: evt.target.value})} />
        <input type="submit" value="Edit" onClick={evt => {
          evt.preventDefault();
          onEdit(textarea, Date.now());
        }} />
      </form>
    );
  }
}

export default EditingForm;
