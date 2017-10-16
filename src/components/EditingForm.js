import React, { Component } from 'react';

/**
  @param {string} : the comment body
  @param {function} : edit the comment
*/
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
      <div>
        <form>
          <textarea value={textarea} onChange={evt => this.setState({textarea: evt.target.value})} />
        </form>
        <button className="confirm-edit" onClick={() => onEdit(textarea, Date.now())}>
          Edit
        </button>
      </div>
    );
  }
}

export default EditingForm;
