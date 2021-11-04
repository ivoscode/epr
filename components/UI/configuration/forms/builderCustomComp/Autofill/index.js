import { ReactComponent } from "@formio/react";
import React from "react";
import ReactDOM from "react-dom";
import settingsForm from "./Autofill.settingForm";
// const PDFBuilder = Formio.Builders.getBuilder("pdf");
// console.dir(PDFBuilder);
// console.dir(Formio);
// class My2PDFBuilder extends PDFBuilder {}

//Formio.Builders.addBuilder("pdf", My2PDFBuilder);

class AutofillCustomComp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
    };
  }

  setValue = (v) => {
    this.setState({ value: v }, () => this.props.onChange(this.state.value));
  };

  componentDidMount() {
    console.log(window.location.href);
    if (window.location.href.includes("/forms/builder")) {
      console.log("returning from switch");
      return;
    } else {
      console.log("component did mount");
      switch (this.props.component.fieldType) {
        case "clientId":
          const ClientInfo = JSON.parse(sessionStorage.getItem("ClientInfo"));
          //ClientInfo && console.log(ClientInfo.data.id);
          ClientInfo && this.setValue(ClientInfo.data.id);
          break;
        case "hcp":
          const EprUser = JSON.parse(sessionStorage.getItem("EprUser"));
          EprUser && this.setValue(EprUser.hcp.description);
          EprUser && console.log(EprUser.hcp.description);
          break;
        default:
          console.log(`No field value supplied`);
      }
    }

    //console.log(this.props.component.fieldType);

    // const formData = JSON.parse(sessionStorage.getItem("formData"));
    // console.log("formData from comp", formData);
    // formData && this.setValue(formData?.clientId);
  }

  render() {
    return (
      <div className="w-full" id="custcomp">
        <input
          className="w-full focus:outline-none"
          type="text"
          disabled
          value={this.state.value}
          onChange={(e) => {
            this.setValue(e.target.value);
          }}
        />
      </div>
    );
  }
}

export default class Autofill extends ReactComponent {
  constructor(component, options, data) {
    super(component, options, data);
  }

  static get builderInfo() {
    return {
      title: "Autofill",
      group: "layout",
      icon: "code",
      weight: 2,

      documentation: "",

      schema: Autofill.schema(),
    };
  }

  static schema() {
    return ReactComponent.schema({
      type: "autofillCustomComp",
      label: "Autofill",
    });
  }
  static editForm = settingsForm;

  attachReact(element) {
    let instance;
    console.log(this.component);
    ReactDOM.render(
      <AutofillCustomComp
        ref={(refer) => {
          instance = refer;
        }}
        component={this.component} // These are the component settings if you want to use them to render the component.
        value={this.dataValue} // The starting value of the component.
        onChange={this.updateValue} // The onChange event to call when the value changes.}
      />,
      element,
      () => (this.reactInstance = instance)
    );
    console.log("instance", instance);
  }

  /**
   * Automatically detach any react components.
   *
   * @param element
   */
  detachReact(element) {
    if (element) {
      ReactDOM.unmountComponentAtNode(element);
    }
  }
}
