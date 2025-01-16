import mongoose from 'mongoose';
import Track from "./models/Track";
import Artist from "./models/Artist";
import Album from "./models/Album";

const run = async () => {
    await mongoose.connect('mongodb://localhost/discography');

    const [megMyers, korn] = await Artist.create([
        { name: 'Meg Myers', photo: 'public/images/meg_myers.jpg', info: 'Meg Myers is an American singer-songwriter and musician.' },
        { name: 'Korn', photo: 'public/images/korn.jpg', info: 'Korn is an American nu metal band formed in 1993.' },
    ]);

    const [album1, album2, album3, album4] = await Album.create([
        { title: 'Sorry', artist: megMyers._id, year: 2015, cover: 'public/images/sorry.jpg' },
        { title: 'Issues', artist: korn._id, year: 1999, cover: 'public/images/issues.jpg' },
        { title: 'Untouchables', artist: korn._id, year: 2002, cover: 'public/images/untouchables.jpg' },
        { title: 'Take Me to the Disco', artist: megMyers._id, year: 2018, cover: 'public/images/take_me_to_the_disco.jpg' },
    ]);

    await Track.create([
        { title: 'Sorry', album: album1._id, trackNumber: 1, duration: '3:45' },
        { title: 'Desire', album: album1._id, trackNumber: 2, duration: '4:10' },
        { title: 'Lemon Eyes', album: album1._id, trackNumber: 3, duration: '3:50' },
        { title: 'Make a Shadow', album: album1._id, trackNumber: 4, duration: '4:23' },
        { title: 'Monster', album: album1._id, trackNumber: 5, duration: '3:55' },
    ]);

    await Track.create([
        { title: 'Dead', album: album2._id, trackNumber: 1, duration: '5:01' },
        { title: 'Falling Away from Me', album: album2._id, trackNumber: 2, duration: '4:29' },
        { title: 'Twisted Transistor', album: album2._id, trackNumber: 3, duration: '3:52' },
        { title: 'Make Me Bad', album: album2._id, trackNumber: 4, duration: '3:49' },
        { title: 'Here to Stay', album: album2._id, trackNumber: 5, duration: '4:32' },
    ]);

    await Track.create([
        { title: 'Here to Stay', album: album3._id, trackNumber: 1, duration: '4:22' },
        { title: 'Alone I Break', album: album3._id, trackNumber: 2, duration: '4:12' },
        { title: 'Thoughtless', album: album3._id, trackNumber: 3, duration: '3:35' },
        { title: 'Got the Life', album: album3._id, trackNumber: 4, duration: '3:38' },
        { title: 'Wake Up Hate', album: album3._id, trackNumber: 5, duration: '4:40' },
    ]);

    await Track.create([
        { title: 'Take Me to the Disco', album: album4._id, trackNumber: 1, duration: '3:53' },
        { title: 'Numb', album: album4._id, trackNumber: 2, duration: '4:22' },
        { title: 'Tear Me to Pieces', album: album4._id, trackNumber: 3, duration: '3:26' },
        { title: 'Some People', album: album4._id, trackNumber: 4, duration: '3:56' },
        { title: 'Done', album: album4._id, trackNumber: 5, duration: '3:26' },
    ]);

    console.log('Fixtures added');
    await mongoose.connection.close();
};

run().catch(console.error);
