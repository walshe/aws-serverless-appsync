export const onCreateBook = `
    subscription MySubscription{
        onCreateBook{
            author
            bookId
            description
            price
            title
        }
    }
`;