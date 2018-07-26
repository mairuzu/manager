import { shallow } from 'enzyme';
import * as React from 'react';

import { TimezoneForm } from './TimezoneForm';

describe('Timezone change form', () => {
  const updateProfile = jest.fn();
  
  const component = shallow(
    <TimezoneForm
      classes={{
        root: '',
        select: '',
        title: '',
      }}
      timezone={'Pacific/Niue'}
      updateProfile={updateProfile}
    />,
  );

  it('should render .', () => {
    expect(component).toHaveLength(1);
  });

  it('should include text with the user\'s current time zone', () => {
    expect(component.find('[data-qa-copy]').html()).toContain('(GMT -11:00) Niue');
  });

  it('should have a select that is blank by default', () => {
    expect(component.find('[data-qa-tz-select]').props().value).toBe('');
  });
});
