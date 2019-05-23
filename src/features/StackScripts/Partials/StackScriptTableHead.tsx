import * as classNames from 'classnames';
import * as React from 'react';
import {
  StyleRulesCallback,
  withStyles,
  WithStyles
} from 'src/components/core/styles';
import TableHead from 'src/components/core/TableHead';
import TableCell from 'src/components/TableCell';
import TableRow from 'src/components/TableRow';
import TableSortCell from 'src/components/TableSortCell';

type ClassNames =
  | 'root'
  | 'stackscriptLabel'
  | 'stackscriptTitles'
  | 'deploys'
  | 'revisions'
  | 'tags'
  | 'tr'
  | 'tableHead';

const styles: StyleRulesCallback<ClassNames> = theme => ({
  root: {},
  stackscriptLabel: {
    width: 84
  },
  stackscriptTitles: {
    width: '60%',
    minWidth: 150
  },
  deploys: {
    width: '13%',
    [theme.breakpoints.up('lg')]: {
      minWidth: 140
    }
  },
  revisions: {
    width: '13%',
    minWidth: 150
  },
  tags: {
    width: '13%'
  },
  tr: {
    height: 48
  },
  tableHead: {
    position: 'sticky',
    top: theme.spacing.unit * 12,
    backgroundColor: theme.bg.tableHeader,
    paddingTop: 0,
    paddingBottom: 0,
    height: 48,
    zIndex: 5,
    '&:first-child::before': {
      content: '""',
      backgroundColor: theme.bg.tableHeader,
      position: 'absolute',
      width: 5,
      top: 0,
      borderBottom: `2px solid ${theme.palette.divider}`,
      height: 48,
      left: -5
    }
  }
});

type SortOrder = 'asc' | 'desc';

type CurrentFilter = 'label' | 'deploys' | 'revision';

interface Props {
  isSelecting?: boolean;
  handleClickTableHeader?: (value: string) => void;
  sortOrder?: SortOrder;
  currentFilterType: CurrentFilter | null;
}

type CombinedProps = Props & WithStyles<ClassNames>;

class StackScriptTableHead extends React.Component<CombinedProps, {}> {
  render() {
    const {
      classes,
      currentFilterType,
      isSelecting,
      handleClickTableHeader,
      sortOrder
    } = this.props;

    const Cell: React.ComponentType<any> =
      !!handleClickTableHeader && sortOrder ? TableSortCell : TableCell;

    const maybeAddSortingProps = (orderBy: string) =>
      !!handleClickTableHeader && sortOrder
        ? {
            direction: sortOrder,
            active: currentFilterType === orderBy,
            label: orderBy,
            handleClick: handleClickTableHeader
          }
        : {};

    return (
      <TableHead>
        <TableRow className={classes.tr}>
          {!!isSelecting && (
            <TableCell
              className={classNames({
                [classes.stackscriptLabel]: true
              })}
            />
          )}
          <Cell
            className={classNames({
              [classes.stackscriptTitles]: true
            })}
            data-qa-stackscript-table-header
            {...maybeAddSortingProps('label')}
          >
            StackScript
          </Cell>
          {!isSelecting && (
            <Cell
              className={classNames({
                [classes.deploys]: true
              })}
              data-qa-stackscript-active-deploy-header
              {...maybeAddSortingProps('deploys')}
            >
              Active Deploys
            </Cell>
          )}
          {!isSelecting && (
            <Cell
              className={classNames({
                [classes.revisions]: true
              })}
              data-qa-stackscript-revision-header
              {...maybeAddSortingProps('revision')}
            >
              Last Revision
            </Cell>
          )}
          {!isSelecting && (
            <TableCell
              className={classNames({
                [classes.tags]: true
              })}
              data-qa-stackscript-compatible-images
            >
              Compatible Images
            </TableCell>
          )}
          {!isSelecting && (
            <TableCell
              className={classNames({
                [classes.stackscriptLabel]: true
              })}
            />
          )}
        </TableRow>
      </TableHead>
    );
  }
}

const styled = withStyles(styles);

export default styled(StackScriptTableHead);
