import * as React from "react";

import { Alert } from "react-native";
import { useNavigation } from "react-navigation-hooks";
import createIPodNavigator, { InjectedIPodProps } from "./IPodNavigator";
import List from "./List";
import Player from "./Player";
import data from "./data";

const Menu = ({ y, command }: InjectedIPodProps) => (
  <List
    items={[
      { icon: "play", label: "Now Playing", screen: "NowPlaying" },
      { icon: "list", label: "Playlists", screen: "Playlists" },
      { icon: "layers", label: "Albums", screen: "Albums" },
      { icon: "users", label: "Artists", screen: "Artists" },
      { icon: "music", label: "Songs", screen: "Songs" },
      { icon: "shuffle", label: "Shuffle", screen: "Shuffle" },
      { icon: "settings", label: "Settings", screen: "Settings" }
    ]}
    {...{ y, command }}
  />
);

const Playlists = ({ y, command }: InjectedIPodProps) => (
  <List
    items={data.playlists.map(playlist => ({
      label: playlist.name,
      screen: "Player",
      thumbnail: playlist.entries[0].album.picture.uri,
      params: {
        tracks: playlist.entries.map(entry => ({
          ...entry.track,
          artist: entry.album.artist,
          cover: entry.album.picture
        })),
        selected: 0
      }
    }))}
    {...{ y, command }}
  />
);

const Albums = ({ y, command }: InjectedIPodProps) => (
  <List
    items={data.albums.map(album => ({
      screen: "Player",
      thumbnail: album.picture.uri,
      label: album.name,
      params: {
        tracks: data.tracks(album.id).map(track => ({
          ...track,
          artist: album.artist,
          cover: album.picture
        })),
        selected: 0
      }
    }))}
    {...{ y, command }}
  />
);

const Artists = ({ y, command }: InjectedIPodProps) => (
  <List
    items={data.albums.map(album => ({
      screen: "Player",
      thumbnail: album.picture.uri,
      label: album.artist,
      params: {
        tracks: data.tracks(album.id).map(track => ({
          ...track,
          artist: album.artist,
          cover: album.picture
        })),
        selected: 0
      }
    }))}
    {...{ y, command }}
  />
);

const Songs = ({ y, command }: InjectedIPodProps) => {
  const tracks = data.albums.map(album => data.tracks(album.id)).flat();
  return (
    <List
      items={data.albums
        .map(album =>
          data.tracks(album.id).map(track => ({
            label: track.name,
            thumbnail: album.picture.uri,
            screen: "Player",
            params: {
              tracks: tracks.map(t => ({
                ...t,
                artist: album.name,
                cover: album.picture
              })),
              selected: 0
            }
          }))
        )
        .flat()
        .map((item, index) => {
          // eslint-disable-next-line no-param-reassign
          item.params.selected = index;
          return item;
        })}
      {...{ y, command }}
    />
  );
};

const NotImplementedYet = () => {
  const navigation = useNavigation();
  Alert.alert("Not Implemented Yet 🤷‍♂️");
  navigation.navigate("Menu");
  return null;
};

export default createIPodNavigator({
  Menu: {
    screen: Menu
  },
  Player: {
    screen: Player
  },
  Playlists: {
    screen: Playlists
  },
  Albums: {
    screen: Albums
  },
  Artists: {
    screen: Artists
  },
  Songs: {
    screen: Songs
  },
  Shuffle: {
    screen: NotImplementedYet
  },
  Settings: {
    screen: NotImplementedYet
  }
});
