import { MaterialBottomTabNavigationProp } from "@react-navigation/material-bottom-tabs";
import { CompositeNavigationProp, NavigatorScreenParams } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type episodesStackNavigatorParams = {
    Init: undefined;
    SingleEpisode: { id: string }
}
export type charactersStackNavigatorParams = {
    Init: undefined
    SingleCharacter: { id: string, name: string }
}

export type bottomTabNavigatorParams = {
    Episodes: NavigatorScreenParams<episodesStackNavigatorParams> | undefined;
    Characters: NavigatorScreenParams<charactersStackNavigatorParams> | undefined;
}

export type bottomNavigationProp = MaterialBottomTabNavigationProp<bottomTabNavigatorParams>

export type episodesNavigationProp = CompositeNavigationProp<
    StackNavigationProp<episodesStackNavigatorParams>,
    MaterialBottomTabNavigationProp<bottomTabNavigatorParams>
>;

export type charactersNavigationProp = CompositeNavigationProp<
    StackNavigationProp<charactersStackNavigatorParams>,
    MaterialBottomTabNavigationProp<bottomTabNavigatorParams>
>;

export type episodesRouteParams = StackNavigationProp<
    episodesStackNavigatorParams, 'SingleEpisode'
>
export type charactersRouteParams = StackNavigationProp<
    charactersStackNavigatorParams, 'SingleCharacter'
>