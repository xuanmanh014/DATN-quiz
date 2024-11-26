export interface IFlashCardList {
    _id?: string
    listName?: string
    listDescription?: string
}

export interface IFlashCard {
    _id?: string
    cardName?: string
    wordEMean?: string
    wordVMean?: string
    wordType?: string
    wordIPA?: string
    cardList?: IFlashCardList
    wordExample?: string
}