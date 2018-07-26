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
  handleSelect = (selected:any) => {
    const item = selected ? selected.label : null;
    console.log(`${item} has been selected`);
  }

  render() {
    return (
      <React.Fragment>
        <EnhancedSelect 
          options={data}
          value={data[0].value}
          handleSelect={this.handleSelect}
        />
      </React.Fragment>
    );
  }
}

storiesOf('Enhanced Select', module)
  .addDecorator(ThemeDecorator)
  .add('Example', () => (
    <Example />
  ));
