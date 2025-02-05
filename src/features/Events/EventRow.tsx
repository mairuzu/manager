import { pathOr } from 'ramda';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import Hidden from 'src/components/core/Hidden';
import {
  StyleRulesCallback,
  withStyles,
  WithStyles
} from 'src/components/core/styles';
import Typography from 'src/components/core/Typography';
import DateTimeDisplay from 'src/components/DateTimeDisplay';
import EntityIcon from 'src/components/EntityIcon';
import renderGuard, { RenderGuardProps } from 'src/components/RenderGuard';
import TableCell from 'src/components/TableCell';
import TableRow from 'src/components/TableRow';
import eventMessageGenerator from 'src/eventMessageGenerator';

import { getEntityByIDFromStore } from 'src/utilities/getEntityByIDFromStore';
import getEventsActionLink from 'src/utilities/getEventsActionLink';

type ClassNames = 'root' | 'message';

const styles: StyleRulesCallback<ClassNames> = theme => ({
  root: {},
  message: {
    wordBreak: 'break-all',
    paddingLeft: 4
  }
});

interface ExtendedEvent extends Linode.Event {
  _deleted?: string;
}

interface Props {
  event: ExtendedEvent;
}

export const onUnfound = (event: ExtendedEvent) => {
  return `Event: ${event.action}${
    event.entity ? ` on ${event.entity.label}` : ''
  }`;
};

type CombinedProps = Props & WithStyles<ClassNames> & RouteComponentProps<{}>;

export const EventRow: React.StatelessComponent<CombinedProps> = props => {
  const { event, classes } = props;
  const type = pathOr<string>('linode', ['entity', 'type'], event);
  const id = pathOr<string | number>(-1, ['entity', 'id'], event);
  const entity = getEntityByIDFromStore(type, id);
  const linkTarget = getEventsActionLink(
    event.action,
    event.entity,
    event._deleted,
    (s: string) => props.history.push(s)
  );

  const rowProps = {
    created: event.created,
    linkTarget,
    message: eventMessageGenerator(event, onUnfound),
    status: pathOr(undefined, ['status'], entity),
    type,
    classes
  };

  return <Row {...rowProps} data-qa-events-row={event.id} />;
};

export interface RowProps extends WithStyles<ClassNames> {
  message?: string | void;
  linkTarget?: (e: React.MouseEvent<HTMLElement>) => void;
  type: 'linode' | 'domain' | 'nodebalancer' | 'stackscript' | 'volume';
  status?: string;
  created: string;
}

export const Row: React.StatelessComponent<RowProps> = props => {
  const { classes, linkTarget, message, status, type, created } = props;

  /** Some event types may not be handled by our system (or new types
   * may be added). Filter these out so we don't display blank messages to the user.
   */
  if (!message) {
    return null;
  }

  return (
    <TableRow rowLink={linkTarget as any}>
      <TableCell data-qa-event-icon-cell compact>
        {' '}
        {/** We don't use the event argument, so typing isn't critical here. */}
        <Hidden smDown>
          <EntityIcon variant={type} status={status} size={28} marginTop={1} />
        </Hidden>
      </TableCell>
      <TableCell parentColumn={'Event'} data-qa-event-message-cell compact>
        <Typography
          className={classes.message}
          data-qa-event-message
          variant="body1"
        >
          {message}
        </Typography>
      </TableCell>
      <TableCell parentColumn={'Time'} data-qa-event-created-cell compact>
        <DateTimeDisplay value={created} humanizeCutoff={'month'} />
      </TableCell>
    </TableRow>
  );
};

const styled = withStyles(styles);

const enhanced = compose<CombinedProps, Props & RenderGuardProps>(
  withRouter,
  renderGuard,
  styled
);

export default enhanced(EventRow);
