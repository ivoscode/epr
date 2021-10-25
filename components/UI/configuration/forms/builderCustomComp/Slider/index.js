import { ReactComponent } from "@formio/react";
import React from "react";
import ReactDOM from "react-dom";
import settingsForm from "./Slider.settingsForm";

class SliderCustomComp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
    };
  }

  setValue = (v) => {
    this.setState({ value: v }, () => this.props.onChange(this.state.value));
  };

  render() {
    return (
      <div className="w-full" id="custcomp">
        <input
          className="w-full focus:outline-none"
          type="range"
          min={this.props.component.minRange}
          max={this.props.component.maxRange}
          value={this.state.value}
          onChange={(e) => {
            this.setValue(e.target.value);
          }}
        />
        <span>{this.state.value}</span>
      </div>
    );
  }
}

export default class Slider extends ReactComponent {
  constructor(component, options, data) {
    super(component, options, data);
  }

  static get builderInfo() {
    return {
      title: "Slider",
      icon: "sliders",
      group: "Data",
      documentation: "",
      weight: -10,
      schema: Slider.schema(),
    };
  }

  static schema() {
    return ReactComponent.schema({
      type: "sliderCustomComp",
      label: "Default Label",
    });
  }
  static editForm = settingsForm;

  attachReact(element) {
    let instance;
    ReactDOM.render(
      <SliderCustomComp
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
