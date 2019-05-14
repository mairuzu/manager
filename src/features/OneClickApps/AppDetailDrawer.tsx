import LibraryBook from '@material-ui/icons/LibraryBooks';
import Link from '@material-ui/icons/Link';
import * as React from 'react';
import Divider from 'src/components/core/Divider';
import Grid from 'src/components/core/Grid';
import {
  StyleRulesCallback,
  withStyles,
  WithStyles
} from 'src/components/core/styles';
import Typography from 'src/components/core/Typography';
import Drawer from 'src/components/Drawer';
import { APP_ROOT } from 'src/constants';

import { oneClickApps } from './FakeSpec';
import LinkSection from './LinkSection';

type ClassNames = 'root' | 'logo' | 'summary' | 'description' | 'divider';

const styles: StyleRulesCallback<ClassNames> = theme => ({
  root: {},
  logo: {
    marginRight: theme.spacing.unit * 2
  },
  summary: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  },
  description: {
    fontSize: '1em'
  },
  divider: {
    backgroundColor: 'black',
    height: '5px' // this ought to be huge but I see nothing...
  }
});

interface Props {
  stackscriptID: number;
  open: boolean;
}

type CombinedProps = Props & WithStyles<ClassNames>;

export const AppDetailDrawer: React.FunctionComponent<
  CombinedProps
> = props => {
  const { classes, stackscriptID, open } = props;
  const app = oneClickApps.find(eachApp => eachApp.id === stackscriptID);
  if (!app) {
    return null;
  }

  return (
    <Drawer
      open={open}
      title={
        '' /* Empty so that we can display the logo beneath the close button rather than a text title */
      }
    >
      <Grid container direction="column" alignItems="center" justify="center">
        <Grid item className={classes.logo}>
          <img src={`${APP_ROOT}/${app.logo_url}`} alt={`${app.name} logo`} />
        </Grid>
        <Grid item>
          <Typography variant="h1">{app.name}</Typography>
        </Grid>
      </Grid>
      <Divider className={classes.divider} />
      <Grid container direction="column" alignItems="center" justify="center">
        <Grid item>
          <Typography variant="h2" className={classes.summary}>
            {app.summary}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1" className={classes.description}>
            {app.description}
          </Typography>
        </Grid>
        <LinkSection
          title="More info"
          links={[{ title: 'about.gitlab.com', href: 'about.gitlab.com' }]}
          icon={Link}
        />
        <LinkSection
          title="Guides"
          links={app.related_guides || []}
          icon={LibraryBook}
        />
      </Grid>
    </Drawer>
  );
};

const styled = withStyles(styles);

export default styled(AppDetailDrawer);
