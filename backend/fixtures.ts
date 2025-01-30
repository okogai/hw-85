import mongoose from 'mongoose';
import Track from "./models/Track";
import Artist from "./models/Artist";
import Album from "./models/Album";
import User from "./models/User";

const run = async () => {
    await mongoose.connect('mongodb://localhost/discography');
    const db = mongoose.connection;

    try {
        await db.dropCollection('albums');
        await db.dropCollection('artists');
        await db.dropCollection('trackHistories');
        await db.dropCollection('tracks');
        await db.dropCollection('users');
    } catch (e) {
        console.log('Collections were not presents, skipping drop');
    }

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
        { title: 'Sorry', album: album1._id, trackNumber: 1, duration: '3:45', youtubeLink: 'https://www.youtube.com/watch?v=Ym1J5IAk2P4&ab_channel=MEGMYERS' },
        { title: 'Desire', album: album1._id, trackNumber: 2, duration: '4:10', youtubeLink: 'https://www.youtube.com/watch?v=bR5u9jb0PJE&ab_channel=MEGMYERS' },
        { title: 'Lemon Eyes', album: album1._id, trackNumber: 3, duration: '3:50', youtubeLink: 'https://www.youtube.com/watch?v=PqG9hsjLf3M&ab_channel=MEGMYERS' },
        { title: 'Make a Shadow', album: album1._id, trackNumber: 4, duration: '4:23', youtubeLink: 'https://www.youtube.com/watch?v=J-z4sUKWd6Q&ab_channel=MEGMYERS' },
        { title: 'Monster', album: album1._id, trackNumber: 5, duration: '3:55', youtubeLink: 'https://www.youtube.com/watch?v=GVQqZg5BisE&ab_channel=MEGMYERS' },
    ]);

    await Track.create([
        { title: 'Dead', album: album2._id, trackNumber: 1, duration: '5:01', youtubeLink: 'https://www.youtube.com/watch?v=MQ4CXxhAF8k&ab_channel=PredictableClown71' },
        { title: 'Falling Away from Me', album: album2._id, trackNumber: 2, duration: '4:29', youtubeLink: 'https://www.youtube.com/watch?v=2s3iGpDqQpQ&ab_channel=KornVEVO' },
        { title: 'Twisted Transistor', album: album2._id, trackNumber: 3, duration: '3:52', youtubeLink: 'https://www.youtube.com/watch?v=uAq6RjSuwXQ&ab_channel=DavidHmeljov' },
        { title: 'Make Me Bad', album: album2._id, trackNumber: 4, duration: '3:49', youtubeLink: 'https://www.youtube.com/watch?v=ujEph5vFwmc&ab_channel=KornVEVO' },
        { title: 'Here to Stay', album: album2._id, trackNumber: 5, duration: '4:32', youtubeLink: 'https://www.youtube.com/watch?v=pr3x7tS__dE&ab_channel=KornVEVO' },
    ]);

    await Track.create([
        { title: 'Here to Stay', album: album3._id, trackNumber: 1, duration: '4:22', youtubeLink: 'https://www.youtube.com/watch?v=pr3x7tS__dE&ab_channel=KornVEVO' },
        { title: 'Alone I Break', album: album3._id, trackNumber: 2, duration: '4:12', youtubeLink: 'https://www.youtube.com/watch?v=V3GA2d-J2_A&ab_channel=KornVEVO' },
        { title: 'Thoughtless', album: album3._id, trackNumber: 3, duration: '3:35', youtubeLink: 'https://www.youtube.com/watch?v=xVPvzX-AeSM&ab_channel=KornVEVO' },
        { title: 'Got the Life', album: album3._id, trackNumber: 4, duration: '3:38', youtubeLink: 'https://www.youtube.com/watch?v=VAWjsVoDpm0&ab_channel=KornVEVO' },
        { title: 'Wake Up Hate', album: album3._id, trackNumber: 5, duration: '4:40', youtubeLink: 'https://www.youtube.com/watch?v=WLJY-N9QSD8&ab_channel=PredictableClown71' },
    ]);

    await Track.create([
        { title: 'Take Me to the Disco', album: album4._id, trackNumber: 1, duration: '3:53', youtubeLink: 'https://www.youtube.com/watch?v=BMFWkdX_yn0&ab_channel=MEGMYERS' },
        { title: 'Numb', album: album4._id, trackNumber: 2, duration: '4:22', youtubeLink: 'https://www.youtube.com/watch?v=ORaln6aPqUk&ab_channel=MEGMYERS' },
        { title: 'Tear Me to Pieces', album: album4._id, trackNumber: 3, duration: '3:26', youtubeLink: 'https://www.youtube.com/watch?v=c92Isg49BOo&ab_channel=MEGMYERS' },
        { title: 'Some People', album: album4._id, trackNumber: 4, duration: '3:56', youtubeLink: 'https://www.youtube.com/watch?v=GbypV28z1ro&ab_channel=MEGMYERS' },
        { title: 'Done', album: album4._id, trackNumber: 5, duration: '3:26', youtubeLink: 'https://www.youtube.com/watch?v=ZWC88LUhhjA&ab_channel=MEGMYERS' },
    ]);

    await User.create({
        username: "user",
        password: "123",
        token: crypto.randomUUID(),
        role: "user"
    }, {
        username: "admin",
        password: "123",
        token: crypto.randomUUID(),
        role: "admin"
    });


    console.log('Fixtures added');
    await mongoose.connection.close();
};

run().catch(console.error);
