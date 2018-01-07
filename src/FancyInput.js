// @flow
import React from 'react';
import classnames from 'classnames';
import debounce from 'lodash/debounce';
import './FancyInput.css';

type Props = {
  className?: string,
  value?: string,
  autoFocus: boolean,
  maxLength?: number,
  placeholder: string,
  type: 'text' | 'number',
  onChange: (value: string) => void
};

type State = {
  value: string
};

export default class FancyInput extends React.Component<Props, State> {
  state = {
    value: !!this.props.value ? this.props.value : ''
  };

  static defaultProps = {
    type: 'text',
    autoFocus: false,
    placeholder: 'Enter some text here...'
  };

  componentWillReceiveProps(nextProps: Props) {
    if (!!nextProps.value) {
      this.setState({
        value: nextProps.value
      });
    }
  }

  debouncedOnChange = debounce(() => {
    this.props.onChange(this.state.value);
  }, 200);

  onChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const value = event.target.value;

    this.setState({ value }, this.debouncedOnChange);
  };

  onClear = () => {
    this.setState(
      {
        value: ''
      },
      this.debouncedOnChange
    );
  };

  render() {
    const className = classnames('Fancy-Input__input', this.props.className);

    return (
      <span className="Fancy-Input">
        <input
          autoFocus={this.props.autoFocus}
          placeholder={this.props.placeholder}
          maxLength={this.props.maxLength}
          type={this.props.type}
          value={this.state.value}
          className={className}
          onChange={this.onChange}
        />

        {!!this.props.maxLength && (
          <span className="Fancy-Input__limit">
            {`${this.state.value.length}/${this.props.maxLength}`}
          </span>
        )}

        <a className="Fancy-Input__clear" onClick={this.onClear}>
          Clear
        </a>
      </span>
    );
  }
}
