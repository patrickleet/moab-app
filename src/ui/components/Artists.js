import React, { Component } from 'react';
import { connect } from 'react-fela';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import shortid from 'shortid'

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
    const artists = data.artists && data.artists.length > 0 ? data.artists : []

    return (
      <section className={styles.section}>
        <div className={styles.container}>
          {artists.length > 0 ? artists.map((artist) => {
            const imageUrl = `http://iscale.iheart.com/catalog/artist/${artist.artistId}?ops=fit(250,0)`;

            return (
              <div className={styles.col} key={`${artist.artistName.replace(' ', '')}-${shortid.generate()}`}>
                <img className={styles.artistImg} src={imageUrl} />
                <div className={styles.name}>{artist.artistName}</div>
                {artist.description ? <div className={styles.desc}>{artist.description}</div> : null}
              </div>
            );
          })
          : 
          <div className={styles.centerMessageFill}>
              <span>No Results</span>
          </div>}
        </div>
      </section>
    );
  }
}

const centerMessageFill = props => ({
  display: 'flex',
  justifyContent: 'center',
  width: '100%'
})

const section = props => ({
  margin: '2rem auto 1rem',
  minHeight: 600,
})

const container = props => ({
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  margin: '0 auto',
  maxWidth: '90vw',
})

const col = props => ({
  margin: '.5em auto',
  flex: '0 0 calc(50% - 1em)',
  '@media (min-width: 769px)': {
    flex: '0 0 calc(33% - 1em)',
  },
})

const artistImg = props => ({
  maxWidth: '100%',
  margin: '0 auto',
  display: 'block',
  transition: 'all .2s ease-in-out',
  ':hover': {
    transform: 'scale(1.05)',
  },
})

const name = props => ({
  marginTop: '.5em',
  textAlign: 'center',
  fontWeight: 800,
})

const desc = props => ({
  textAlign: 'center',
  fontStyle: 'italic',
})


const mapStylesToProps = props => renderer => ({
  centerMessageFill: renderer.renderRule(centerMessageFill),
  section: renderer.renderRule(section),
  container: renderer.renderRule(container),
  col: renderer.renderRule(col),
  artistImg: renderer.renderRule(artistImg),
  name: renderer.renderRule(name),
  desc: renderer.renderRule(desc),
})

export default connect(mapStylesToProps)(Artists)
