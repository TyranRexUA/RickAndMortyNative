import { MaterialBottomTabNavigationProp } from "@react-navigation/material-bottom-tabs";
import { CompositeNavigationProp, NavigatorScreenParams } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type EpisodesStackNavigatorParams = {
    Init: undefined;
    SingleEpisode: { id: string }
}
export type CharactersStackNavigatorParams = {
    Init: undefined
    SingleCharacter: { id: string }
}

export type BottomTabNavigatorParams = {
    Episodes: NavigatorScreenParams<EpisodesStackNavigatorParams> | undefined;
    Characters: NavigatorScreenParams<CharactersStackNavigatorParams> | undefined;
}

export type EpisodesNavigationProp = CompositeNavigationProp<
    MaterialBottomTabNavigationProp<BottomTabNavigatorParams>,
    StackNavigationProp<EpisodesStackNavigatorParams>
>;

export type EpisodesRouteParams = StackNavigationProp<
EpisodesStackNavigatorParams, 'SingleEpisode'
>
export type CharactersRouteParams = StackNavigationProp<
CharactersStackNavigatorParams, 'SingleCharacter'
>