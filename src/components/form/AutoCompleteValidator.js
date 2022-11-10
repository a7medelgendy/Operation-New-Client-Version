import React from "react";
import events from "@flk/events";
import { Autocomplete, TextField } from "@mui/material";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
const isNumber = (val) => !isNaN(Number(val));
const isEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

export default class AutoCompleteValidator extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      validationError: null,
    };

    setTimeout(() => {
      this.init();
    }, 0);

    this.inputReference = React.createRef(); // createRef
    this.ready = this.ready.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setValidationError = this.setValidationError.bind(this);
  }

  componentDidMount() {
    this.ready();
  }

  setValidationError(state) {
    this.setState({
      validationError: state,
    });
  }

  /**
   * {@inheritdoc}
   */
  init() {
    var inputField = this.input.children[0].children[1].children[0];

    events.on("form.validation", (form) => {
      // validate the input
      var error = this.handleChange(
        {
          target: inputField,
        },
        this.props.validation_rules,
        this.props.validation_messages
      );

      this.setValidationError(error);

      if (error !== null) {
        form.isValidForm = false;
      }
    });
  }

  /**
   * {@inheritdoc}
   */
  ready() {
    this.input = this.inputReference.current;
  }

  /**
   * Validate the input
   */
  validator(rule, data) {
    //return true if it's valid else false
    switch (rule.toLowerCase()) {
      case "isrequired":
        return required(data.val);
      case "isnumber":
        return isNumber(data.val);
      case "isemail":
        return isEmail(data.val);
      case "minlength":
        return minLength(data.option)(data.val);
      case "maxlength":
        return maxLength(data.option)(data.val);
      default:
        return false;
    }
  }

  handleChange(event, validation_rules, validation_message) {
    const data = event.target.value;

    for (var i = 0; i < validation_rules.length; i++) {
      let validate_data = {
        val: data,
        option: validation_rules[i].hasOwnProperty("option")
          ? validation_rules[i].option
          : "",
      };

      if (!this.validator(validation_rules[i].rule, validate_data)) {
        if (validation_message && i < validation_message.length) {
          return validation_message[i];
        } else {
          return "Error";
        }
      } else {
        return null;
      }
    }
  }

  /**
   * {@inheritdoc}
   */
  render() {
    var { renderInputComponent, ...rest } = this.props;

    return (
      <Autocomplete
        ref={this.inputReference}
        id={this.props.id}
        options={this.props.options}
        size={this.props.size}
        getOptionLabel={this.props.getOptionLabel}
        isOptionEqualToValue={this.props.isOptionEqualToValue}
        onChange={this.props.onChange}
        onInputChange={(e, value, reason) => {
          var event = { target: { value: value } };
          var error = this.handleChange(
            event,
            this.props.validation_rules,
            this.props.validation_messages
          );
          if (this.props.hasOwnProperty("custome_change")) {
            this.props.custome_change(e);
          }
          this.setValidationError(error);
        }}
        renderInput={(props) => {
          var error = this.state.validationError !== null ? true : false;
          var helper_text = this.state.validationError;

          return this.props.renderInputComponent(props, error, helper_text);
        }}
        {...rest}
      />
    );
  }
}

// TextFieldValidator.defaultProps = {
//   type: "text",
// };
