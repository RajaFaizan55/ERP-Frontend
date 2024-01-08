import profile1 from 'assets/img1.svg';
import profile2 from 'assets/img2.svg';

export const notifications = [
  {
    title: 'Today',
    posts: [
      {
        _id: 1,
        employee: [{ img: profile1 }],
        name: 'Jessica Cali',
        date: '17 Feb, 2021',
        description:
          'Dummy text is text that is used in the publishing industry or.',
      },
      {
        _id: 2,
        employee: [{ img: profile2 }],
        name: 'Emma Stone',
        date: '17 Feb, 2021',
        description:
          'Dummy text is text that is used in the publishing industry or.',
      },
      {
        _id: 3,
        profile: [{ img: profile1 }],
        name: 'Jessica Cali',
        date: '17 Feb, 2021',
        description:
          'Dummy text is text that is used in the publishing industry or.',
      },
    ],
  },
  {
    title: 'Older',
    posts: [
      {
        _id: 4,
        employee: [{ img: profile2 }],
        name: 'Emma Stone',
        date: '18 Feb, 2021',
        description:
          'Dummy text is text that is used in the publishing industry or.',
      },
      {
        _id: 5,
        employee: [{ img: profile1 }],
        name: 'Jessica Cali',
        date: '18 Feb, 2021',
        description:
          'Dummy text is text that is used in the publishing industry or.',
      },
    ],
  },
];
