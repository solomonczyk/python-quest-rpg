import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const lessons = [
  {
    number: "1-1",
    slug: "print",
    title: "Voice Rune",
    topic: "print()",
    stage: "1",
    mainCharacter: "Lexa",
    dialogue: JSON.stringify([
      { character: "Lexa", text: "Привет, ученик! Я Лекса. Сегодня машина научится говорить." },
      { character: "Dash", text: "Твоя первая миссия — заставить машину произнести приветствие!" },
    ]),
    explanation:
      "`print()` — это команда 'покажи на экран'. Внутри скобок пишем текст в кавычках, и машина выводит его на панель.",
    codeExample: `print("Привет, мастерская!")`,
    glitchTrap: JSON.stringify({
      brokenCode: `print(Привет)`,
      problem: "Текст без кавычек.",
      fix: 'print("Привет")',
    }),
    mission: "Выведи три строки:\n1. Меня зовут ...\n2. Я пришёл запустить машину\n3. Python Quest начинается!",
    missionValidationRule: JSON.stringify({ type: "contains", targets: ['print("', 'print("'] }),
    quiz: JSON.stringify({
      question: "Что делает print()?",
      options: ["сохраняет число", "показывает текст на экране", "спрашивает ответ"],
      correctIndex: 1,
    }),
    rewardAbility: "Voice Rune",
    sortOrder: 1,
  },
  {
    number: "1-2",
    slug: "strings",
    title: "Seal of Words",
    topic: "strings and quotes",
    stage: "1",
    mainCharacter: "Lexa",
    dialogue: JSON.stringify([
      { character: "Lexa", text: "Слова нужно 'запечатать' в кавычки. Иначе машина не поймёт, что это текст." },
      { character: "Silas", text: "Проверим точность. Кавычки — рамка для текста." },
    ]),
    explanation: "Строка — это текст. В Python текст всегда в кавычках: двойных или одинарных.",
    codeExample: `print("Я герой")`,
    glitchTrap: JSON.stringify({
      brokenCode: `print("Я герой')`,
      problem: "Разные кавычки.",
      fix: `print("Я герой")`,
    }),
    mission: "Выведи имя героя, название мастерской и пароль двери.",
    missionValidationRule: JSON.stringify({ type: "contains", targets: ['print("', 'print("', 'print("'] }),
    quiz: JSON.stringify({
      question: "Где текст записан правильно?",
      options: ["print(Привет)", 'print("Привет")', "print Привет"],
      correctIndex: 1,
    }),
    rewardAbility: "Seal of Words",
    sortOrder: 2,
  },
  {
    number: "1-3",
    slug: "variables",
    title: "Memory Flask",
    topic: "variables",
    stage: "1",
    mainCharacter: "Lyra",
    dialogue: JSON.stringify([
      { character: "Lyra", text: "Переменная — это колба памяти с именем. Кладём значение — используем позже." },
    ]),
    explanation: "Переменная = коробка/колба с именем. Слева имя, справа значение, знак = значит 'положить'.",
    codeExample: `hero_name = "Арин"\nprint(hero_name)`,
    glitchTrap: JSON.stringify({
      brokenCode: `hero name = "Арин"`,
      problem: "Пробел в имени переменной.",
      fix: 'hero_name = "Арин"',
    }),
    mission: "Создай переменные hero_name, city_name, pet_name и выведи их.",
    missionValidationRule: JSON.stringify({ type: "contains", targets: ["=", "print("] }),
    quiz: JSON.stringify({
      question: "Что лежит в переменной power = 5?",
      options: ["имя power", "число 5", "слово print"],
      correctIndex: 1,
    }),
    rewardAbility: "Memory Flask",
    sortOrder: 3,
  },
  {
    number: "1-4",
    slug: "input",
    title: "Listening Gate",
    topic: "input()",
    stage: "1",
    mainCharacter: "Dash",
    dialogue: JSON.stringify([
      { character: "Dash", text: "Машина должна слушать! Команда input() задаёт вопрос и ждёт ответ." },
    ]),
    explanation: "`input()` — машина задаёт вопрос и ждёт ответ игрока. Ответ лучше сохранить в переменную.",
    codeExample: `name = input("Как тебя зовут? ")\nprint(name)`,
    glitchTrap: JSON.stringify({
      brokenCode: `input(Как тебя зовут?)`,
      problem: "Вопрос без кавычек.",
      fix: 'input("Как тебя зовут? ")',
    }),
    mission: "Спроси имя, любимый цвет и имя питомца. Потом выведи ответы.",
    missionValidationRule: JSON.stringify({ type: "contains", targets: ["input(", "print("] }),
    quiz: JSON.stringify({
      question: "Куда лучше сохранить ответ игрока?",
      options: ["в переменную", "в кавычки", "в комментарий"],
      correctIndex: 0,
    }),
    rewardAbility: "Listening Gate",
    sortOrder: 4,
  },
  {
    number: "1-5",
    slug: "int-input",
    title: "Number Converter",
    topic: "int(input())",
    stage: "1",
    mainCharacter: "Silas",
    dialogue: JSON.stringify([
      { character: "Silas", text: "input() получает текст. Но если нужно число — превращаем текст в число через int()." },
    ]),
    explanation: "`input()` даёт текст. `int()` превращает текст в число. Оборачиваем одно в другое.",
    codeExample: `age = int(input("Сколько тебе лет? "))`,
    glitchTrap: JSON.stringify({
      brokenCode: `age = input("Сколько тебе лет? ")\nnext_age = age + 1`,
      problem: "age пока текст. Нельзя складывать текст и число.",
      fix: `age = int(input("Сколько тебе лет? "))\nnext_age = age + 1`,
    }),
    mission: "Спроси возраст, количество ключей и кристаллов. Сохрани как числа.",
    missionValidationRule: JSON.stringify({ type: "contains", targets: ["int(input(", "="] }),
    quiz: JSON.stringify({
      question: "Зачем нужен int()?",
      options: ["чтобы вывести текст", "чтобы превратить текст в число", "чтобы создать условие"],
      correctIndex: 1,
    }),
    rewardAbility: "Number Converter",
    sortOrder: 5,
  },
  {
    number: "1-6",
    slug: "arithmetic",
    title: "Gear of Counting",
    topic: "arithmetic",
    stage: "1",
    mainCharacter: "Dash",
    dialogue: JSON.stringify([
      { character: "Dash", text: "Шестерёнки счёта вращаются! Python умеет складывать, вычитать, умножать и делить." },
      { character: "Silas", text: "Но будь внимателен: числа и текст ведут себя по-разному." },
    ]),
    explanation: "Арифметика — считаем ресурсы. Складываем кристаллы, вычитаем потраченные ключи.",
    codeExample: `small = 3\nbig = 2\ntotal = small + big\nprint(total)`,
    glitchTrap: JSON.stringify({
      brokenCode: `print("2" + "3")`,
      problem: "Это текст. Python склеит '23'.",
      fix: 'print(2 + 3)',
    }),
    mission: "Спроси количество малых и больших кристаллов. Посчитай общее количество.",
    missionValidationRule: JSON.stringify({ type: "contains", targets: ["+", "print("] }),
    quiz: JSON.stringify({
      question: "Что покажет код print(2 + 3)?",
      options: ["23", "5", "2 + 3"],
      correctIndex: 1,
    }),
    rewardAbility: "Gear of Counting",
    sortOrder: 6,
  },
  {
    number: "1-7",
    slug: "comparisons",
    title: "Balance Lens",
    topic: "comparisons",
    stage: "1",
    mainCharacter: "Silas",
    dialogue: JSON.stringify([
      { character: "Silas", text: "Весы выбора. Сравнение проверяет: да или нет. True = да, False = нет." },
    ]),
    explanation: "Сравнения проверяют 'хватает ли'. > больше, < меньше, == равно. Результат: True или False.",
    codeExample: `energy = 7\nprint(energy > 5)`,
    glitchTrap: JSON.stringify({
      brokenCode: `level = 3\nprint(level = 3)`,
      problem: "Для сравнения нужен ==, а не =.",
      fix: "print(level == 3)",
    }),
    mission: "Проверь: энергии больше 5, ключей не меньше 2, уровень равен 3.",
    missionValidationRule: JSON.stringify({ type: "contains", targets: [">", "<", "=="] }),
    quiz: JSON.stringify({
      question: "Что значит ==?",
      options: ["положить значение", "сравнить", "вывести текст"],
      correctIndex: 1,
    }),
    rewardAbility: "Balance Lens",
    sortOrder: 7,
  },
  {
    number: "1-8",
    slug: "if",
    title: "Logic Key",
    topic: "if",
    stage: "1",
    mainCharacter: "Lexa",
    dialogue: JSON.stringify([
      { character: "Lexa", text: "if значит 'если'. Если условие верно — дверь открывается." },
      { character: "Silas", text: "Не забудь двоеточие и отступ. Машина читает точно." },
    ]),
    explanation: "`if` запускает действие только если условие верно. После if ставим двоеточие, а действие — с отступом.",
    codeExample: `energy = 7\nif energy > 5:\n    print("Дверь открыта")`,
    glitchTrap: JSON.stringify({
      brokenCode: `if energy > 5\n    print("Открыто")`,
      problem: "Нет двоеточия после if.",
      fix: 'if energy > 5:\n    print("Открыто")',
    }),
    mission: "Спроси количество ключей. Если ключей больше 3 — выведи 'Проход открыт'.",
    missionValidationRule: JSON.stringify({ type: "contains", targets: ["if", ":", "print("] }),
    quiz: JSON.stringify({
      question: "Что обязательно после условия if?",
      options: ["точка", "двоеточие", "кавычка"],
      correctIndex: 1,
    }),
    rewardAbility: "Logic Key",
    sortOrder: 8,
  },
  {
    number: "1-9",
    slug: "if-else",
    title: "Forked Gate",
    topic: "if else",
    stage: "1",
    mainCharacter: "Silas",
    dialogue: JSON.stringify([
      { character: "Silas", text: "else значит 'иначе'. Развилка: один путь или другой." },
      { character: "Lexa", text: "else пишется без условия, на одном уровне с if." },
    ]),
    explanation: "`else` — выбираем один из двух путей. Если if не сработал, выполняется else.",
    codeExample: `keys = 2\nif keys >= 3:\n    print("Дверь открыта")\nelse:\n    print("Нужно больше ключей")`,
    glitchTrap: JSON.stringify({
      brokenCode: `else\n    print("Закрыто")`,
      problem: "После else нужно двоеточие.",
      fix: 'else:\n    print("Закрыто")',
    }),
    mission: "Спроси энергию. Если хватает — выведи 'Мост запущен'. Иначе — 'Энергии мало'.",
    missionValidationRule: JSON.stringify({ type: "contains", targets: ["if", "else:", "print("] }),
    quiz: JSON.stringify({
      question: "У else есть своё условие?",
      options: ["да", "нет"],
      correctIndex: 1,
    }),
    rewardAbility: "Forked Gate",
    sortOrder: 9,
  },
  {
    number: "1-10",
    slug: "final-quest",
    title: "Core Spark",
    topic: "final quest",
    stage: "1",
    mainCharacter: "Lyra",
    dialogue: JSON.stringify([
      { character: "Lyra", text: "Все части собраны. Теперь запустим машину!" },
      { character: "Dash", text: "Объедини всё, что узнал. Это твой первый настоящий квест." },
    ]),
    explanation: "Финальный квест: спроси имя, возраст и энергию. Приветствуй героя. Если энергии хватает — запусти машину.",
    codeExample: `name = input("Как тебя зовут? ")\nage = int(input("Сколько тебе лет? "))\nenergy = int(input("Сколько у тебя энергии? "))\nprint("Привет,", name)\nif energy >= 5:\n    print("Машина запущена!")\nelse:\n    print("Энергии недостаточно.")`,
    glitchTrap: JSON.stringify({
      brokenCode: `energy = input("Сколько энергии? ")\nif energy >= 5:`,
      problem: "input() даёт текст. Нужно int(input()) для сравнения чисел.",
      fix: 'energy = int(input("Сколько энергии? "))\nif energy >= 5:',
    }),
    mission: "Напиши программу, которая спрашивает имя, возраст, энергию; приветствует; запускает машину или сообщает о нехватке энергии.",
    missionValidationRule: JSON.stringify({ type: "contains", targets: ["input(", "int(input(", "if", "else:", "print("] }),
    quiz: JSON.stringify({
      question: "Какое заклинание превращает ввод в число?",
      options: ["input()", "int()", "print()"],
      correctIndex: 1,
    }),
    rewardAbility: "Core Spark",
    sortOrder: 10,
  },
];

async function main() {
  for (const lesson of lessons) {
    await prisma.lesson.upsert({
      where: { slug: lesson.slug },
      update: {},
      create: lesson,
    });
  }
  console.log(`Seeded ${lessons.length} lessons.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
