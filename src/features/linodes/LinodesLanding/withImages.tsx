import { pathOr } from 'ramda';
import { connect, MapStateToProps } from 'react-redux';

export interface WithImages {
  images: Linode.Image[];
}

const mapStateToProps: MapStateToProps<WithImages, { linodeId: number }, ApplicationState>
  = (state) => ({
    images: pathOr([], ['__resources', 'images', 'entities'], state)
  });

export default connect(mapStateToProps);