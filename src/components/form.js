import events from "@flk/events";
import React from "react";

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      isValidForm: false,
    };

    this.formElement = null;
    this.setIsvalidForm = this.setIsvalidForm.bind(this);
  }

  componentDidMount() {
    this.setIsvalidForm = this.setIsvalidForm.bind(this);
  }

  setIsvalidForm(state) {
    this.setState({ isValidForm: state });
  }

  /**
   * Submit form
   */
  triggerSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
     this.setState({ isValidForm: true });

    // validate all inputs
    events.trigger("form.validation", this, this.setIsvalidForm);

    // check if the form is valid
    // if not, then do not submit

    if (this.state.isValidForm === false) {
      return;
    }

    if (this.props.onSubmit) {
      let formElement = e.target;
      this.props.onSubmit(e, formElement);
    }
  }

  /**
   * Trigger form submission programmatically
   *
   * @returns {void}
   */
  submit() {
    this.formElement.requestSubmit();
  }

  /**
   * {@inheritdoc}
   */
  render() {
    // noValidate disables the browser default validation
    return (
      <form
        ref={(form) => (this.formElement = form)}
        noValidate={true}
        onSubmit={this.triggerSubmit.bind(this)}
      >
        {this.props.children}
      </form>
    );
  }
}
