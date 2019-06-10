import * as React from 'react';
import { compose } from 'recompose';
import Button from 'src/components/Button';
import {
  StyleRulesCallback,
  WithStyles,
  withStyles
} from 'src/components/core/styles';
import Typography from 'src/components/core/Typography';
import { displayPrice } from 'src/components/DisplayPrice';
import renderGuard, { RenderGuardProps } from 'src/components/RenderGuard';
import TableCell from 'src/components/TableCell';
import TableRow from 'src/components/TableRow';
import TextField from 'src/components/TextField';
import { ExtendedType } from 'src/features/linodes/LinodesCreate/SelectPlanPanel';
import { displayTypeForKubePoolNode } from 'src/features/linodes/presentation';
import { ExtendedPoolNode } from '.././types';

type ClassNames = 'root' | 'link' | 'toDelete' | 'toAdd';

const styles: StyleRulesCallback<ClassNames> = theme => ({
  root: {},
  link: {
    color: `${theme.palette.primary.main} !important`
  },
  toDelete: {
    backgroundColor: 'rgba(210, 28, 28, 0.4)',
  },
  toAdd: {
    backgroundColor: theme.bg.offWhite
  }
});

interface Props {
  pool: ExtendedPoolNode;
  type?: ExtendedType;
  editable: boolean;
  idx: number;
  handleDelete: (poolIdx: number) => void;
  updatePool: (poolIdx: number, updatedPool: ExtendedPoolNode) => void;
}

type CombinedProps = Props & WithStyles<ClassNames>;

export const NodePoolRow: React.FunctionComponent<CombinedProps> = props => {
  const {
    classes,
    editable,
    pool,
    idx,
    handleDelete,
    type,
    updatePool
  } = props;
  const typeLabel = type
    ? displayTypeForKubePoolNode(type.class, type.memory, type.vcpus)
    : 'Unknown type'; // This should never happen, but better not to crash if it does.

  const statusClass = pool.queuedForAddition
    ? classes.toAdd
    : pool.queuedForDeletion
      ? classes.toDelete
      : '' // Normal node 

  return (
    <TableRow data-testid={'node-pool-table-row'} className={statusClass}>
      <TableCell parentColumn="Plan">
        <Typography>{typeLabel}</Typography>
      </TableCell>
      <TableCell parentColumn="Node Count">
        {editable ? (
          <TextField
            small
            tiny
            type="number"
            value={pool.count}
            onChange={e => updatePool(idx, { ...pool, count: +e.target.value })}
          />
        ) : (
          <Typography>{pool.count}</Typography>
        )}
      </TableCell>
      <TableCell parentColumn="Pricing">
        <Typography>{`${displayPrice(
          pool.totalMonthlyPrice * pool.count
        )}/mo`}</Typography>
      </TableCell>
      <TableCell>
        <Button
          type="remove"
          deleteText={pool.queuedForDeletion ? "Undo Remove" : "Remove"}
          data-testid={`delete-node-row-${idx}`}
          onClick={() => handleDelete(idx)}
          className={classes.link}
        />
      </TableCell>
    </TableRow>
  );
};

const styled = withStyles(styles);

const enhanced = compose<CombinedProps, Props & RenderGuardProps>(
  styled,
  renderGuard
);

export default enhanced(NodePoolRow);
