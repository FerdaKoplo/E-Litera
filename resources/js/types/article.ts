interface Article {
    id : number
    title_article : string,
    article_text_content : string
    images : string[],
    created_at : Date,
    user?: {
        id: number;
        name: string
    }
}
