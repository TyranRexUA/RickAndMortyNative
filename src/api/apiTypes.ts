export interface getEpisodesQueryType {
    episodes: {
        info: dataInfoType
        results: episodeType[]
    }
}
export interface dataInfoType {
    "count": number
    "pages": number
    "next": null | number
    "prev": null | number
}


export interface getSingleEpisodeType {
    "episode": {
        "id": string
        "name": string
        "air_date": string
        "characters": singleEpisodeCharacterType[]
    }
}
export interface singleEpisodeCharacterType {
    "id": string
    "name": string
    "image": string
}

export interface getSingleCharacterQueryType {
    "character": {
        "id": string
        "name": string
        "image": string
        "species": string
        "gender": string
        "episode": episodeType[]
    }
}

export interface episodeType {
    "name": string
    "id": string
}