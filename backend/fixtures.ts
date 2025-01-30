import mongoose from 'mongoose';
import crypto from 'crypto';
import Track from './models/Track';
import Artist from './models/Artist';
import Album from './models/Album';
import User from './models/User';

const run = async () => {
    await mongoose.connect('mongodb://localhost/discography');
    const db = mongoose.connection;

    try {
        await db.dropCollection('albums');
        await db.dropCollection('artists');
        await db.dropCollection('tracks');
        await db.dropCollection('users');
    } catch (e) {
        console.log('Collections were not present, skipping drop');
    }

    const [user, admin] = await User.create([
        {
            username: 'user',
            password: '123',
            token: crypto.randomUUID(),
            role: 'user',
        },
        {
            username: 'admin',
            password: '123',
            token: crypto.randomUUID(),
            role: 'admin',
        },
    ]);

    const [megMyers, korn, elliphant] = await Artist.create([
        {
            name: 'Meg Myers',
            photo: 'public/images/meg_myers.jpg',
            isPublished: true,
            creator: user._id,
        },
        {
            name: 'Korn',
            photo: 'public/images/korn.jpg',
            isPublished: true,
            creator: user._id,
        },
        {
            name: 'Elliphant',
            photo: 'public/images/elliphant.jpg',
            isPublished: false,
            creator: user._id,
        },
    ]);

    const [album1, album2, album3, album4, album5] = await Album.create([
        {
            title: 'Sorry',
            artist: megMyers._id,
            year: 2015,
            cover: 'public/images/sorry.jpg',
            isPublished: true,
            creator: user._id,
        },
        {
            title: 'Issues',
            artist: korn._id,
            year: 1999,
            cover: 'public/images/issues.jpg',
            isPublished: true,
            creator: user._id,
        },
        {
            title: 'Untouchables',
            artist: korn._id,
            year: 2002,
            cover: 'public/images/untouchables.jpg',
            isPublished: true,
            creator: user._id,
        },
        {
            title: 'Take Me to the Disco',
            artist: megMyers._id,
            year: 2018,
            cover: 'public/images/take_me_to_the_disco.jpg',
            isPublished: true,
            creator: user._id,
        },
        {
            title: 'Living Life Golden',
            artist: elliphant._id,
            year: 2016,
            cover: 'public/images/living_life_golden.jpg',
            isPublished: false,
            creator: user._id,
        },
    ]);

    await Track.create([
        { title: 'Sorry', album: album1._id, trackNumber: 1, duration: '3:45', youtubeLink: 'https://www.youtube.com/watch?v=Ym1J5IAk2P4&ab_channel=MEGMYERS', isPublished: true, creator: user._id },
        { title: 'Desire', album: album1._id, trackNumber: 2, duration: '4:10', youtubeLink: 'https://www.youtube.com/watch?v=bR5u9jb0PJE&ab_channel=MEGMYERS', isPublished: true, creator: user._id },
        { title: 'Lemon Eyes', album: album1._id, trackNumber: 3, duration: '3:50', youtubeLink: 'https://www.youtube.com/watch?v=PqG9hsjLf3M&ab_channel=MEGMYERS', isPublished: true, creator: user._id },
        { title: 'Make a Shadow', album: album1._id, trackNumber: 4, duration: '4:23', youtubeLink: 'https://www.youtube.com/watch?v=J-z4sUKWd6Q&ab_channel=MEGMYERS', isPublished: true, creator: user._id },
        { title: 'Monster', album: album1._id, trackNumber: 5, duration: '3:55', youtubeLink: 'https://www.youtube.com/watch?v=GVQqZg5BisE&ab_channel=MEGMYERS', isPublished: true, creator: user._id },
        { title: 'Dead', album: album2._id, trackNumber: 1, duration: '5:01', youtubeLink: 'https://www.youtube.com/watch?v=MQ4CXxhAF8k&ab_channel=PredictableClown71', isPublished: true, creator: user._id },
        { title: 'Falling Away from Me', album: album2._id, trackNumber: 2, duration: '4:29', youtubeLink: 'https://www.youtube.com/watch?v=2s3iGpDqQpQ&ab_channel=KornVEVO', isPublished: true, creator: user._id },
        { title: 'Twisted Transistor', album: album2._id, trackNumber: 3, duration: '3:52', youtubeLink: 'https://www.youtube.com/watch?v=uAq6RjSuwXQ&ab_channel=DavidHmeljov', isPublished: true, creator: user._id },
        { title: 'Make Me Bad', album: album2._id, trackNumber: 4, duration: '3:49', youtubeLink: 'https://www.youtube.com/watch?v=ujEph5vFwmc&ab_channel=KornVEVO', isPublished: true, creator: user._id },
        { title: 'Here to Stay', album: album2._id, trackNumber: 5, duration: '4:32', youtubeLink: 'https://www.youtube.com/watch?v=pr3x7tS__dE&ab_channel=KornVEVO', isPublished: true, creator: user._id },
        { title: 'Here to Stay', album: album3._id, trackNumber: 1, duration: '4:22', youtubeLink: 'https://www.youtube.com/watch?v=pr3x7tS__dE&ab_channel=KornVEVO', isPublished: true, creator: user._id },
        { title: 'Alone I Break', album: album3._id, trackNumber: 2, duration: '4:12', youtubeLink: 'https://www.youtube.com/watch?v=V3GA2d-J2_A&ab_channel=KornVEVO', isPublished: true, creator: user._id },
        { title: 'Thoughtless', album: album3._id, trackNumber: 3, duration: '3:35', youtubeLink: 'https://www.youtube.com/watch?v=xVPvzX-AeSM&ab_channel=KornVEVO', isPublished: true, creator: user._id },
        { title: 'Got the Life', album: album3._id, trackNumber: 4, duration: '3:38', youtubeLink: 'https://www.youtube.com/watch?v=VAWjsVoDpm0&ab_channel=KornVEVO', isPublished: true, creator: user._id },
        { title: 'Wake Up Hate', album: album3._id, trackNumber: 5, duration: '4:40', youtubeLink: 'https://www.youtube.com/watch?v=WLJY-N9QSD8&ab_channel=PredictableClown71', isPublished: true, creator: user._id },
        { title: 'Take Me to the Disco', album: album4._id, trackNumber: 1, duration: '3:53', youtubeLink: 'https://www.youtube.com/watch?v=BMFWkdX_yn0&ab_channel=MEGMYERS', isPublished: true, creator: user._id },
        { title: 'Numb', album: album4._id, trackNumber: 2, duration: '4:22', youtubeLink: 'https://www.youtube.com/watch?v=ORaln6aPqUk&ab_channel=MEGMYERS', isPublished: true, creator: user._id },
        { title: 'Tear Me to Pieces', album: album4._id, trackNumber: 3, duration: '3:26', youtubeLink: 'https://www.youtube.com/watch?v=c92Isg49BOo&ab_channel=MEGMYERS', isPublished: true, creator: user._id },
        { title: 'Some People', album: album4._id, trackNumber: 4, duration: '3:56', youtubeLink: 'https://www.youtube.com/watch?v=GbypV28z1ro&ab_channel=MEGMYERS', isPublished: true, creator: user._id },
        { title: 'Done', album: album4._id, trackNumber: 5, duration: '3:26', youtubeLink: 'https://www.youtube.com/watch?v=ZWC88LUhhjA&ab_channel=MEGMYERS', isPublished: true, creator: user._id },
        { title: 'Step Down', album: album5._id, trackNumber: 1, duration: '3:21', youtubeLink: 'https://www.youtube.com/watch?v=gDjJUqjmzxU&list=PLGjF1j7fTPJcD-_hy99k3CB881FAZEkVB&ab_channel=ElliphantVEVO', isPublished: false, creator: user._id },
        { title: 'Love Me Badder', album: album5._id, trackNumber: 2, duration: '3:56', youtubeLink: 'https://www.youtube.com/watch?v=LZlFPRDh0bw&list=PLGjF1j7fTPJcD-_hy99k3CB881FAZEkVB&index=3&ab_channel=ElliphantVEVO', isPublished: false, creator: user._id },
        { title: 'Hit And Run', album: album5._id, trackNumber: 3, duration: '3:42', youtubeLink: 'https://www.youtube.com/watch?v=XDUjtjyByzU&list=PLGjF1j7fTPJcD-_hy99k3CB881FAZEkVB&index=6&ab_channel=ElliphantVEVO', isPublished: false, creator: user._id },
    ]);

    console.log('Fixtures added');
    await mongoose.connection.close();
};

run().catch(console.error);
