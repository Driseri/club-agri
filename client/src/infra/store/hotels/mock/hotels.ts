import type Hotel from '@/domain/entities/Hotel'
import Thumbnails from '@/infra/store/thumbs/thumbs.json'

const hotelsMock = [
  {
    id: 1,
    title: 'Кормление поросей орехами',
    subtitle: 'Меняйте детей на орехи',
    description: 'Клуб запусков орехов по свиньям — это уникальное место, где точность, юмор и лёгкое безумие встречаются в одном выстреле. Участники тренируются метко кидать грецкие орехи в резиновых свиней, установленных на движущихся платформах. Каждый запуск — это мини-спектакль с аплодисментами, попаданиями и неожиданными философскими выводами. Подходит детям от 6 лет и взрослым с чувством абсурдного прекрасного.',
    address: '1234 Sunset Blvd, Sunset Beach, CA',
    rating: {
      votesCount: '2.4K',
      rating: 4.6,
      stars: 4,
    },
    ratingsCount: Math.floor(Math.random() * 9801) + 200,
    award: {
      name: 'Best of 2022',
      section: 'Beachfront',
    },
    chart: {
      place: 3,
      category: 'Beachfront',
    },
    price: Math.floor(Math.random() * 311) + 90,
    picture: '/pics/club1.jpg',
    rooms: [
      {
        id: 1,
        title: 'Deluxe Ocean View Room',
        subtitle: 'Enjoy stunning ocean views from your private balcony.',
        price: Math.floor(Math.random() * 951) + 50,
        picture: '/pics/room-1-1.jpg',
      },
      {
        id: 2,
        title: 'Luxury Suite',
        subtitle: 'Indulge in luxury and sophistication in our spacious suites.',
        price: Math.floor(Math.random() * 951) + 50,
        picture: '/pics/room-1-2.jpg',
      },
    ],
  },
  {
    id: 2,
    title: 'Робототехника не для детей',
    subtitle: 'Собирайте роботов по разливу водки и забиву кальяна',
    description: 'Робототехника не для детей — клуб для тех, кто хочет шагнуть за пределы скучных линейных актуаторов и паяльников "для начинающих". Здесь вы собираете роботов, которые умеют разливать водку с точностью бармена и забивать кальян с уважением к традициям.Каждое занятие — это смесь инженерной изобретательности, бытового сюрреализма и лёгкой техно-иронии. Идеально подойдёт тем, кто устал от "Ардуино-машинок" и готов к настоящей взрослой автоматике.',
    address: '5678 Mountain Rd, Mountain View, CO',
    rating: {
      votesCount: '1.7K',
      rating: 4.3,
      stars: 4,
    },
    ratingsCount: Math.floor(Math.random() * 9801) + 200,
    award: {
      name: 'Best of 2022',
      section: 'Mountain View',
    },
    chart: {
      place: 1,
      category: 'Mountain View',
    },
    price: Math.floor(Math.random() * 311) + 90,
    picture: '/pics/club2.jpg',
    rooms: [
      {
        id: 1,
        title: 'Cozy Cabin',
        subtitle: 'Experience the great outdoors in our cozy cabins.',
        price: Math.floor(Math.random() * 951) + 50,
        picture: '/pics/room-2-1.jpg',
      },
      {
        id: 2,
        title: 'Mountain View Suite',
        subtitle: 'Enjoy stunning mountain views from your private balcony.',
        price: Math.floor(Math.random() * 951) + 50,
        picture: '/pics/room-2-2.jpg',
      },
      {
        id: 3,
        title: 'Rustic Room',
        subtitle: 'Experience the rustic charm of our cozy rooms.',
        price: Math.floor(Math.random() * 951) + 50,
        picture: '/pics/room-2-3.jpg',
      },
    ],
  },
  {
    id: 3,
    title: 'Наезники на свинках',
    subtitle: 'Оседлай хряка и лети',
    description: 'Клуб наездников на свинках — это место, где отвага встречает хрюканье, а стиль — копытца. Участники осваивают искусство балансировки, манёвров и дипломатии с упрямыми, но харизматичными свинками. Каждый заезд — это смесь родео, киберпанка и деревенской эпопеи. Подходит всем, кто готов сесть в седло и пуститься в путешествие по тропам абсурда.',
    address: '1234 Ocean Blvd, Seaside, CA',
    rating: {
      votesCount: '2.3K',
      rating: 4.5,
      stars: 4.5,
    },
    ratingsCount: Math.floor(Math.random() * 9801) + 200,
    award: {
      name: 'Best of 2022',
      section: 'Seaside',
    },
    chart: {
      place: 2,
      category: 'Seaside',
    },
    price: Math.floor(Math.random() * 311) + 90,
    picture: '/pics/club3.jpg',
    rooms: [
      {
        id: 1,
        title: 'Ocean View Suite',
        subtitle: 'Enjoy stunning ocean views from your private balcony.',
        price: Math.floor(Math.random() * 951) + 50,
        picture: '/pics/room-3-1.jpg',
      },
      {
        id: 2,
        title: 'Beachfront Bungalow',
        subtitle: 'Experience the beauty of the ocean up close in our beachfront bungalows.',
        price: Math.floor(Math.random() * 951) + 50,
        picture: '/pics/room-3-2.jpg',
      },
      {
        id: 3,
        title: 'Luxury Suite',
        subtitle: 'Indulge in luxury in our spacious and elegant suites.',
        price: Math.floor(Math.random() * 951) + 50,
        picture: '/pics/room-3-3.jpg',
      },
    ],
  },
  {
    id: 4,
    title: 'Музыкальный клуб',
    subtitle: 'От Хрю-хрю и фни-фни до Моргенштерна',
    description: 'Клуб Мызки — это загадочное сообщество тех, кто мызкает, не объясняя что именно. Здесь мызкают с чувством, с толком и иногда даже с тряпкой, но чаще — с душой. Новичков не учат, а сразу погружают в процесс: сначала мызкаешь, потом понимаешь. Подходит тем, кто устал от логики и ищет чистоту в хаосе.',
    address: '4567 Main St, City Center, NY',
    rating: {
      votesCount: '1.2K',
      rating: 4.1,
      stars: 4,
    },
    ratingsCount: Math.floor(Math.random() * 9801) + 200,
    award: {
      name: 'Best of 2022',
      section: 'City Center',
    },
    chart: {
      place: 3,
      category: 'City Center',
    },
    price: Math.floor(Math.random() * 311) + 90,
    picture: '/pics/club4.jpg',
    rooms: [
      {
        id: 1,
        title: 'City View Suite',
        subtitle: 'Enjoy stunning views of the city from your private balcony.',
        price: Math.floor(Math.random() * 951) + 50,
        picture: '/pics/room-4-1.jpg',
      },
      {
        id: 2,
        title: 'Luxury Room',
        subtitle: 'Indulge in luxury in our spacious and elegant rooms.',
        price: Math.floor(Math.random() * 951) + 50,
        picture: '/pics/room-4-2.jpg',
      },
      {
        id: 3,
        title: 'Cozy Room',
        subtitle: 'Experience the comfort of our cozy rooms.',
        price: Math.floor(Math.random() * 951) + 50,
        picture: '/pics/room-4-3.jpg',
      },
    ],
  },
  {
    id: 5,
    title: 'Клуб Разделки',
    subtitle: 'Забей хряка, пошинкуй и пожарь.',
    description: 'Нет ничего лучше ребенка, который сам себе найдет еды и приготовит ее. Учим выживать детей от 2 до 34.',
    address: '7890 Desert Rd, Desert Oasis, AZ',
    rating: {
      votesCount: '1.5K',
      rating: 4.4,
      stars: 4.5,
    },
    ratingsCount: Math.floor(Math.random() * 9801) + 200,
    award: {
      name: 'Best of 2022',
      section: 'Desert Oasis',
    },
    chart: {
      place: 4,
      category: 'Desert Oasis',
    },
    price: Math.floor(Math.random() * 311) + 90,
    picture: '/pics/club5.jpg',
    rooms: [
      {
        id: 1,
        title: 'Desert View Suite',
        subtitle: 'Enjoy stunning desert views from your private balcony.',
        price: Math.floor(Math.random() * 951) + 50,
        picture: '/pics/room-5-1.jpg',
      },
      {
        id: 2,
        title: 'Luxury Bungalow',
        subtitle: 'Indulge in luxury in our spacious and elegant bungalows.',
        price: Math.floor(Math.random() * 951) + 50,
        picture: '/pics/room-5-2.jpg',
      },
    ],
  },
  {
    id: 6,
    title: 'Tropical Paradise Resort',
    subtitle: 'Escape to a tropical paradise and enjoy the sun, sand, and sea.',
    description: 'Our resort is located on a beautiful tropical island, surrounded by crystal-clear waters and white sandy beaches. Our luxurious rooms and suites are designed to provide the ultimate comfort and relaxation, with modern decor and top-notch facilities.',
    address: '1234 Palm Tree Blvd, Tropical Island',
    rating: {
      votesCount: '3.5K',
      rating: 4.8,
      stars: 5,
    },
    ratingsCount: Math.floor(Math.random() * 9801) + 200,
    award: {
      name: 'Best of 2022',
      section: 'Tropical Island',
    },
    chart: {
      place: 1,
      category: 'Tropical Island',
    },
    price: Math.floor(Math.random() * 311) + 90,
    picture: '/pics/club1.jpg',
    rooms: [
      {
        id: 1,
        title: 'Beachfront Suite',
        subtitle: 'Experience the beauty of the ocean up close in our beachfront suites.',
        price: Math.floor(Math.random() * 951) + 50,
        picture: '/pics/room-6-1.jpg',
      },
      {
        id: 2,
        title: 'Tropical Villa',
        subtitle: 'Indulge in luxury in our spacious and elegant villas.',
        price: Math.floor(Math.random() * 951) + 50,
        picture: '/pics/room-6-2.jpg',
      },
      {
        id: 3,
        title: 'Ocean View Room',
        subtitle: 'Enjoy stunning ocean views from your private balcony.',
        price: Math.floor(Math.random() * 951) + 50,
        picture: '/pics/room-6-3.jpg',
      },
    ],
  },
  {
    id: 7,
    title: 'Historic Inn',
    subtitle: 'Step back in time and experience the charm of a bygone era.',
    description: 'Our historic inn is located in a quaint town, surrounded by beautiful architecture and rich history. Our cozy rooms and suites are designed to provide the ultimate comfort and relaxation, with antique decor and modern amenities.',
    address: '7890 Main St, Historic Town, MA',
    rating: {
      votesCount: '1.2K',
      rating: 4.1,
      stars: 4,
    },
    ratingsCount: Math.floor(Math.random() * 9801) + 200,
    award: {
      name: 'Best of 2022',
      section: 'Historic Town',
    },
    chart: {
      place: 3,
      category: 'Historic Town',
    },
    price: Math.floor(Math.random() * 311) + 90,
    picture: '/pics/club6.jpg',
    rooms: [
      {
        id: 1,
        title: 'Antique Room',
        subtitle: 'Experience the charm of a bygone era in our antique rooms.',
        price: Math.floor(Math.random() * 951) + 50,
        picture: '/pics/room-7-1.jpg',
      },
      {
        id: 2,
        title: 'Historic Suite',
        subtitle: 'Indulge in luxury in our spacious and elegant suites.',
        price: Math.floor(Math.random() * 951) + 50,
        picture: '/pics/room-7-2.jpg',
      },
    ],
  },
]

/**
 * Add picture thumb to an entity based on the picture name
 *
 * @param entity - something with "picture" property
 */
function addThumb<T extends { picture: string }>(entity: T): T & { pictureThumb: string } {
  const pictureName = entity.picture.split('/').pop() as keyof typeof Thumbnails.thumbs

  return {
    ...entity,
    pictureThumb: Thumbnails.thumbs[pictureName],
  }
}

/**
 * Add picture thumbs to hotels based on the picture name
 */
function addThumbs(hotels: Hotel[]): Hotel[] {
  return hotels.map((hotel) => {
    /**
     * Add picture thumb to rooms as well
     */
    hotel.rooms = hotel.rooms.map(addThumb)

    return addThumb(hotel)
  })
}

export const hotels = addThumbs(hotelsMock)
