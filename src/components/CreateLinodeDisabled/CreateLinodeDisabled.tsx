import * as React from 'react';
import Notice from 'src/components/Notice';

export interface Props {
  isDisabled?: boolean;
}

export const CreateLinodeDisabled: React.StatelessComponent<Props> = props => {
  const { isDisabled } = props;
  if (!isDisabled) {
    return null;
  }
  return (
    <Notice
      text={
        "You don't have permission to create a new Linode. Please contact an account administrator for details."
        // If this isn't officially approved text, I would prefer "Your user account is not authorized to create a new Linode. Please...."
      }
      error={true}
    />
  );
};

export default CreateLinodeDisabled;
