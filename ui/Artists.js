import React, { Component } from 'react';
import { connect } from 'react-fela';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const SEARCH_ARTISTS = gql`
  query Artists($keywords: String!, $offset: Int, $limit: Int) {
    artists(keywords: $keywords, offset: $offset, limit: $limit) {
      artistName
      artistId
    }
  }
`;

@graphql(SEARCH_ARTISTS, {
  options: (ownProps) => ({
    variables: {
      keywords: ownProps.keywords || '',
      offset: ownProps.offset || 0,
      limit: ownProps.limit || 10,
    },
  }),
})
class Artists extends Component {
  render() {
    const { styles, data } = this.props;

    const defaultArtists = [
      {
        artistName: 'The Weeknd',
        artistId: 744880,
        description: 'Feat. August Alsina, Jeremih and more',
        imageUrl: 'http://iscale.iheart.com/catalog/artist/744880?ops=fit(250,0)',
      },
      {
        artistName: 'Selena Gomez',
        artistId: 57706,
        description: 'Feat. Ariana Grande, Demi Lovato and more',
        imageUrl: 'http://iscale.iheart.com/catalog/artist/57706?ops=fit(250,0)',
      },
      {
        artistName: 'R. City,',
        artistId: 30005067,
        description: 'Feat. Nelly, Iyaz, Wiz Khalifa and more',
        imageUrl: 'http://iscale.iheart.com/catalog/artist/30005067?ops=fit(250,0)',
      },
      {
        artistName: 'Justin Bieber,',
        artistId: 44368,
        description: 'Feat. Shawn Mendes, One Direction and more,',
        imageUrl: 'http://iscale.iheart.com/catalog/artist/44368?ops=fit(250,0)',
      },
      {
        artistName: 'Major Lazer,',
        artistId: 43557,
        description: 'Feat. Iyaz, Dillon Francis & DJ Snake and more,',
        imageUrl: 'http://iscale.iheart.com/catalog/artist/43557?ops=fit(250,0)',
      },
      {
        artistName: 'Taylor Swift,',
        artistId: 33221,
        description: 'Feat. Meghan Trainor, Katy Perry and more,',
        imageUrl: 'http://iscale.iheart.com/catalog/artist/33221?ops=fit(250,0)',
      },
    ];

    const artists = data.artists && data.artists.length > 0 ? data.artists : defaultArtists;

    return (
      <section className={styles.section}>
        <div className={styles.container}>
          {artists.map((artist) => {
            const imageUrl = `http://iscale.iheart.com/catalog/artist/${artist.artistId}?ops=fit(250,0)`;

            return (
              <div className={styles.col} key={artist.artistName}>
                <img className={styles.artistImg} src={imageUrl} />
                <div className={styles.name}>{artist.artistName}</div>
                {artist.description ? <div className={styles.desc}>{artist.description}</div> : null}
              </div>
            );
          })}
        </div>
      </section>
    );
  }
}

const section = props => ({
  margin: '2rem auto 1rem',
  minHeight: 600,
});

const container = props => ({
  display: 'flex',
  justifyContent: 'space-between',
  flexFlow: 'row',
  flexWrap: 'wrap',
  margin: '0 auto',
  maxWidth: '90vw',
});

const col = props => ({
  margin: '.5em auto',
  flex: '0 0 calc(50% - 1em)',
  '@media (min-width: 769px)': {
    flex: '0 0 calc(33% - 1em)',
  },
});

const artistImg = props => ({
  maxWidth: '100%',
  margin: '0 auto',
  display: 'block',
  transition: 'all .2s ease-in-out',
  ':hover': {
    transform: 'scale(1.05)',
  },
});

const name = props => ({
  marginTop: '.5em',
  textAlign: 'center',
  fontWeight: 800,
});

const desc = props => ({
  textAlign: 'center',
  fontStyle: 'italic',
});


const mapStylesToProps = props => renderer => ({
  section: renderer.renderRule(section),
  container: renderer.renderRule(container),
  col: renderer.renderRule(col),
  artistImg: renderer.renderRule(artistImg),
  name: renderer.renderRule(name),
  desc: renderer.renderRule(desc),
});

export default connect(mapStylesToProps)(Artists);
