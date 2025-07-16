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
        title: 'Группа "Меткие стрелки"',
        subtitle: 'Для детей 6-8 лет, развитие координации и точности.',
        price: Math.floor(Math.random() * 951) + 50,
        picture: '/pics/group1.jpg',
      },
      {
        id: 2,
        title: 'Группа "Орехоброс PRO"',
        subtitle: 'Для детей 9-12 лет, продвинутые техники метания.',
        price: Math.floor(Math.random() * 951) + 50,
        picture: '/pics/group2.jpg',
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
        title: 'Группа "Юный инженер"',
        subtitle: 'Базовые навыки робототехники для детей 8-10 лет.',
        price: Math.floor(Math.random() * 951) + 50,
        picture: '/pics/group1.jpg',
      },
      {
        id: 2,
        title: 'Группа "Техно-гений"',
        subtitle: 'Продвинутая робототехника для детей 11-13 лет.',
        price: Math.floor(Math.random() * 951) + 50,
        picture: '/pics/group2.jpg',
      },
      {
        id: 3,
        title: 'Группа "Кибер-мастер"',
        subtitle: 'Сложные проекты для подростков 14-16 лет.',
        price: Math.floor(Math.random() * 951) + 50,
        picture: '/pics/group3.jpg',
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
        title: 'Группа "Мини-наездники"',
        subtitle: 'Первое знакомство с верховой ездой для детей 5-7 лет.',
        price: Math.floor(Math.random() * 951) + 50,
        picture: '/pics/group1.jpg',
      },
      {
        id: 2,
        title: 'Группа "Юные жокеи"',
        subtitle: 'Базовые навыки верховой езды для детей 8-10 лет.',
        price: Math.floor(Math.random() * 951) + 50,
        picture: '/pics/group2.jpg',
      },
      {
        id: 3,
        title: 'Группа "Мастера родео"',
        subtitle: 'Продвинутые техники для детей 11-14 лет.',
        price: Math.floor(Math.random() * 951) + 50,
        picture: '/pics/group3.jpg',
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
        title: 'Группа "Музыкальные малыши"',
        subtitle: 'Знакомство с музыкой для детей 3-5 лет.',
        price: Math.floor(Math.random() * 951) + 50,
        picture: '/pics/group1.jpg',
      },
      {
        id: 2,
        title: 'Группа "Юные композиторы"',
        subtitle: 'Основы музыкальной грамоты для детей 6-9 лет.',
        price: Math.floor(Math.random() * 951) + 50,
        picture: '/pics/group2.jpg',
      },
      {
        id: 3,
        title: 'Группа "Музыкальные гении"',
        subtitle: 'Продвинутое обучение для детей 10-14 лет.',
        price: Math.floor(Math.random() * 951) + 50,
        picture: '/pics/group3.jpg',
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
        title: 'Группа "Маленькие повара"',
        subtitle: 'Основы кулинарии для детей 6-8 лет.',
        price: Math.floor(Math.random() * 951) + 50,
        picture: '/pics/group1.jpg',
      },
      {
        id: 2,
        title: 'Группа "Юные шеф-повара"',
        subtitle: 'Продвинутые кулинарные навыки для детей 9-12 лет.',
        price: Math.floor(Math.random() * 951) + 50,
        picture: '/pics/group2.jpg',
      },
    ],
  },
  {
    id: 6,
    title: 'Художественная студия',
    subtitle: 'Раскрой творческий потенциал своего ребенка',
    description: 'Художественная студия — это место, где дети могут раскрыть свой творческий потенциал через различные виды искусства. Наши опытные преподаватели помогут освоить различные техники рисования, лепки и создания поделок. Каждое занятие — это новое творческое приключение, которое развивает воображение, мелкую моторику и эстетический вкус.',
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
        title: 'Группа "Юные художники"',
        subtitle: 'Основы рисования для детей 5-7 лет.',
        price: Math.floor(Math.random() * 951) + 50,
        picture: '/pics/group1.jpg',
      },
      {
        id: 2,
        title: 'Группа "Творческая мастерская"',
        subtitle: 'Смешанные техники для детей 8-10 лет.',
        price: Math.floor(Math.random() * 951) + 50,
        picture: '/pics/group2.jpg',
      },
      {
        id: 3,
        title: 'Группа "Художественная школа"',
        subtitle: 'Продвинутые техники для детей 11-14 лет.',
        price: Math.floor(Math.random() * 951) + 50,
        picture: '/pics/group3.jpg',
      },
    ],
  },
  {
    id: 7,
    title: 'Спортивный клуб',
    subtitle: 'Здоровое тело — здоровый дух',
    description: 'Спортивный клуб предлагает разнообразные программы физического развития для детей всех возрастов. Наши тренеры помогут развить силу, выносливость, координацию и командный дух. Занятия проходят в игровой форме, что делает спорт увлекательным и интересным для детей. Регулярные тренировки способствуют формированию здоровых привычек на всю жизнь.',
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
        title: 'Группа "Спортивные малыши"',
        subtitle: 'Общая физическая подготовка для детей 4-6 лет.',
        price: Math.floor(Math.random() * 951) + 50,
        picture: '/pics/group1.jpg',
      },
      {
        id: 2,
        title: 'Группа "Юные атлеты"',
        subtitle: 'Разносторонняя спортивная подготовка для детей 7-10 лет.',
        price: Math.floor(Math.random() * 951) + 50,
        picture: '/pics/group2.jpg',
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
