import { storiesOf } from '@storybook/react';
import * as React from 'react';

import ThemeDecorator from '../../utilities/storybookDecorators';

import EnhancedSelect from './EnhancedSelect';

const data = [
  {
    value: 'apple',
    label: 'Apple'
  },
  {
    value: 'pear',
    label: 'Pear'
  },
  {
    value: 'orange',
    label: 'Orange'
  }
]

class Example extends React.Component {
  state = {
    item: {
      value: '',
      label: '',
    }
  }

  handleSelect = (selected:any) => {
    if (selected) {
      this.setState({ item: selected });
    }
  }

  render() {
    return (
      <React.Fragment>
        <EnhancedSelect 
          options={data}
          value={this.state.item.value}
          handleSelect={this.handleSelect}
        />
        <div data-qa-select-output>{this.state.item.label}</div>
      </React.Fragment>
    );
  }
}

storiesOf('Enhanced Select', module)
  .addDecorator(ThemeDecorator)
  .add('Example', () => (
    <Example />
  ));
