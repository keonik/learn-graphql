import DataLoader from 'dataloader';
import { Genre } from 'models/Genre';

type BatchGenre = (ids: string[]) => Promise<Genre[]>;

// [ "1","2","3",...]
// genres = [{id: 2, name: "Classic"}, {id: 1, name: "Horror"}] not in right order
/*
{
    1: {...},
    2: {...}
}
*/
const batchGenres: BatchGenre = async ids => {
    const genres = await Genre.findByIds(ids);
    const genreMap: { [key: string]: Genre } = {};
    genres.forEach(genre => {
        genreMap[genre.id] = genre;
    });
    return ids.map(id => genreMap[id]);
};

export const genreLoader = () => new DataLoader<string, Genre>(batchGenres);

// export const GenreLoaderByBookId = () =>
//     new DataLoader<string, Genre[]>(async bookIds => {
//         const bookGenres = await BookGenres.find({ relations: ['genre'], where: { bookId: In(bookIds) } });

//         return await Promise.all(
//             bookIds.map(bookId =>
//                 bookGenres.filter(bookGenre => bookGenre.bookId === bookId).map(bookGenre => bookGenre.genre)
//             )
//         );
//     });
